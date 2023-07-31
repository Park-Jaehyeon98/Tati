package com.ssafy.tati.service;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.res.StudyModifyResDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import com.ssafy.tati.repository.CategoryRepository;
import com.ssafy.tati.repository.StudyRepository;
import com.ssafy.tati.repository.StudyScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final CategoryRepository categoryRepository;
    private final StudyScheduleRepository studyScheduleRepository;


    public void createStudy(Study study, Integer categoryId) {
        Optional<Category> category = categoryRepository.findByCategoryId(categoryId);
        if(!category.isPresent()){
            throw new RuntimeException();
        }
        study.setCategory(category.get());
        studyRepository.save(study);
    }

    public void createStudySchedule(StudySchedule studySchedule){
        studyScheduleRepository.save(studySchedule);
    }

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
    @Transactional
    public StudyModifyResDto modifyStudy(Integer studyId, StudyModifyReqDto studyModifyReqDto){
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

        StudyModifyResDto studyModifyResDto = new StudyModifyResDto();
        studyModifyResDto.setStudyId(studyId);
        return studyModifyResDto;
    }


//    @Transactional
//    public void updateById(Integer id, Study updateStudy){
//        Study study1 = studyRepository.findById(id).get();
//        study1.update(updateStudy);
//    }


}
