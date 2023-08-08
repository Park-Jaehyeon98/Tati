package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.AttendanceInReqDto;
import com.ssafy.tati.dto.req.AttendanceOutReqDto;
import com.ssafy.tati.dto.req.board.PostBoardReqDto;
import com.ssafy.tati.dto.res.AttendanceInResDto;
import com.ssafy.tati.dto.res.AttendanceOutResDto;
import com.ssafy.tati.dto.res.MemberResDto;
import com.ssafy.tati.entity.Attendance;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.StudyMember;
import com.ssafy.tati.mapper.AttendanceMapper;
import com.ssafy.tati.service.AttendanceService;
import com.ssafy.tati.service.MemberService;
import com.ssafy.tati.service.StudyMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "스터디 입퇴실(출결)", description = "스터디 입퇴실(출결) API 문서")
@RestController
@RequestMapping("/study/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final MemberService memberService;
    private final StudyMemberService studyMemberService;
    private final AttendanceMapper attendanceMapper;
    private final AttendanceService attendanceService;

    @Operation(summary = "캠스터디 입실", description = "캠스터디 입실 시 요청", responses = {
            @ApiResponse(responseCode = "200", description = "캠스터디 입실 성공"),
    })
    @PostMapping("/in")
    public ResponseEntity<?> attendanceAdd(@RequestBody AttendanceInReqDto attendanceInReqDto) {
        Integer studyId = attendanceInReqDto.getStudyId();
        Integer memberId = attendanceInReqDto.getMemberId();
        StudyMember studyMember = studyMemberService.findStudyMember(studyId, memberId);
        Member member = memberService.findById(memberId);

        Attendance attendance = attendanceMapper.attendanceInReqDtoToAttendance(attendanceInReqDto, studyMember, member);

        Attendance createdAttendance = attendanceService.addAttendance(attendance);
        AttendanceInResDto attendanceInResDto = attendanceMapper.attendanceToAttendanceInResDto(createdAttendance);
        return new ResponseEntity<>(attendanceInResDto, HttpStatus.OK);
    }

    @Operation(summary = "캠스터디 퇴실", description = "캠스터디 퇴실 시 요청", responses = {
            @ApiResponse(responseCode = "200", description = "캠스터디 퇴실 성공"),
    })
    @PutMapping("/out")
    public ResponseEntity<?> attendanceSave(@RequestBody AttendanceOutReqDto attendanceOutReqDto) {
        Attendance attendance = attendanceMapper.attendanceOutReqDtoToAttendance(attendanceOutReqDto);
        Attendance modifiedAttendance = attendanceService.modifyAttendance(attendance, attendanceOutReqDto.getMemberId());
        AttendanceOutResDto attendanceOutResDto = attendanceMapper.attendanceToAttendanceOutResDto(modifiedAttendance);
        return new ResponseEntity<>(attendanceOutResDto, HttpStatus.OK);
    }
}
