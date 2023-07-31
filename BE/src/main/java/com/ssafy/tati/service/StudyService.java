package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyDayItemDto;
import com.ssafy.tati.dto.req.StudyEndTimeItemDto;
import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyStartTimeItemDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import com.ssafy.tati.repository.CategoryRepository;
import com.ssafy.tati.repository.StudyRepository;
import com.ssafy.tati.repository.StudyScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final CategoryRepository categoryRepository;
    private final StudyScheduleRepository studyScheduleRepository;


    public Study createStudy(StudyReqDto studyReqDto) {
        // Extract data from the DTO
        String studyName = studyReqDto.getStudyName();
        String studyDescription = studyReqDto.getStudyDescription();
        Integer totalMember = studyReqDto.getTotalMember();
        Integer studyPassword = studyReqDto.getStudyPassword();
        String studyStartDate = studyReqDto.getStudyStartDate();
        String studyEndDate = studyReqDto.getStudyEndDate();
        List<StudyDayItemDto> studyDay = studyReqDto.getStudyDay();
        List<StudyStartTimeItemDto> studyStartTime = studyReqDto.getStudyStartTime();
        List<StudyEndTimeItemDto> studyEndTime = studyReqDto.getStudyEndTime();
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

        for(int i=0; i<studyDay.size(); i++) {
            // Create StudySchedule entity
            StudySchedule studySchedule = new StudySchedule();
            studySchedule.setStudy(study1);
            System.out.println(studySchedule.getStudyDay());
            studySchedule.setStudyDay(new StudyDayItemDto(studyDay.get(i)).getStudyDay());
            studySchedule.setStudyStartTime(new StudyStartTimeItemDto(studyStartTime.get(i)).getStudyStartTime());
            studySchedule.setStudyEndTime(new StudyEndTimeItemDto(studyEndTime.get(i)).getStudyEndTime());
            studyScheduleRepository.save(studySchedule);
        }

        // Save the entities to the database
        return study1;

    }
//    @Transactional
//    public void updateById(Integer id, Study updateStudy){
//        Study study1 = studyRepository.findById(id).get();
//        study1.update(updateStudy);
//    }


}
