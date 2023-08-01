package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원 get 응답 DTO")
public class GetMemberResDto {
    @Schema(hidden = true)
    private Integer memberId;

    @Schema(description = "이메일")
    private String email;

    @Schema(description = "닉네임")
    private String memberNickName;

    @Schema(description = "이름")
    private String memberName;

    @Schema(description = "비밀번호")
    private String password;

    @Schema(description = "열정지수")
    private Integer totalScore;

    @Schema(description = "적립금")
    private Integer totalPoint;

    @Schema(description = "총 공부시간")
    private Integer totalStudyTime;

    @Schema(description = "회원가입일")
    private LocalDateTime createdDate;
}
