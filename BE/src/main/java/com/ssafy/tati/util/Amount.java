package com.ssafy.tati.util;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class Amount {
    private Long total;         //전체 결제 금액
    private Long tax_free;      //비과세 금액
    private Long vat;           //부과세 금액
    private Long point;         //사용한 포인트 금액
    private Long discount;      //할인금액
    private Long green_deposit; //컵보증금
}


