package com.ssafy.tati.util;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class KakaoCancelResponse {
    private String aid;                         //요청 고유 번호
    private String tid;                         //결제 고유 번호
    private String cid;                         //가맹점 코드
    private String status;                      //결제 상태
    private String partner_order_id;            //가맹점 주문번호
    private String partner_user_id;             //가맹점 회원 id
    private String payment_method_type;         //결제 수단
    private Amount amount;                      //결제 금액 정보
    private ApprovedCancelAmount approved_cancel_amount;    //취소된 금액
    private CanceledAmount canceled_amount;                 //누계 취소 금액
    private CancelAvailableAmount cancel_available_amount;  //남은 취소 가능 금액
    private String name;                        //상품 이름
    private String item_code;                   //상품 코드
    private int quantity;                       //상품 수량
    private String created_at;                  //결제 준비 요청 시각
    private String approved_at;                 //결제 승인 시각
    private String canceled_at;                 //결제 취소 시각
    private String payload;                     //취소 요청시 전달한 값
}
