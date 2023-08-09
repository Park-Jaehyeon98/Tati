package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.res.StudyMemberResDto;
import com.ssafy.tati.entity.StudyMember;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMemberMapper {

    List<StudyMemberResDto> studyMemberListToStudyMemberResDtoList(List<StudyMember> studyMemberList);
}
