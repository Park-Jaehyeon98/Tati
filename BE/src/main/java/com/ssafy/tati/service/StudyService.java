package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.*;
import com.ssafy.tati.exception.DataNotFoundException;
import com.ssafy.tati.exception.PointException;
import com.ssafy.tati.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyService {
    private final MemberService memberService;
    private final PointService pointService;
    private final StudyRepository studyRepository;
    private final CategoryRepository categoryRepository;
    private final StudyScheduleRepository studyScheduleRepository;
    private final MemberRepository memberRepository;
    private final StudyMemberRepository studyMemberRepository;

    public Category checkCategory(Integer categoryId){
        Optional<Category> category = categoryRepository.findByCategoryId(categoryId);
        if(!category.isPresent()){
            throw new DataNotFoundException("해당 카테고리가 존재하지 않습니다.");
        }

        return category.get();
    }

    public void checkPoint(Integer studyHost, Integer studyDeposit){
        Optional<Member> member = memberRepository.findById(studyHost);
        if(!member.isPresent()){
            throw new DataNotFoundException("해당 회원이 존재하지 않습니다.");
        }
        if(studyDeposit > member.get().getTotalPoint()){
           throw new PointException("스터디를 만드는데 포인트가 부족합니다.");
        }
    }

    public Study createStudy(Study study) {
        Study saveStudy = studyRepository.save(study);

        Member member = memberService.findById(study.getStudyHost());
        Point point = new Point(0, "", LocalDateTime.now(), -study.getStudyDeposit(),
                ("[스터디 생성] '" +study.getStudyName())+ "' 생성", member);

        pointService.delete(point);
        System.out.println(point.getPointDate());

        return saveStudy;
    }

    public StudySchedule createStudySchedule(StudySchedule studySchedule){
        StudySchedule schedule = studyScheduleRepository.save(studySchedule);
        return schedule;
    }

    @Transactional(readOnly = true)
    public Study getStudyDetail(Integer studyId){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new DataNotFoundException("해당 스터디가 존재하지 않습니다.");
        }
        Study study = optionalStudy.get();
        Optional<Category> optionalCategory = categoryRepository.findByCategoryId(study.getCategory().getCategoryId());
        if(!optionalCategory.isPresent()){
            throw new DataNotFoundException("해당 카테고리가 존재하지 않습니다.");
        }
        Category category = optionalCategory.get();
        study.setCategory(category);

        return study;

    }

    public StudyIdResDto modifyStudy(Integer studyId, StudyModifyReqDto studyModifyReqDto){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new DataNotFoundException("해당 스터디가 존재하지 않습니다.");
        }
        Study study = optionalStudy.get();
        Optional<Category> optionalCategory = categoryRepository.findByCategoryId(studyModifyReqDto.getCategoryId());
        if(!optionalCategory.isPresent()){
            throw new DataNotFoundException("해당 카테고리가 존재하지 않습니다.");
        }

        study.update(optionalCategory.get(), studyModifyReqDto.getStudyName(), studyModifyReqDto.getStudyDescription(), studyModifyReqDto.isDisclosure(), studyModifyReqDto.getStudyPassword());

        StudyIdResDto studyIdResDto = new StudyIdResDto();
        studyIdResDto.setStudyId(studyId);
        return studyIdResDto;
    }

    @Transactional(readOnly = true)
    public Page<Study> getStudyList(Pageable pageable) {
        Page<Study> studyList = studyRepository.findAll(pageable);
        return studyList;
    }

    @Transactional(readOnly = true)
    public Page<Study> getSearchStudy(Pageable pageable, Integer categoryId, String keyword){
        Page<Study> searchStudyList;
        if(categoryId == 0){
            searchStudyList = studyRepository.findByStudyNameContaining(keyword, pageable);
        }else {
            Optional<Category> category = categoryRepository.findById(categoryId);
            searchStudyList = studyRepository.findByCategoryAndStudyNameContaining(category.get(), keyword, pageable);
        }
        return searchStudyList;
    }

    public void setStudyMemberHost(Integer studyId, Integer studyHost) {
        Member member = memberRepository.findById(studyHost).orElseThrow(() -> new DataNotFoundException("등록된 회원이 아닙니다."));
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new DataNotFoundException("study가 존재하지 않습니다."));

//        System.out.println("studyId : " +studyId +", studyHost : " +studyHost);

        Integer point = member.getTotalPoint() - study.getStudyDeposit();

        member.updateTotalPoint(point);
        LocalDate currentDate = LocalDate.now();
        StudyMember studyMember = new StudyMember(0, currentDate, 0, 0, study, member);
        studyMemberRepository.save(studyMember);
    }

    public Study findById(Integer studyId){
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new DataNotFoundException("해당 스터디가 존재하지 않습니다."));
        return study;
    }

    public List<Board> selectStudyBoard(Integer studyId){
        List<Board> boardList = studyRepository.findBoardByStudyId(studyId);
        return boardList;
    }


    public List<StudySchedule> selectStudySchedule(Integer studyId){
        List<StudySchedule> scheduleList = studyRepository.findScheduleById(studyId);
        return scheduleList;
    }

    public List<StudyApplicant> selectStudyApplicant(Integer studyId){
        List<StudyApplicant> applicantList = studyRepository.findApplicantById(studyId);
        return applicantList;
    }

    public List<StudyMember> selectStudyMember(Integer studyId){
        List<StudyMember> memberList = studyRepository.findStudyMemberById(studyId);
        return memberList;
    }

}
