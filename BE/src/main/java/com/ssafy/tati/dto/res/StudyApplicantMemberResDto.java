package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 신청 인원 리스트 Dto")
public class StudyApplicantMemberResDto {
    @Schema(description = "회원 식별번호")
    private Integer memberId;
    @Schema(description = "회원 닉네임")
    private String memberNickName;
    @Schema(description = "회원 열정지수")
    private Integer totalScore;
    @Schema(description = "회원 총 공부시간")
    private Integer totalStudyTime;


}
