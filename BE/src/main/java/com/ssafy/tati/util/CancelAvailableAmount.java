package com.ssafy.tati.util;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class CancelAvailableAmount {
    private int total;          //취소 가능 금액
    private int tax_free;       //취소 가능한 비과세 금액
    private int vat;            //취소 가능한 부가세 금액
    private int point;          //취소 가능한 포인트 금액
    private int discount;       //취소 가능한 할인 금액
    private int green_deposit;  //컵 보증금
}
