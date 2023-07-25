package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "이메일 요청 DTO")
public class EmailReqDto {
    @Schema(description = "이메일")
    private String email;
    @Schema(description = "이메일 인증코드")
    private String code;
}
