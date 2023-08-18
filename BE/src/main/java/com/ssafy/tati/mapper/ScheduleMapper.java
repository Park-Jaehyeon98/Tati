package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.ScheduleReqDto;
import com.ssafy.tati.dto.res.ScheduleResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.MemberSchedule;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {

    default MemberSchedule scheduleReqDtoToMemberSchedule(Member member, ScheduleReqDto scheduleReqDto){
        if(scheduleReqDto == null) return null;

        MemberSchedule schedule = new MemberSchedule();

        LocalDate date = scheduleReqDto.getMemberScheduleDate().toLocalDate();

        schedule.setMemberScheduleId(0);
        schedule.setMemberScheduleDate(date);
        schedule.setMemberScheduleTitle(scheduleReqDto.getMemberScheduleTitle());
        schedule.setMemberScheduleContent(scheduleReqDto.getMemberScheduleContent());
        schedule.setMember(member);

        return schedule;
    }

    ScheduleResDto memberScheduleToScheduleResDto(MemberSchedule memberSchedule);

    List<ScheduleResDto> memberScheduleListToScheduleResDtoList(List<MemberSchedule> memberScheduleList);

}
