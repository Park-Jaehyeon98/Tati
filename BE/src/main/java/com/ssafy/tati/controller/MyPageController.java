package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.MemberReqDto;
import com.ssafy.tati.dto.req.PutMemberReqDto;
import com.ssafy.tati.dto.res.GetMemberResDto;
import com.ssafy.tati.dto.res.MemberResDto;
import com.ssafy.tati.dto.res.MemberStudyResDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.mapper.GetMemberMapper;
import com.ssafy.tati.mapper.MemberMapper;
import com.ssafy.tati.mapper.PutMemberMapper;
import com.ssafy.tati.service.MemberService;
import com.ssafy.tati.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Tag(name = "회원 마이페이지", description = "회원 마이페이지 API 문서")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MyPageController {

    private final MemberService memberService;
    private final S3Service s3Service;
    private final MemberMapper memberMapper;
    private final GetMemberMapper getMemberMapper;
    private final PutMemberMapper putMemberMapper;

    //회원정보 페이지 접속 시 비밀번호 확인
    @Operation(summary = "비밀번호 확인", description = "비밀번호를 입력하면 이메일로 회원을 가져와 비밀번호를 비교")
    @PostMapping("/mypage/check")
    public ResponseEntity<?> checkPassword(@RequestBody MemberReqDto memberReqDto){
        Member member = memberMapper.memberReqDtoToMember(memberReqDto);
        memberService.loginMember(member);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //닉네임 수정
    @Operation(summary = "닉네임 수정", description = "닉네임을 입력하면, db에서 회원을 찾고 닉네임을 수정")
    @PutMapping(value="/mypage/modifyNickName", consumes = "multipart/form-data")
    public ResponseEntity<?> modifyNickname(PutMemberReqDto putMemberReqDto) throws IOException {

        String url = "";
        if(putMemberReqDto.getImg() != null) url = s3Service.uploadFile(putMemberReqDto.getImg());

        Member member = putMemberMapper.PutMemberReqDtoToMember(putMemberReqDto);
        memberService.modifyNickName(member.getMemberId(), member.getMemberNickName());
        if(putMemberReqDto.getImg() != null) member.setImg(url);

        //이미지가 이미 있을 때 추가 필요

        Member findMember = memberService.findById(putMemberReqDto.getMemberId());
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(findMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }


    //비밀번호 수정
    @Operation(summary = "비밀번호 수정", description = "비밀번호를 입력하면, db에서 회원을 찾고 비밀번호를 수정")
    @PutMapping(value="/mypage/modifyPassword", consumes = "multipart/form-data")
    public ResponseEntity<?> modifyPassword(PutMemberReqDto putMemberReqDto, @RequestParam(name="file") MultipartFile multipartFile){
        Member member = putMemberMapper.PutMemberReqDtoToMember(putMemberReqDto);
        memberService.modifyPassword(member.getMemberId(), member.getPassword());

        Member findMember = memberService.findById(putMemberReqDto.getMemberId());
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(findMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }


    //회원 탈퇴
    @Operation(summary = "회원탈퇴", description = "회원탈퇴 클릭하면, db에서 회원을 찾고 회원 삭제")
    @DeleteMapping("mypage/remove/{memberId}")
    public ResponseEntity<?> deleteMember(@PathVariable Integer memberId) {
        Member findMember = memberService.findById(memberId);
        memberService.deleteMember(findMember.getMemberId());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    //회원정보 수정 페이지 접속
    @Operation(summary = "회원정보 반환", description = "회원정보 페이지 클릭하면, db에서 회원을 찾고 회원 반환")
    @GetMapping("mypage/modify/{memberId}")
    public ResponseEntity<?> selectMember(@PathVariable Integer memberId){
        Member member = memberService.findById(memberId);
        GetMemberResDto memberResDto = getMemberMapper.memberToGetMemberResDto(member);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

    //회원의 가입, 신청 스터디와 작성 글 관련 페이지 접속
    @GetMapping("member/mypage/study-list/{memberId}")
    public ResponseEntity<?> selectMemberStudyList(@PathVariable Integer memberId){

        List<Study> studyList = memberService.selectStudyList(memberId);
        List<Board> boardList = memberService.selectBoard(memberId);

        MemberStudyResDto memberStudyResDto = new MemberStudyResDto(studyList, boardList);

        return new ResponseEntity<>(memberStudyResDto, HttpStatus.OK);
    }
}
