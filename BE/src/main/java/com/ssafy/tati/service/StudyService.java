package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
//import com.ssafy.tati.repository.CategoryRepository;
import com.ssafy.tati.repository.StudyRepository;
import com.ssafy.tati.repository.StudyScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
//    private final CategoryRepository categoryRepository;
    private final StudyScheduleRepository studyScheduleRepository;


    public Study createStudy(StudyReqDto studyReqDto) {
        // Extract data from the DTO
        String studyName = studyReqDto.getStudyName();
        String studyDescription = studyReqDto.getStudyDescription();
        Integer totalMember = studyReqDto.getTotalMember();
        Integer studyPassword = studyReqDto.getStudyPassword();
        String studyStartDate = studyReqDto.getStudyStartDate();
        String studyEndDate = studyReqDto.getStudyEndDate();
        Boolean isPublic = studyReqDto.getIsPublic();
        String studyHost = studyReqDto.getStudyHost();
        Integer studyDeposit = studyReqDto.getStudyDeposit();
        Integer categoryId = studyReqDto.getCategoryId();
        List<StudyScheduleReqDto> studyScheduleReqDto = studyReqDto.getStudySchedule();

        // Create Category entity
        Category category = new Category();
        category.setCategoryId(categoryId);

        // Create Study entity
        Study study = new Study();
        study.setStudyName(studyName);
        study.setStudyDescription(studyDescription);
        study.setTotalMember(totalMember);
        study.setStudyPassword(studyPassword);
        study.setStudyStartDate(studyStartDate);
        study.setStudyEndDate(studyEndDate);
        study.setStudyDeposit(studyDeposit);
        study.setStudyHost(studyHost);
        study.setIsPublic(isPublic);
        study.setCategory(category);

        Study study1;
        if (study == null) {
            throw new IllegalArgumentException("Study object cannot be null.");
        }else {
            study1 = studyRepository.save(study);
        }

        System.out.println("for문 진입 전");

        for (StudyScheduleReqDto scheduleReqDto : studyScheduleReqDto) {

            System.out.println("for문 진입 후");
            StudySchedule studySchedule = new StudySchedule();
            studySchedule.setStudy(study1);

            // Get the StudyScheduleReqDto from the list using index 'i'
            StudyScheduleReqDto studyScheduleReq = scheduleReqDto;

            // Set properties of the StudySchedule entity using values from the StudyScheduleReqDto
            studySchedule.setStudyDay(studyScheduleReq.getStudyDay());
            studySchedule.setStudyStartTime(studyScheduleReq.getStudyStartTime());
            studySchedule.setStudyEndTime(studyScheduleReq.getStudyEndTime());

            // Check if the studySchedule object is null, which should not happen
            if (studySchedule == null) {
                throw new IllegalArgumentException("StudySchedule object cannot be null.");
            } else {
            studyScheduleRepository.save(studySchedule);
            }
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
