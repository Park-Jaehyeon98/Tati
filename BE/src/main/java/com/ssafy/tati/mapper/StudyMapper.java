package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.dto.res.StudyDetailResDto;
import com.ssafy.tati.dto.res.StudyListResDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    Study studyReqDtoToStudy(StudyReqDto studyReqDto);
    StudyDetailResDto studyToStudyDetailResDto(Study study, Category category);
    List<StudySchedule> studyReqScheduleListToStudySchedule(List<StudyScheduleReqDto> studyScheduleReqDtoList);

}

