package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원정보 수정 DTO")
public class PutMemberReqDto {
    @Schema(description = "이메일")
    private String email;

    @Schema(description = "닉네임")
    private String nickName;

    @Schema(description = "비밀번호")
    private String password;
}
