package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyApplicantReqDto;
import com.ssafy.tati.dto.res.StudyAllListResDto;
import com.ssafy.tati.dto.res.StudyApplicantMemberResDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.mapper.StudyApplicantMapper;
import com.ssafy.tati.repository.MemberRepository;
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

@Tag(name = "스터디 게시판", description = "스터디 게시판 API 문서")
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

//    @PostMapping("/{studyId}")
//    public ResponseEntity<?> studyApplicantToMember(@PathVariable("studyId") Integer studyId, @R){
//
//    }

}
