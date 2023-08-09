package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 참가 회원 ResDto")
public class StudyMemberResDto {

    @Schema(description = "회원 닉네임")
    private String memberNickName;
    @Schema(description = "회원 열정지수")
    private Integer totalScore;
    @Schema(description = "회원 가입일")
    private String createdDate;

}
