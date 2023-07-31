package com.ssafy.tati.util;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class Amount {
    private int total;         //전체 결제 금액
    private int tax_free;      //비과세 금액
    private int vat;           //부과세 금액
    private int point;         //사용한 포인트 금액
    private int discount;      //할인금액
    private int green_deposit; //컵보증금
}


