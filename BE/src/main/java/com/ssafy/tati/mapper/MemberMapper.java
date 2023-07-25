package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.MemberReqDto;
import com.ssafy.tati.dto.res.MemberResDto;
import com.ssafy.tati.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    default Member memberReqDtoToMember(MemberReqDto memberReqDto){
        if ( memberReqDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( memberReqDto.getMemberId() );
        member.setEmail( memberReqDto.getEmail() );
        member.setPassword( memberReqDto.getPassword() );
        member.setMemberName( memberReqDto.getMemberName() );
        member.setMemberNickName( memberReqDto.getMemberNickName() );
        member.setTotalScore(10);
        member.setTotalPoint(0);
        member.setTotalStudyTime(0);

        return member;
    }

    MemberResDto memberToMemberResDto(Member member);
}

