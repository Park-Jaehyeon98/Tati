package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.GetMemberReqDto;
import com.ssafy.tati.dto.res.GetMemberResDto;
import com.ssafy.tati.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GetMemberMapper {

    default Member GetMemberReqDtoMember(GetMemberReqDto getMemberReqDto){
        if(getMemberReqDto == null) return null;

        Member member = new Member();

        member.setMemberId( getMemberReqDto.getMemberId() );
        member.setEmail( getMemberReqDto.getEmail() );
        member.setPassword( getMemberReqDto.getPassword() );
        member.setMemberName( getMemberReqDto.getMemberName() );
        member.setMemberNickName( getMemberReqDto.getMemberNickName() );
        member.setTotalScore( getMemberReqDto.getTotalScore());
        member.setTotalPoint(getMemberReqDto.getTotalPoint());
        member.setTotalStudyTime(getMemberReqDto.getTotalStudyTime());

        return member;
    }

    GetMemberResDto memberToGetMemberResDto(Member member);


}
