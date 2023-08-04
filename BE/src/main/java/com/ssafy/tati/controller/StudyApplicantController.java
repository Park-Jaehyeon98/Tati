package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyApplicantReqDto;
import com.ssafy.tati.dto.res.StudyApplicantMemberResDto;
import com.ssafy.tati.dto.res.StudyIdResDto;
import com.ssafy.tati.mapper.StudyApplicantMapper;
import com.ssafy.tati.service.StudyApplicantService;
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
//    private final StudyApplicantMapper studyApplicantMapper;
    @PostMapping
    public ResponseEntity<?> studyApplicant(@RequestBody StudyApplicantReqDto studyApplicantReqDto){
        StudyIdResDto studyIdResDto = studyApplicantService.studyApplicantMember(studyApplicantReqDto.getStudyId(), studyApplicantReqDto.getMemberId());
        return new ResponseEntity<>(studyIdResDto, HttpStatus.OK);
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<?> studyApplicantMemberList(@PathVariable("studyId") Integer studyId){
        List<StudyApplicantMemberResDto> studyApplicantMemberResDtoList = studyApplicantService.getStudyApplicantMember(studyId);
        return new ResponseEntity<>(studyApplicantMemberResDtoList, HttpStatus.OK);
    }
}
