package com.ssafy.tati.Controller;

import com.ssafy.tati.entity.Point;
import com.ssafy.tati.service.KakaoPayService;
import com.ssafy.tati.util.KakaoApproveResponse;
import com.ssafy.tati.util.KakaoCancelResponse;
import com.ssafy.tati.util.KakaoReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class KakaoPayController {

    KakaoPayService kakaoPayService;


    @PostMapping("/ready")  //결제준비요청
    public ResponseEntity readyToKakaoPay(Point point){
        KakaoReadyResponse readyResponse = kakaoPayService.kakaoPayReady(point);
        return new ResponseEntity<String>(readyResponse.getNext_redirect_pc_url(), HttpStatus.OK);
    }

    @PostMapping("/success") //결제승인요청
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken){
        KakaoApproveResponse approveResponse = kakaoPayService.ApproveResponse(pgToken);
        return new ResponseEntity(approveResponse, HttpStatus.OK);
    }

    @PostMapping("/cancel") //결제취소요청
    public ResponseEntity cancelPayRequest(){
        KakaoCancelResponse cancelResponse = kakaoPayService.kakaoPayCancel();
        return new ResponseEntity(cancelResponse, HttpStatus.OK);
    }




}
