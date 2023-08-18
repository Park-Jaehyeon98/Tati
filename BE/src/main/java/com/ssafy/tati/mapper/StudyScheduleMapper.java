package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.res.StudyScheduleResDto;
import com.ssafy.tati.entity.StudySchedule;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyScheduleMapper {

    List<StudyScheduleResDto> studyScheduleListToStudyScheduleResDtoList(List<StudySchedule> studySchedules);
}
