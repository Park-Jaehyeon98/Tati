package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.MemberReqDto;
import com.ssafy.tati.dto.req.PutMemberReqDto;
import com.ssafy.tati.dto.res.GetMemberResDto;
import com.ssafy.tati.dto.res.MemberResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.mapper.GetMemberMapper;
import com.ssafy.tati.mapper.MemberMapper;
import com.ssafy.tati.mapper.PutMemberMapper;
import com.ssafy.tati.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "회원 마이페이지", description = "회원 마이페이지 API 문서")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MyPageController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final GetMemberMapper getMemberMapper;
    private final PutMemberMapper putMemberMapper;

    //비밀번호 확인 > 회원정보 페이지 접속
    @Operation(summary = "비밀번호 확인", description = "비밀번호를 입력하면 이메일로 회원을 가져와 비밀번호를 비교")
    @PostMapping("/mypage/check")
    public ResponseEntity<?> checkPassword(@RequestBody MemberReqDto memberReqDto){
        Member member = memberMapper.memberReqDtoToMember(memberReqDto);
        memberService.loginMember(member);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //닉네임 수정
    @Operation(summary = "닉네임 수정", description = "닉네임을 입력하면, db에서 회원을 찾고 닉네임을 수정")
    @PutMapping("/mypage/modifyNickName")
    public ResponseEntity<?> modifyNickname(@RequestBody PutMemberReqDto putMemberReqDto){
        Member member = putMemberMapper.PutMemberReqDtoToMember(putMemberReqDto);
        memberService.modifyNickName(member.getEmail(), member.getMemberNickName());

        Member findMember = memberService.findByEmail(putMemberReqDto.getEmail());
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(findMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }


    //비밀번호 수정
    @Operation(summary = "비밀번호 수정", description = "비밀번호를 입력하면, db에서 회원을 찾고 비밀번호를 수정")
    @PutMapping("/mypage/modifyPassword")
    public ResponseEntity<?> modifyPassword(@RequestBody PutMemberReqDto putMemberReqDto){
        Member member = putMemberMapper.PutMemberReqDtoToMember(putMemberReqDto);
        memberService.modifyPassword(member.getEmail(), member.getPassword());

        Member findMember = memberService.findByEmail(putMemberReqDto.getEmail());
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(findMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }


    //회원 탈퇴
    @Operation(summary = "회원탈퇴", description = "회원탈퇴 클릭하면, db에서 회원을 찾고 회원 삭제")
    @DeleteMapping("mypage/remove/{email}")
    public ResponseEntity<?> deleteMember(@PathVariable String email) {
        Member findMember = memberService.findByEmail(email);
        memberService.deleteMember(findMember.getMemberId());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //회원정보 수정 페이지 접속
    @Operation(summary = "회원정보 반환", description = "회원정보 페이지 클릭하면, db에서 회원을 찾고 회원 반환")
    @GetMapping("mypage/modify/{email}")
    public ResponseEntity<?> selectMember(@PathVariable String email){
        Member member = memberService.findByEmail(email);
        GetMemberResDto memberResDto = getMemberMapper.memberToGetMemberResDto(member);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }
}
