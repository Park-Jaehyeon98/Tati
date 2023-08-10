package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.MemberReqDto;
import com.ssafy.tati.dto.req.PutMemberReqDto;
import com.ssafy.tati.dto.res.*;
import com.ssafy.tati.entity.*;
import com.ssafy.tati.mapper.AttendanceMapper;
import com.ssafy.tati.mapper.GetMemberMapper;
import com.ssafy.tati.mapper.MemberMapper;
import com.ssafy.tati.mapper.PutMemberMapper;
import com.ssafy.tati.service.MemberScheduleService;
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
import java.time.*;
import java.util.ArrayList;
import java.util.List;


@Tag(name = "회원 마이페이지", description = "회원 마이페이지 API 문서")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MyPageController {

    private final MemberService memberService;
    private final MemberScheduleService memberScheduleService;
    private final S3Service s3Service;
    private final MemberMapper memberMapper;
    private final GetMemberMapper getMemberMapper;
    private final PutMemberMapper putMemberMapper;
    private final AttendanceMapper attendanceMapper;

    @Operation(summary = "마이페이지 접속", description = "마이페이지 접속 시 일정, 할 일, 공부 시간, 열정 지수 확인")
    @GetMapping("mypage/{memberId}")
    public ResponseEntity<?> enterMypage(@PathVariable Integer memberId, Integer year, Integer month){

        System.out.println(memberId + ", year : " +year+ ", month : " +month);

        Member member = memberService.findById(memberId);

        //회원 이미지
        String img = member.getImg();

        //오늘 공부시간
        int todayStudyTime = 0;
        List<Attendance> attendances = memberService.attendanceList(memberId);

        LocalDateTime now = LocalDateTime.now();
        for(Attendance attendance : attendances){
            if(attendance.getIsAttended()==0) continue;

            LocalDate studyDay = attendance.getInTime().toLocalDate();

            Period piff = Period.between(now.toLocalDate(), studyDay);

            if(piff.isZero()) {
                Duration diff = Duration.between( attendance.getOutTime(),attendance.getInTime());
                todayStudyTime+=diff.toMillis();
            }
        }

        String studyTime = (todayStudyTime / (1000 * 60 * 60)) + "시간 " +  (todayStudyTime / (1000 * 60)) + "분 "
                + (todayStudyTime / 1000) + "초";

        //총 공부 시간
        Integer totalTime = member.getTotalStudyTime();
        String totalStudyTime = (totalTime/ (1000 * 60 * 60)) + "시간 " +  (totalTime / (1000 * 60)) + "분 "
                + (totalTime / 1000) + "초";

        //열정 지수
        int totalScore = member.getTotalScore();

        //가입한 스터디 중 한 달 일정 (스터디 아이디, 스터디 이름, 스터디 기간, 스터디 시간, 요일)
        List<StudyResDto> mypageStudyResDto = new ArrayList<>();

        List<Study> studyList = memberService.selectStudyList(memberId);
        for(Study study : studyList){
            List<StudySchedule> studyScheduleList = study.getStudyScheduleList();

            List<StudyScheduleResDto> studyScheduleResList = new ArrayList<>();
            for(StudySchedule schedule : studyScheduleList){
                studyScheduleResList.add(new StudyScheduleResDto(schedule.getStudyDay(),
                        schedule.getStudyStartTime().toString(), schedule.getStudyEndTime().toString()));
            }

            mypageStudyResDto.add(new StudyResDto(study.getStudyId(), study.getStudyName(),
                    study.getStudyStartDate(), study.getStudyEndDate(), studyScheduleResList));
        }

        //한 달 일정
        List<MemberSchedule> schedules = memberScheduleService.findSchedules(memberId , year, month);
        List<ScheduleResDto> scheduleResDtoList = new ArrayList<>();
        for(MemberSchedule schedule : schedules){
            scheduleResDtoList.add( new ScheduleResDto( schedule.getMemberScheduleId(), schedule.getMemberScheduleDate(),
                            schedule.getMemberScheduleTitle(), schedule.getMemberScheduleTitle()));
        }

        // 입퇴실 내역
        List<Attendance> attendance = memberService.attendanceList(memberId);
        List<AttendanceResDto> attendanceList = attendanceMapper.attendanceListToAttendanceResDtoList(attendance);

        MyPageResDto myPageResDto =  new MyPageResDto(img, studyTime, totalStudyTime, totalScore,
                mypageStudyResDto, scheduleResDtoList, attendanceList);

        return new ResponseEntity<>(myPageResDto, HttpStatus.OK);
    }



    //회원정보 페이지 접속 시 비밀번호 확인
    @Operation(summary = "비밀번호 확인", description = "비밀번호를 입력하면 이메일로 회원을 가져와 비밀번호를 비교")
    @PostMapping("/mypage/check")
    public ResponseEntity<?> checkPassword(@RequestBody MemberReqDto memberReqDto){
        Member member = memberMapper.memberReqDtoToMember(memberReqDto);
        memberService.loginMember(member);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //회원정보 마이페이지 접속 시 반환
    @Operation(summary = "회원정보 반환", description = "회원정보 페이지 클릭하면, db에서 회원을 찾고 회원 반환")
    @GetMapping("mypage/modify/{memberId}")
    public ResponseEntity<?> selectMember(@PathVariable Integer memberId){
        Member member = memberService.findById(memberId);
        GetMemberResDto memberResDto = getMemberMapper.memberToGetMemberResDto(member);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }

    //닉네임 수정
    @Operation(summary = "닉네임 수정", description = "닉네임을 입력하면, db에서 회원을 찾고 닉네임을 수정")
    @PutMapping(value="/mypage/modifyNickName", consumes = {"multipart/form-data"})
    public ResponseEntity<?> modifyNickname(@RequestPart PutMemberReqDto putMemberReqDto,
                                @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {

        Member member = putMemberMapper.PutMemberReqDtoToMember(putMemberReqDto);
        memberService.modifyNickName(member.getMemberId(), member.getMemberNickName());

        String url = "";
        if(multipartFile != null) {
            String memberImg = member.getImg();

            if(memberImg!=null) s3Service.deleteFile(memberImg);
            url = s3Service.uploadFile(multipartFile);
            memberService.modifyImg(member.getMemberId(), url);
        }

        Member findMember = memberService.findById(putMemberReqDto.getMemberId());
        MemberResDto memberResDto = memberMapper.memberToMemberResDto(findMember);
        return new ResponseEntity<>(memberResDto, HttpStatus.OK);
    }


    //비밀번호 수정
    @Operation(summary = "비밀번호 수정", description = "비밀번호를 입력하면, db에서 회원을 찾고 비밀번호를 수정")
    @PutMapping(value="/mypage/modifyPassword")
    public ResponseEntity<?> modifyPassword(@RequestBody PutMemberReqDto putMemberReqDto){
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

    //회원 가입스터디 반환
    @GetMapping("mypage/study-list/{memberId}")
    public ResponseEntity<?> selectStudyList(@PathVariable Integer memberId){
        List<Study> studyList = memberService.selectStudyList(memberId);

        List<JoinStudyResDto> joinStudyList = new ArrayList<>();
        for(Study study : studyList){
            joinStudyList.add(new JoinStudyResDto(study, study.getStudyMemberList().size()));
        }
        return new ResponseEntity<>(joinStudyList, HttpStatus.OK);
    }

    //회원 신청스터디 반환
    @GetMapping("mypage/application-list/{memberId}")
    public ResponseEntity<?> selectApplicationStudyList(@PathVariable Integer memberId){
        List<Study> applicantStudyList = memberService.selectApplicantStudyList(memberId);

        List<ApplicantStudyResDto> applicantStudyResDtoList = new ArrayList<>();
        for(Study study : applicantStudyList){
            int applicantCount = study.getStudyApplicantList().size();
            applicantStudyResDtoList.add( new ApplicantStudyResDto(
                    study.getStudyId(), study.getStudyName(), study.getTotalMember(), applicantCount
            ));
        }

        return new ResponseEntity<>(applicantStudyResDtoList, HttpStatus.OK);
    }

    //회원 작성 게시글 반환
    @GetMapping("mypage/board-list/{memberId}")
    public ResponseEntity<?> selectBoardList(@PathVariable Integer memberId){
        List<Board> boardList = memberService.selectBoardList(memberId);

        List<MemberBoardListResDto> boardListResDtoList = new ArrayList<>();
        for(Board board : boardList){
            String create = board.getCreatedDate().toLocalDate().toString();

            boardListResDtoList.add(new MemberBoardListResDto(board.getBoardId(), board.getBoardTitle(),
                    board.getBoardHit(), board.getCommentList().size(), create));
        }
        return new ResponseEntity<>(boardListResDtoList, HttpStatus.OK);
    }

    //입퇴실 내역 반환
    @GetMapping("mypage/attendance-list/{memberId}")
    public ResponseEntity<?> selectAttendanceList(@PathVariable Integer memberId){
        List<Attendance> attendances = memberService.attendanceList(memberId);

        List<AttendanceResDto> attendanceList = new ArrayList<>();
        for(Attendance attendance : attendances){
            LocalTime inTime = attendance.getInTime().toLocalTime();
            LocalTime outTime = attendance.getOutTime().toLocalTime();

            LocalDate date = attendance.getInTime().toLocalDate();

            attendanceList.add(new AttendanceResDto(date, inTime, outTime,
                    attendance.getIsAttended(), attendance.getScore()+"점", attendance.getContent()));
        }
        return new ResponseEntity<>(attendanceList, HttpStatus.OK);
    }
 }
