package com.ssafy.tati.controller;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import com.ssafy.tati.service.KakaoPayService;
import com.ssafy.tati.service.MemberService;
import com.ssafy.tati.service.PointService;
import com.ssafy.tati.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static java.time.LocalDateTime.now;


@Controller
@RequestMapping("/payment")
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;
    private final MemberService memberService;
    private final PointService pointService;

    @PostMapping("/ready")  //결제준비요청
    public ResponseEntity<?> readyToKakaoPay(@RequestBody KaKaoReadyReqDto kaKaoReadyReqDto){
        memberService.findByEmail(kaKaoReadyReqDto.getEmail());

        KakaoReadyResponse readyResponse = kakaoPayService.kakaoPayReady(kaKaoReadyReqDto);
        return new ResponseEntity<>(readyResponse, HttpStatus.OK);
    }

    @PostMapping("/success") //결제승인요청
    public ResponseEntity afterPayRequest(@RequestBody KaKaoApproveReqDto kaKaoApproveReqDto){
        System.out.println("tid : " +kaKaoApproveReqDto.getTid());
        KakaoApproveResponse approveResponse = kakaoPayService.ApproveResponse(kaKaoApproveReqDto);
        Member member = memberService.findByEmail(kaKaoApproveReqDto.getEmail());
        Point point = new Point(0, approveResponse.getTid(), now(),
                approveResponse.getAmount().getTotal(), "포인트 적립", member);
        pointService.save(point);

        return new ResponseEntity(approveResponse, HttpStatus.OK);
    }

    @PostMapping("/cancel") //결제취소요청
    public ResponseEntity cancelPayRequest(@RequestBody KakaoCancleReqDto kakaoCancleReqDto){
        KakaoCancelResponse cancelResponse = kakaoPayService.kakaoPayCancel(kakaoCancleReqDto);
        Member member = memberService.findByEmail(kakaoCancleReqDto.getEmail());
        pointService.delete(new Point(0, cancelResponse.getTid(), now(),
                cancelResponse.getCanceled_amount().getTotal(), "결제취소", member));
        return new ResponseEntity(cancelResponse, HttpStatus.OK);
    }
}
