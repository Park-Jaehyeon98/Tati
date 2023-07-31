package com.ssafy.tati.service;

import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.repository.StudyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class StudyServiceTest {
    @Autowired
    private StudyRepository studyRepository;

    @BeforeEach
    public void beforeEach(){
        Study study = new Study();
        study.setStudyDescription("descpriton");
        study.setStudyPassword(null);
        study.setStudyName("studyname");

        Category category = new Category();
        category.setCategoryId(1);
        category.setCategoryName("자격증");
        study.setCategory(category);
        study.setStudyEndDate("111");
        study.setStudyStartDate("1");
        study.setTotalMember(1);

        Study study1 = new Study();
        study.setStudyDescription("descpriton1");
        study.setStudyPassword(null);
        study.setStudyName("studyname");


        study.setCategory(category);
        study.setStudyEndDate("111");
        study.setStudyStartDate("1");
        study.setTotalMember(1);


        studyRepository.save(study);
        studyRepository.save(study1);
    }
    @Test
    public void searchTest(){
        System.out.println(studyRepository.findById(1)); studyRepository.findById(1);
    }
}