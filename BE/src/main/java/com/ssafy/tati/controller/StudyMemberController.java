package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyMemberSecessionReqDto;
import com.ssafy.tati.dto.res.StudyMemberListResDto;
import com.ssafy.tati.dto.res.StudyMemberSecessionResDto;
import com.ssafy.tati.mapper.StudyMemberMapper;
import com.ssafy.tati.service.StudyMemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "진행 스터디 회원", description = "진행 스터디 회원 API 문서")
@RestController
@RequestMapping("/study/member")
@RequiredArgsConstructor
public class StudyMemberController {
    private final StudyMemberService studyMemberService;
//    private final StudyMemberMapper studyMemberMapper;

    @GetMapping("/{studyId}")
    public ResponseEntity<?> studyMemberList(@PathVariable Integer studyId){
        StudyMemberListResDto studyMemberListResDto = new StudyMemberListResDto(studyMemberService.getStudyMember(studyId));
        return new ResponseEntity<>(studyMemberListResDto, HttpStatus.OK);
    }

    @PostMapping("/sesession")
    public ResponseEntity<?> studyMemberSecession(@RequestBody StudyMemberSecessionReqDto studyMemberSecessionReqDto){
        StudyMemberSecessionResDto studyMemberSecessionResDto = studyMemberService.studyMemberSecession(studyMemberSecessionReqDto.getStudyId(), studyMemberSecessionReqDto.getMemberId());
        return new ResponseEntity<>(studyMemberSecessionResDto, HttpStatus.OK);
    }


}
