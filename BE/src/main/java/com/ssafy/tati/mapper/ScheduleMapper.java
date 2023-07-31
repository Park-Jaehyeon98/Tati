package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.PostScheduleReqDto;
import com.ssafy.tati.dto.res.PostScheduleResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.MemberSchedule;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostScheduleMapper {

    default MemberSchedule postScheduleReqDtoToMemberSchedule(Member member, PostScheduleReqDto postScheduleReqDto){
        if(postScheduleReqDto == null) return null;

        MemberSchedule schedule = new MemberSchedule();

        schedule.setMemberScheduleId(0);
        schedule.setMemberScheduleDate(postScheduleReqDto.getMemberScheduleDate());
        schedule.setMemberScheduleTitle(postScheduleReqDto.getMemberScheduleTitle());
        schedule.setMemberScheduleContent(postScheduleReqDto.getMemberScheduleContent());
        schedule.setMember(member);

        return schedule;
    }

    PostScheduleResDto memberScheduleToPostScheduleResDto(MemberSchedule memberSchedule);

    List<PostScheduleResDto> memberScheduleListToPostScheduleResDtoList(List<MemberSchedule> memberScheduleList);

}
