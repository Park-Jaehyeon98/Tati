package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.PutMemberReqDto;
import com.ssafy.tati.dto.res.MemberResDto;
import com.ssafy.tati.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PutMemberMapper {

    default Member PutMemberReqDtoToMember(PutMemberReqDto putMemberReqDto){
        if(putMemberReqDto == null) return null;

        Member member = new Member();

        member.setMemberId(putMemberReqDto.getMemberId());
        member.setEmail("email");
        member.setMemberName("member");
        if(putMemberReqDto.getPassword() == null) member.setPassword( "password" );
        else member.setPassword(putMemberReqDto.getPassword());
        if(putMemberReqDto.getNickName() == null) member.setMemberNickName("nickname");
        else member.setMemberNickName(putMemberReqDto.getNickName() );
        member.setTotalScore(10);
        member.setTotalPoint(0);
        member.setTotalStudyTime(0);

        return member;
    }

    MemberResDto memberToPutMemberResDto(Member member);
}
