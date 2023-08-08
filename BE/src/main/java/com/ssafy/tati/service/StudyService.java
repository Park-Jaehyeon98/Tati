package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.*;
import com.ssafy.tati.exception.DataNotFoundException;
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

    public Category checkCategory(Integer categoryId){
        Optional<Category> category = categoryRepository.findByCategoryId(categoryId);
        if(!category.isPresent()){
            throw new RuntimeException("해당 카테고리가 존재하지 않습니다.");
        }

        return category.get();
    }


    public Study createStudy(Study study) {
        Study saveStudy = studyRepository.save(study);

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
            throw new RuntimeException("해당 스터디가 존재하지 않습니다.");
        }
        Study study = optionalStudy.get();
        Optional<Category> optionalCategory = categoryRepository.findByCategoryId(study.getCategory().getCategoryId());
        if(!optionalCategory.isPresent()){
            throw new RuntimeException("해당 카테고리가 존재하지 않습니다.");
        }
        Category category = optionalCategory.get();
        study.setCategory(category);

        return study;

    }

    public StudyIdResDto modifyStudy(Integer studyId, StudyModifyReqDto studyModifyReqDto){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if(!optionalStudy.isPresent()){
            throw new RuntimeException("해당 스터디가 존재하지 않습니다.");
        }
        Study study = optionalStudy.get();
        Optional<Category> optionalCategory = categoryRepository.findByCategoryId(studyModifyReqDto.getCategoryId());
        if(!optionalCategory.isPresent()){
            throw new RuntimeException("해당 카테고리가 존재하지 않습니다.");
        }

        study.update(optionalCategory.get(), studyModifyReqDto.getStudyName(), studyModifyReqDto.getStudyDescription(), studyModifyReqDto.isDisclosure(), studyModifyReqDto.getStudyPassword());

        StudyIdResDto studyIdResDto = new StudyIdResDto();
        studyIdResDto.setStudyId(studyId);
        return studyIdResDto;
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
        Member member = memberRepository.findByMemberNickName(studyHost).orElseThrow(() -> new RuntimeException("등록된 회원이 아닙니다."));
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("study가 존재하지 않습니다."));

        System.out.println("studyId : " +studyId +", studyHost : " +studyHost);

        Integer point = member.getTotalPoint() - study.getStudyDeposit();
        if(point < 0){
            studyRepository.deleteById(studyId);
            new RuntimeException("스터디를 생성하는데 포인트가 부족합니다");
        }

        member.updateTotalPoint(point);
        LocalDate currentDate = LocalDate.now();
        StudyMember studyMember = new StudyMember(0, currentDate, 0, 0, study, member);
        StudyMember savedStudyMember = studyMemberRepository.save(studyMember);
    }

    public Study findById(Integer studyId){
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new RuntimeException("해당 스터디가 존재하지 않습니다."));
        return study;
    }

}
