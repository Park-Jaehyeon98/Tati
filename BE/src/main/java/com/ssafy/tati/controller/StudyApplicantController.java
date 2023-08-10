package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyApplicantReqDto;
import com.ssafy.tati.dto.req.StudyApplicantApprovalMemberReqDto;
import com.ssafy.tati.dto.res.StudyApplicantMemberResDto;
import com.ssafy.tati.dto.res.StudyApplicantApprovalMemberResDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.mapper.StudyApplicantMapper;
import com.ssafy.tati.service.StudyApplicantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "스터디 신청", description = "스터디 신청 API 문서")
@RestController
@RequestMapping("/study/applicant")
@RequiredArgsConstructor
public class StudyApplicantController {
    private final StudyApplicantService studyApplicantService;
    private final StudyApplicantMapper studyApplicantMapper;

    @Operation(summary = "스터디 신청", description = "클라이언트가 스터디 상세페이지에서 스터디 신청", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 신청 성공", content = @Content(schema = @Schema(implementation = StudyIdResDto.class)))})
    @PostMapping
    public ResponseEntity<?> studyApplicant(@RequestBody StudyApplicantReqDto studyApplicantReqDto){
        StudyIdResDto studyIdResDto = studyApplicantService.studyApplicantMember(studyApplicantReqDto.getStudyId(), studyApplicantReqDto.getMemberId());
        return new ResponseEntity<>(studyIdResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 신청 회원 조회", description = "방장이 스터디 신청자들의 정보 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 신청 회원 조회 성공", content = @Content(schema = @Schema(implementation = StudyApplicantMemberResDto.class)))})
    @GetMapping("/{studyId}")
    public ResponseEntity<?> studyApplicantMemberList(@PathVariable("studyId") Integer studyId){
        List<Member> memberList = studyApplicantService.getStudyApplicantMember(studyId);
        List<StudyApplicantMemberResDto> studyApplicantMemberResDtoList = studyApplicantMapper.memberListToStudyApplicantMemberResDtoList(memberList);
        return new ResponseEntity<>(studyApplicantMemberResDtoList, HttpStatus.OK);
    }

    @Operation(summary = "진행 스터디 멤버로 변경", description = "방장이 스터디 신청자 목록에서 수락 버튼을 누르면 진행 스터디 회원으로 변경 후 스터디 신청자 목록에서 제거", responses = {
            @ApiResponse(responseCode = "200", description = "진행 스터디 멤버로 변경 성공", content = @Content(schema = @Schema(implementation = StudyApplicantApprovalMemberResDto.class)))})
    @PostMapping("/approval")
    public ResponseEntity<?> studyApplicantApprovalMember(@RequestBody StudyApplicantApprovalMemberReqDto studyApplicantApprovalMemberReqDto){
        StudyApplicantApprovalMemberResDto studyApplicantApprovalMemberResDto = studyApplicantService.getStudyApplicantApprovalMember(studyApplicantApprovalMemberReqDto.getStudyId(), studyApplicantApprovalMemberReqDto.getMemberId());
        return new ResponseEntity<>(studyApplicantApprovalMemberResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 신청 취소", description = "방장이 스터디 신청자 목록에서 거절 버튼을 누르면 스터디 신청자 목록에서 제거", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 신청 취소 성공", content = @Content(schema = @Schema(implementation = StudyApplicantApprovalMemberResDto.class)))})
    @DeleteMapping("{studyId}/refuse/{memberId}")
    public ResponseEntity<?> studyApplicantRefuseMember(@PathVariable Integer studyId, @PathVariable Integer memberId){
        StudyApplicantApprovalMemberResDto studyApplicantApprovalMemberResDto = studyApplicantService.getStudyApplicantRefuseMember(studyId, memberId);
        return new ResponseEntity<>(studyApplicantApprovalMemberResDto, HttpStatus.OK);
    }

}
