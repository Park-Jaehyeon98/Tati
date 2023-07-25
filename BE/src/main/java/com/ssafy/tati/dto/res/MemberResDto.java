package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "회원 응답 DTO")
public class MemberResDto {
    @Schema(description = "회원 식별자")
    private Integer memberId;
    @Schema(description = "이메일")
    private String email;
    @Schema(description = "닉네임")
    private String memberNickName;
    @Schema(description = "이름")
    private String memberName;
    @Schema(description = "비밀번호")
    private String password;
}
