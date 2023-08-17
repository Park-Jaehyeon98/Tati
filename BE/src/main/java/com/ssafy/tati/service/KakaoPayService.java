package com.ssafy.tati.service;

import com.ssafy.tati.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

//결제 준비하기, 승인하기, 취소하기 요청

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoPayService {

    static final String cid = "TC0ONETIME";                              //가맹점 코드
    static final String adminKey = "1beff779199ad79db387106b760b6cff";   //admin 코드

    private KakaoReadyResponse readyResponse;

    //카카오페이 결제 준비 요청
    public KakaoReadyResponse kakaoPayReady(KaKaoReadyReqDto kaKaoReadyReqDto) {

        MultiValueMap<String, String> parameterValue = new LinkedMultiValueMap<>();

        parameterValue.add("cid", cid);
        parameterValue.add("partner_order_id", "tati_point_order");                         //가맹점 주문번호
        parameterValue.add("partner_user_id", kaKaoReadyReqDto.getEmail());                 //회원 이메일
        parameterValue.add("item_name", "tati_Point");                                      //상품이름
        parameterValue.add("quantity", "1");                                                //상품 수량
        parameterValue.add("total_amount", kaKaoReadyReqDto.getAmount().toString());        //상품 총액
        parameterValue.add("tax_free_amount", "0");                                         //상품 비과세 금액
        parameterValue.add("approval_url", "https://i9b305.p.ssafy.io/MyPage/PointHistory");        //결제 성공 시
        parameterValue.add("cancel_url", "https://i9b305.p.ssafy.io/MyPage/MyPagePoint");               //결제 취소 시
        parameterValue.add("fail_url", "https://i9b305.p.ssafy.io/payment/fail");                   //결제 실패 시

        //파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameterValue, this.getHeaders());

        //카카오에게 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        //api 요청
        readyResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",  //url
                    requestEntity,                              //본문
                    KakaoReadyResponse.class                    //응답 클래스
        );

        return readyResponse;
    }



    //카카오페이 결제 승인 요청
    public KakaoApproveResponse ApproveResponse(@RequestBody KaKaoApproveReqDto kaKaoApproveReqDto){

        MultiValueMap<String, String> parameterValue = new LinkedMultiValueMap<>();
        parameterValue.add("cid", cid);
        parameterValue.add("tid", kaKaoApproveReqDto.getTid());
        parameterValue.add("partner_order_id", "tati_point_order");
        parameterValue.add("partner_user_id", kaKaoApproveReqDto.getEmail());
        parameterValue.add("pg_token", kaKaoApproveReqDto.getPg_token());

        HttpEntity<MultiValueMap<String,String>> requestEntity = new HttpEntity<>(parameterValue, this.getHeaders());

        //외부에 보낼 url
        RestTemplate resetTemplate = new RestTemplate();

        //api 요청
        KakaoApproveResponse approveResponse = resetTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class
        );

        return approveResponse;
    }



    //카카오페이 결제 취소 요청
    public KakaoCancelResponse kakaoPayCancel(@RequestBody KakaoCancleReqDto kakaoCancleReqDto){

        MultiValueMap<String, String> parameterValue = new LinkedMultiValueMap<>();
        parameterValue.add("cid", cid);
        parameterValue.add("tid", kakaoCancleReqDto.getTid());
        parameterValue.add("cancel_amount", kakaoCancleReqDto.getAmount().toString());
        parameterValue.add("cancel_tax_free_amount", "0");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameterValue, this.getHeaders());

        //외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class
        );

        return cancelResponse;
    }


    //카카오 요구 헤더값
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + adminKey;
        String contentType = "application/x-www-form-urlencoded;charset=utf-8";

        httpHeaders.add("Authorization", auth);
        httpHeaders.add("Content-type", contentType);

        return httpHeaders;
    }
}
