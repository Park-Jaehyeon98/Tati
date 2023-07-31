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


    public void createStudy(Study study) {
        studyRepository.save(study);
    }

    public void createStudySchedule(StudySchedule studySchedule){
        studyScheduleRepository.save(studySchedule);
    }
//    @Transactional
//    public void updateById(Integer id, Study updateStudy){
//        Study study1 = studyRepository.findById(id).get();
//        study1.update(updateStudy);
//    }


}
