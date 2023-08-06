package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.res.StudyApplicantMemberResDto;
import com.ssafy.tati.entity.Member;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyApplicantMapper {
    List<StudyApplicantMemberResDto> memberListToStudyApplicantMemberResDtoList(List<Member> memberList);
}
