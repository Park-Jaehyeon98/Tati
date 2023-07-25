package com.ssafy.tati.controller;

import com.ssafy.tati.mapper.StudyMapper;
import com.ssafy.tati.service.MemberService;
import com.ssafy.tati.service.StudyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "스터디", description = "스터디 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;
    private final StudyMapper studyMapper;
    private final MemberService memberService;

}
