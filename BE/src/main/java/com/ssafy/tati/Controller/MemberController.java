package com.ssafy.tati.Controller;

import com.ssafy.tati.dto.req.NickNameReqDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.util.Optional;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    //비밀번호 수정

    //회원정보 수정 페이지 접속
//    @GetMapping("mypage/modify/{email}")
//    public ResponseEntity<?> modifyMypage(@PathVariable String email){
//
//        try{
//            Member member = memberService.findByEmail(email)
//                    .orElseThrow(NullPointerException::new);
//
//            return new ResponseEntity<>(, )
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }

    //닉네임 수정
    @PostMapping("/mypage/modifyNickName")
    public ResponseEntity<?> modifyNickname(@RequestBody NickNameReqDto nickNameReqDto){
        try{
            memberService.nickNameChange(nickNameReqDto.getMemberId(), nickNameReqDto.getNickName());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //회원 탈퇴
    @DeleteMapping("mypage/remove/{email}")
    public ResponseEntity<?> deleteMember(@PathVariable String email){
        try{
            Member member = memberService.findByEmail(email)
                    .orElseThrow(NullPointerException::new);
            memberService.deleteMember(member.getMemberId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }




}
