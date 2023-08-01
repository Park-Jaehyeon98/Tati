package com.ssafy.tati.util;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Schema(description = "kakaopay 결제 승인 요청 dto")
public class KaKaoApproveReqDto {
    @Schema(description = "결제 고유번호")
    private String tid;

    @Schema(description = "token")
    private String pg_token;

    @Schema(description = "회원 이메일")
    private String email;
}
