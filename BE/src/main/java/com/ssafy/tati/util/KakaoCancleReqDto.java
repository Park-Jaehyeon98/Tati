package com.ssafy.tati.util;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "kakaopay 결제 취소 요청 dto")
public class KakaoCancleReqDto {

    @Schema(description = "결제 고유 번호")
    private String tid;

    @Schema(description = "환불 총액")
    private Integer amount;

    @Schema(description = "회원 이메일")
    private String email;
}