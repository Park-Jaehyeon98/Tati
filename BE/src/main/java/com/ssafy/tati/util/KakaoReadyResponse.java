package com.ssafy.tati.util;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//결제 준비하기 요청에 대한 응답

@ToString
@Getter @Setter
public class KakaoReadyResponse {
    private String tid;                     //결제 고유번호
    private String next_redirect_pc_url;     //클라이언트가 웹일 경우 결제 페이지 url
    private String created_at;              //결제 준비 요청 시간
}
