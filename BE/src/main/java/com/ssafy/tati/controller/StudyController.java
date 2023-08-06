package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.dto.res.*;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import com.ssafy.tati.mapper.StudyMapper;
import com.ssafy.tati.service.StudyService;
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

@Tag(name = "스터디", description = "스터디 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;
    private final StudyMapper studyMapper;

    @Operation(summary = "스터디 생성", description = "스터디(이름, 설명, 허용인원, 비밀번호, 스터디 시작 기간, 스터디 종료 기간, 카테고리 식별번호, 공개여부, 스터디 방장, 신청 보증금), 스터디 할 요일과 시작 시간, 종료 시간을 객체 형태로 받아서 저장", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 생성 성공", content = @Content(schema = @Schema(implementation = Study.class)))})
    @PostMapping("/create")
    public ResponseEntity<?> createStudy(@RequestBody StudyReqDto studyReqDto) {
        Study study = studyMapper.studyReqDtoToStudy(studyReqDto);
        studyService.createStudy(study, studyReqDto.getCategoryId());
        List<StudyScheduleReqDto> studyScheduleReqDtoList = studyReqDto.getStudySchedule();
        List<StudySchedule> studyScheduleList = studyMapper.studyReqScheduleListToStudySchedule(studyScheduleReqDtoList);
        for (StudySchedule studySchedule : studyScheduleList) {
            studySchedule.setStudy(study);
            studyService.createStudySchedule(studySchedule);
        }
        StudyCreateResDto studyCreateResDto = new StudyCreateResDto();
        studyCreateResDto.setStudyId(study.getStudyId());
        return new ResponseEntity<>(studyCreateResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 상세 조회", description = "스터디 식별 번호로 스터디 상세 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 상세 조회 성공", content = @Content(schema = @Schema(implementation = StudyDetailResDto.class)))})
    @GetMapping("/{studyId}")
    public ResponseEntity<?> detailStudy(@PathVariable Integer studyId) {
        Study study = studyService.getStudyDetail(studyId);
        StudyDetailResDto studyDetailResDto = studyMapper.studyToStudyDetailResDto(study, study.getCategory());
        return new ResponseEntity<>(studyDetailResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 수정", description = "스터디 식별번호와 StudyModifyReqDto의 내용을 받아서 스터디 수정", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 수정 성공", content = @Content(schema = @Schema(implementation = StudyIdResDto.class)))})
    @PutMapping("/{studyId}/modify")
    public ResponseEntity<?> modifyStudy(@PathVariable Integer studyId, @RequestBody StudyModifyReqDto studyModifyReqDto) {
        StudyIdResDto studyIdResDto = studyService.modifyStudy(studyId, studyModifyReqDto);
        return new ResponseEntity<>(studyIdResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 삭제", description = "스터디 방장과 이름이 같을 경우 스터디 삭제", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 삭제 성공", content = @Content(schema = @Schema(implementation = StudyDetailResDto.class)))})
    @DeleteMapping("/{studyId}/delete/{memberId}")
    public ResponseEntity<?> deleteStudy(@PathVariable Integer studyId, @PathVariable Integer memberId) {
        StudyDeleteResDto studyDeleteResDto = studyService.removeStudy(studyId, memberId);
        return new ResponseEntity<>(studyDeleteResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 전체 조회", description = "스터디 페이지 접속 시 모든 스터디 내림차순으로 조회", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 전체 조회 성공", content = @Content(schema = @Schema(implementation = StudyAllListResDto.class)))})

    @GetMapping
    public ResponseEntity<?> selectAllStudy() {
        List<Study> studylist = studyService.getStudyList();
        List<StudyAllListResDto> studyAllListResDtoList = studyMapper.studyListToStudyAllListResDtoList(studylist);
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
