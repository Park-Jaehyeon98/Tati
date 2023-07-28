package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    default Category studyReCategoryToCategory(StudyReqDto studyReqDto){
        if(studyReqDto == null){
            return null;
        }

        Category category = new Category();
        category.setCategoryName(studyReqDto.getCategoryName());

        return category;
    }

    default Study studyReqDtoToStudy(StudyReqDto studyReqDto){
        if(studyReqDto == null){
            return null;
        }

        Study study = new Study();
        Category category = new Category();
//        category.setCategoryId(studyReqDto.getCategoryId());

        study.setStudyName(studyReqDto.getStudyName());
        study.setStudyDescription(studyReqDto.getStudyDescription());
        study.setStudyPassword(studyReqDto.getStudyPassword());
        study.setStudyStartDate(studyReqDto.getStudyStartDate());
        study.setStudyEndDate(studyReqDto.getStudyEndDate());
        study.setTotalMember(studyReqDto.getTotalMember());
        study.setCategory(category);

        return study;
    }



}

