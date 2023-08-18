package com.ssafy.tati.util;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Schema(description = "kakaopay 결제 준비 요청 dto")
public class KaKaoReadyReqDto {
    @Schema(description = "회원 이메일")
    private String email;

    @Schema(description = "상품 총액")
    private Integer amount;

    @Schema(description = "날짜")
    private String pointDate;
}
