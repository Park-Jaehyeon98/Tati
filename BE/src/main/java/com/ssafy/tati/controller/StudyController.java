package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.dto.res.*;
import com.ssafy.tati.dto.res.board.StudyNoticeDetailResDto;
import com.ssafy.tati.entity.*;
import com.ssafy.tati.mapper.*;
import com.ssafy.tati.mapper.board.GetBoardMapper;
import com.ssafy.tati.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Tag(name = "스터디", description = "스터디 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;
    private final MemberService memberService;
    private final S3Service s3Service;
    private final BoardService boardService;
    private final StudyMemberService studyMemberService;
    private final StudyMapper studyMapper;
    private final StudyScheduleMapper studyScheduleMapper;
    private final StudyMemberMapper studyMemberMapper;
    private final GetBoardMapper getBoardMapper;
    private final StudyApplicantMapper studyApplicantMapper;


    @Operation(summary = "스터디 생성", description = "스터디(이름, 설명, 허용인원, 비밀번호, 스터디 시작 기간, 스터디 종료 기간, 카테고리 식별번호, 공개여부, 스터디 방장, 신청 보증금), 스터디 할 요일과 시작 시간, 종료 시간을 객체 형태로 받아서 저장", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 생성 성공", content = @Content(schema = @Schema(implementation = Study.class)))})
    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createStudy(@RequestPart StudyReqDto studyReqDto, @RequestPart(value = "studyImg", required = false) MultipartFile multipartFile) throws IOException {


        String img = null;
        if(multipartFile != null) {
            img = s3Service.uploadFile(multipartFile);
        }

        List<StudyScheduleReqDto> studyScheduleReqDtoList = studyReqDto.getStudySchedule();

        List<StudySchedule> studyScheduleList = new ArrayList<>();
        for(StudyScheduleReqDto studyScheduleReqDto : studyScheduleReqDtoList){
            studyScheduleList.add(studyMapper.studyReqScheduleToStudySchedule(studyScheduleReqDto));
        }


        Category category = studyService.checkCategory(studyReqDto.getCategoryId());
        Study study = studyMapper.studyReqDtoToStudy(studyReqDto, studyScheduleList, category);

        study.setImg(img);

        List<StudySchedule> savedSchedule = new ArrayList<>();
        for (StudySchedule studySchedule : studyScheduleList) {
            studySchedule.setStudyScheduleId(0);
            StudySchedule schedule = studyService.createStudySchedule(studySchedule);

            savedSchedule.add(schedule);
        }

        Study savedStudy = studyService.createStudy(study);

        for (StudySchedule studySchedule : savedSchedule) {
            studySchedule.setStudy(savedStudy);
        }

        studyService.setStudyMemberHost(savedStudy.getStudyId(), savedStudy.getStudyHost());

        StudyCreateResDto studyCreateResDto = new StudyCreateResDto();
        studyCreateResDto.setStudyId(savedStudy.getStudyId());
        studyCreateResDto.setImg(savedStudy.getImg());
        return new ResponseEntity<>(studyCreateResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 상세 조회", description = "스터디 식별 번호로 스터디 상세 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 상세 조회 성공", content = @Content(schema = @Schema(implementation = StudyDetailResDto.class)))})
    @GetMapping(value = "/{studyId}/{memberId}")
    public ResponseEntity<?> detailStudy(@PathVariable Integer studyId, @PathVariable Integer memberId) {
        Optional<StudyMember> studyMember = studyMemberService.findStudyMember(studyId, memberId);

        boolean studyMemberYn;
        if (studyMember.isEmpty()) {
            studyMemberYn = false;
        } else {
            studyMemberYn = true;
        }

        List<Board> boardList = studyService.selectStudyBoard(studyId);
        List<StudySchedule> schedules = studyService.selectStudySchedule(studyId);
        List<StudyScheduleResDto> studySchedule = new ArrayList<>();
        for(StudySchedule schedule : schedules){
            studySchedule.add(new StudyScheduleResDto(schedule.getStudyDay(),
                    schedule.getStudyStartTime().toString(), schedule.getStudyEndTime().toString()));

        }

        List<StudyApplicant> applicants = studyService.selectStudyApplicant(studyId);
        List<Member> memberList = new ArrayList<>();
        for(StudyApplicant studyApplicant : applicants){
            memberList.add(studyApplicant.getMember());
        }

        List<StudyApplicantMemberResDto> applicantList
                = studyApplicantMapper.memberListToStudyApplicantMemberResDtoList(memberList);


        List<StudyMember> studyMemberList = studyService.selectStudyMember(studyId);
        Optional<Board> optionalStudyMainNotice = boardService.findMainNoticeByStudyId(studyId);

        Board studyMainNotice = null;
        StudyNoticeDetailResDto studyNoticeDetailResDto;
        if (optionalStudyMainNotice.isEmpty()){
            studyNoticeDetailResDto = null;
        }
        else {
            studyMainNotice = optionalStudyMainNotice.get();

            String create = studyMainNotice.getCreatedDate().toLocalDate().toString();
            String modify = studyMainNotice.getModifiedDate().toLocalDate().toString();


            studyNoticeDetailResDto = new StudyNoticeDetailResDto(studyMainNotice.getBoardId(), studyMainNotice.getBoardTitle(), studyMainNotice.getBoardContent(),
                    studyMainNotice.getMember().getMemberId(), studyMainNotice.getMember().getMemberNickName(), studyMainNotice.getBoardHit(),
                    create, modify, studyMainNotice.isMainNoticeYn());
        }


        List<StudyMemberResDto> studyMemberResDtoList = new ArrayList<>();
        for(StudyMember findStudyMember : studyMemberList){
            Integer studyMemberId = findStudyMember.getMember().getMemberId();
            Member member = memberService.findById(studyMemberId);
            studyMemberResDtoList.add(new StudyMemberResDto(member.getMemberNickName(),
                    member.getTotalScore(), member.getCreatedDate().toString(), member.getTotalStudyTime()));
        }



//        스터디 공지
//        studyNotice - Notice객체
//        noticeId - int
//        noticeTitle - String
//


//        List<studySchedule> studySchedules
//        day - String
//        startTime - time
//        endTime - time
//
//        스터디 게시판
//        List<studyBoard> - Board 객체
//        boardId - int
//        boardTitle - String
//        boardCreatedTime - date

//
//        totalMemberCount - int
//        List<joinMember>
//        memberId - int
//        memberNickName - String
//        passionScore - int
//
//        List<applyMember>
//        memberId - int
//        memberNickName - String
//        passionScore - int


        Study study = studyService.getStudyDetail(studyId);

        System.out.println("여기까지!----------------------------");
        StudyDetailResDto studyDetailResDto = studyMapper.studyToStudyDetailResDto(study, study.getCategory(),
                studyMemberYn, studySchedule, applicantList, studyMemberResDtoList, studyNoticeDetailResDto);
        System.out.println("여기까지22222222222222222!----------------------------");
        System.out.println(
                studyDetailResDto
        );
        return new ResponseEntity<>(studyDetailResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 수정", description = "스터디 식별번호와 StudyModifyReqDto의 내용을 받아서 스터디 수정", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 수정 성공", content = @Content(schema = @Schema(implementation = StudyIdResDto.class)))})
    @PutMapping(value = "/{studyId}/modify",  consumes = {"multipart/form-data"})
    public ResponseEntity<?> modifyStudy(@PathVariable Integer studyId,
                                         @RequestPart StudyModifyReqDto studyModifyReqDto, @RequestPart(value = "studyImg", required = false) MultipartFile multipartFile) throws IOException {

        if(multipartFile != null) {
            Study study = studyService.findById(studyId);

            String studyImg = study.getImg();
            if(studyImg!=null) s3Service.deleteFile(studyImg);

            String newImg = s3Service.uploadFile(multipartFile);
            study.setImg(newImg);
        }

        StudyIdResDto studyIdResDto = studyService.modifyStudy(studyId, studyModifyReqDto);
        return new ResponseEntity<>(studyIdResDto, HttpStatus.OK);
    }


    @Operation(summary = "스터디 전체 조회", description = "스터디 페이지 접속 시 모든 스터디 내림차순으로 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 전체 조회 성공", content = @Content(schema = @Schema(implementation = StudyAllListResDto.class)))})
    @GetMapping("/list")
    public ResponseEntity<?> selectAllStudy() {
        List<Study> studylist = studyService.getStudyList();
        List<StudyAllListResDto> studyAllListResDtoList = new ArrayList<>();
        for(Study study: studylist){
            studyAllListResDtoList.add(new StudyAllListResDto( study.getStudyId(), study.getStudyName(), study.getTotalMember(),
                    study.getStudyMemberList().size(), study.getDisclosure(), study.getImg()));
        }

        return new ResponseEntity<>(studyAllListResDtoList, HttpStatus.OK);

    }

    @Operation(summary = "카테고리, 키워드로 스터디 조회", description = "스터디 페이지에서 카테고리와 키워드로 스터디 리스트를 내림차순으로 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 카테고리, 키워드 조회 성공", content = @Content(schema = @Schema(implementation = StudyAllListResDto.class)))})
    @GetMapping("/search")
    public ResponseEntity<?> searchStudy(@RequestParam(value = "page", defaultValue = "1") Integer pageNum,
                                         @RequestParam(value = "category", defaultValue = "1") Integer categoryId,
                                         @RequestParam(value = "keyword", defaultValue = "") String keyword) {

        List<Study> studyList = studyService.getSearchStudy(pageNum, categoryId, keyword);
        List<StudyAllListResDto> studyAllListResDtoList = studyMapper.studyListToStudyAllListResDtoList(studyList);
        return new ResponseEntity<>(studyAllListResDtoList, HttpStatus.OK);
    }

}
