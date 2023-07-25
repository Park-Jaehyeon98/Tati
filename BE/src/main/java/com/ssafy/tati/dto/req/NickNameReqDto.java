package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(description = "닉네임 수정 DTO")
public class NickNameReqDto {
    @Schema(description = "회원식별번호")
    private Integer memberId;

    @Schema(description = "닉네임")
    private String nickName;
}
