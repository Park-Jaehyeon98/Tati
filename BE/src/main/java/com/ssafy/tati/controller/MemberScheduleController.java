package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.ScheduleReqDto;
import com.ssafy.tati.dto.res.ScheduleResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.MemberSchedule;
import com.ssafy.tati.mapper.ScheduleMapper;
import com.ssafy.tati.service.MemberScheduleService;
import com.ssafy.tati.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@Tag(name = "회원 일정", description = "회원일정 API 문서")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberScheduleController {

    private final MemberService memberService;
    private final MemberScheduleService memberScheduleService;
    private final ScheduleMapper scheduleMapper;

    @Operation(summary = "일정 등록", description = "회원이 일정 등록")
    @PostMapping("/mypage/schedule")
    public ResponseEntity<?> makeSchedule(@RequestBody ScheduleReqDto postScheduleReqDto){
        Member member = memberService.findByEmail(postScheduleReqDto.getEmail());

        MemberSchedule schedule =
                scheduleMapper.scheduleReqDtoToMemberSchedule(member, postScheduleReqDto);

        memberScheduleService.save(schedule);

        ScheduleResDto scheduleResDto = scheduleMapper.memberScheduleToScheduleResDto(schedule);
        return new ResponseEntity<>(scheduleResDto, HttpStatus.OK);
    }

    @Operation(summary = "일정 삭제", description = "회원이 일정 삭제")
    @DeleteMapping("/mypage/schedule/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Integer scheduleId ){
        MemberSchedule schedule = memberScheduleService.findById(scheduleId);

        Integer memberId = schedule.getMember().getMemberId();
        int year =  schedule.getMemberScheduleDate().getYear();
        int month = schedule.getMemberScheduleDate().getMonthValue();

        memberScheduleService.delete(scheduleId);

        List<MemberSchedule> schedules = memberScheduleService.findSchedules(memberId ,year, month);
        List<ScheduleResDto> scheduleList =
                scheduleMapper.memberScheduleListToScheduleResDtoList(schedules);

        return new ResponseEntity<>(scheduleList, HttpStatus.OK);
    }


    @Operation(summary = "일정 조회", description = "회원이 자신의 일정 조회")
    @GetMapping("/mypage/schedule/{memberId}")
    public ResponseEntity<?> selectSchedule(@PathVariable Integer memberId, Integer year, Integer month){
        List<MemberSchedule> schedules = memberScheduleService.findSchedules(memberId , year, month);

        List<ScheduleResDto> scheduleList =
                scheduleMapper.memberScheduleListToScheduleResDtoList(schedules);
        
        return new ResponseEntity<>(scheduleList, HttpStatus.OK);
    }

}
