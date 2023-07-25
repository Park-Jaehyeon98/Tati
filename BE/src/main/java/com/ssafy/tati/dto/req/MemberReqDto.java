package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "회원 요청 DTO")
public class MemberReqDto {
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
}
