package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    Study studyReqDtoToStudy(StudyReqDto studyReqDto);
    List<StudySchedule> studyReqScheduleListToStudySchedule(List<StudyScheduleReqDto> studyScheduleReqDtoList);



}

