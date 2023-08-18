package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 참가 회원 리스트 ResDto")
public class StudyMemberListResDto {
    @Schema(description = "스터디 참가 회원 리스트")
    private List<StudyMemberResDto> studyMemberResDtoList;
}
