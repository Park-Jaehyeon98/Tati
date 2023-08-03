package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.res.StudyDeleteResDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.*;
import com.ssafy.tati.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final CategoryRepository categoryRepository;
    private final StudyScheduleRepository studyScheduleRepository;
    private final MemberRepository memberRepository;
    private final StudyMemberRepository studyMemberRepository;

    public void createStudy(Study study, Integer categoryId) {
        Optional<Category> category = categoryRepository.findByCategoryId(categoryId);
        if(!category.isPresent()){
            throw new RuntimeException();
        }
        study.setCategory(category.get());
        studyRepository.save(study);
        setStudyMemberHost(study.getStudyId(), study.getStudyHost());
    }

    public void createStudySchedule(StudySchedule studySchedule){
        studyScheduleRepository.save(studySchedule);
    }

    @Transactional(readOnly = true)
    public Study getStudyDetail(Integer studyId){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new RuntimeException();
        }
        Study study = optionalStudy.get();
        Optional<Category> optionalCategory = categoryRepository.findByCategoryId(study.getCategory().getCategoryId());
        if(!optionalCategory.isPresent()){
            throw new RuntimeException();
        }
        Category category = optionalCategory.get();
        study.setCategory(category);

        return study;

    }

    public StudyIdResDto modifyStudy(Integer studyId, StudyModifyReqDto studyModifyReqDto){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new RuntimeException();
        }
        Study study = optionalStudy.get();
        Optional<Category> optionalCategory = categoryRepository.findByCategoryId(studyModifyReqDto.getCategoryId());
        if(!optionalCategory.isPresent()){
            throw new RuntimeException();
        }

        study.update(optionalCategory.get(), studyModifyReqDto.getStudyName(), studyModifyReqDto.getStudyDescription(), studyModifyReqDto.isDisclosure(), studyModifyReqDto.getStudyPassword());

        StudyIdResDto studyIdResDto = new StudyIdResDto();
        studyIdResDto.setStudyId(studyId);
        return studyIdResDto;
    }

    public StudyDeleteResDto removeStudy(Integer studyId, Integer memberId){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new RuntimeException();
        }
        Study study = optionalStudy.get();
        StudyDeleteResDto studyDeleteResDto = new StudyDeleteResDto();
        studyDeleteResDto.setStudyName(study.getStudyName());
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if(!optionalMember.isPresent()){
            throw new RuntimeException();
        }
        Member member = optionalMember.get();

        if(study.getStudyHost().equals(member.getMemberNickName())){
            studyRepository.deleteById(studyId);
            return studyDeleteResDto;
        }else {
            throw new RuntimeException();
        }
    }

    @Transactional(readOnly = true)
    public List<Study> getStudyList() {
        List<Study> studyList = studyRepository.findAll();
        return studyList;
    }

    @Transactional(readOnly = true)
    public List<Study> getSearchStudy(Integer pageNum, Integer categoryId, String keyword){
        List<Study> searchStudyList = studyRepository.findByCategoryAndStudyNameContaining(categoryId, keyword);
        return searchStudyList;
    }

    public void setStudyMemberHost(Integer studyId, String studyHost) {
        Member member = memberRepository.findByMemberNickName(studyHost).orElseThrow(() -> new RuntimeException("study Host가 일치하지 않습니다"));
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("study가 존재하지 않습니다."));
        Integer point = member.getTotalPoint() - study.getStudyDeposit();
        if(point < 0){
            studyRepository.deleteById(studyId);
            new RuntimeException("스터디를 생성하는데 포인트가 부족합니다");
        }

        member.updateTotalPoint(point);
        LocalDate currentDate = LocalDate.now();
        StudyMember studyMember = new StudyMember(study.getStudyDeposit(), currentDate, study, member);
        studyMemberRepository.save(studyMember);
    }

}
