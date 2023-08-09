package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.dto.res.StudyAllListResDto;
import com.ssafy.tati.dto.res.StudyDetailResDto;
import com.ssafy.tati.entity.Category;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    default Study studyReqDtoToStudy(StudyReqDto studyReqDto,
                                     List<StudySchedule> studyScheduleList, Category category){
        if(studyReqDto == null){
            return null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(studyReqDto.getStudyStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(studyReqDto.getStudyEndDate(), formatter);


        Study study = new Study();

        study.setStudyId(0);
        study.setImg(null);
        study.setStudyName(studyReqDto.getStudyName());
        study.setStudyDescription(studyReqDto.getStudyDescription());
        study.setTotalMember(studyReqDto.getTotalMember());
        study.setDisclosure(studyReqDto.getDisclosure());
        study.setStudyHost(studyReqDto.getStudyHost());
        study.setStudyDeposit(studyReqDto.getStudyDeposit());
        study.setStudyPassword(studyReqDto.getStudyPassword());
        study.setStudyStartDate(startDate);
        study.setStudyEndDate(endDate);
        study.setCategory(category);
        study.setStudyScheduleList(studyScheduleList);

        return study;
    }

    default StudySchedule studyReqScheduleToStudySchedule(StudyScheduleReqDto studyScheduleReqDto){
        if(studyScheduleReqDto == null){
            return null;
        }

        StudySchedule studySchedule = new StudySchedule();

        LocalTime startTime = LocalTime.parse(studyScheduleReqDto.getStudyStartTime());
        LocalTime endTime = LocalTime.parse(studyScheduleReqDto.getStudyEndTime());

        studySchedule.setStudyScheduleId(0);
        studySchedule.setStudyDay(studyScheduleReqDto.getStudyDay());
        studySchedule.setStudyStartTime(startTime);
        studySchedule.setStudyEndTime(endTime);

        return studySchedule;
    }


    StudyDetailResDto studyToStudyDetailResDto(Study study, Category category, boolean studyMemberYn);

    List<StudyAllListResDto> studyListToStudyAllListResDtoList(List<Study> studyList);

}

