package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.GetMemberReqDto;
import com.ssafy.tati.dto.res.GetMemberResDto;
import com.ssafy.tati.dto.res.MemberResDto;
import com.ssafy.tati.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GetMemberMapper {

   GetMemberResDto memberToGetMemberResDto(Member member);

   Member GetMemberReqDtoToMember(GetMemberReqDto getMemberReqDto);
}
