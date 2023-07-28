package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import com.ssafy.tati.repository.CategoryRepository;
import com.ssafy.tati.repository.StudyRepository;
import com.ssafy.tati.repository.StudyScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final CategoryRepository categoryRepository;
    private final StudyScheduleRepository studyScheduleRepository;

    @Transactional
    public Study createStudy(StudyReqDto studyReqDto) {
        // Extract data from the DTO
        String studyName = studyReqDto.getStudyName();
        String studyDescription = studyReqDto.getStudyDescription();
        Integer totalMember = studyReqDto.getTotalMember();
        Integer studyPassword = studyReqDto.getStudyPassword();
        String studyStartDate = studyReqDto.getStudyStartDate();
        String studyEndDate = studyReqDto.getStudyEndDate();
        String studyDay = studyReqDto.getStudyDay();
        String studyStartTime = studyReqDto.getStudyStartTime();
        String studyEndTime = studyReqDto.getStudyEndTime();
        String categoryName = studyReqDto.getCategoryName();

        // Create Category entity
        Category category = new Category();
        category.setCategoryName(categoryName);

        // Create Study entity
        Study study = new Study();
        study.setStudyName(studyName);
        study.setStudyDescription(studyDescription);
        study.setTotalMember(totalMember);
        study.setStudyPassword(studyPassword);
        study.setStudyStartDate(studyStartDate);
        study.setStudyEndDate(studyEndDate);
        study.setCategory(category);

        categoryRepository.save(category);
        Study study1 = studyRepository.save(study);

        // Create StudySchedule entity
        StudySchedule studySchedule = new StudySchedule();
        studySchedule.setStudyDay(studyDay);
        studySchedule.setStudyStartTime(studyStartTime);
        studySchedule.setStudyEndTime(studyEndTime);

        // Save the entities to the database

//
        studyScheduleRepository.save(studySchedule);

        return study1;

    }
}
