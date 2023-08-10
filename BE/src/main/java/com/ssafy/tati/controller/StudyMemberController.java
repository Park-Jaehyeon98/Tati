package com.ssafy.tati.controller;

import com.ssafy.tati.dto.res.StudyApplicantApprovalMemberResDto;
import com.ssafy.tati.dto.res.StudyMemberListResDto;
import com.ssafy.tati.dto.res.StudyMemberSecessionResDto;
import com.ssafy.tati.service.StudyMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    @Operation(summary = "스터디 참가 회원 조회", description = "스터디 참가 회원 조회 버튼을 누르면 스터디 참가 회원들의 정보 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 참가 회원 조회 성공", content = @Content(schema = @Schema(implementation = StudyMemberListResDto.class)))})
    @GetMapping("/{studyId}")
    public ResponseEntity<?> studyMemberList(@PathVariable Integer studyId){
        StudyMemberListResDto studyMemberListResDto = new StudyMemberListResDto(studyMemberService.getStudyMember(studyId));
        return new ResponseEntity<>(studyMemberListResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 탈퇴", description = "스터디 탈퇴 버튼을 누르면 해당 스터디 탈퇴 후 보증금 계산 후 반환", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 탈퇴 성공", content = @Content(schema = @Schema(implementation = StudyMemberSecessionResDto.class)))})
    @DeleteMapping("/{memberId}/sesession/{studyId}")
    public ResponseEntity<?> studyMemberSecession(@PathVariable Integer studyId, @PathVariable Integer memberId){
        StudyMemberSecessionResDto studyMemberSecessionResDto = studyMemberService.studyMemberSecession(studyId, memberId);
        return new ResponseEntity<>(studyMemberSecessionResDto, HttpStatus.OK);
    }

}
