package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.StudyModifyReqDto;
import com.ssafy.tati.dto.req.StudyReqDto;
import com.ssafy.tati.dto.req.StudyScheduleReqDto;
import com.ssafy.tati.dto.res.StudyDetailResDto;
import com.ssafy.tati.dto.res.StudyListResDto;
import com.ssafy.tati.dto.res.StudyModifyResDto;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudySchedule;
import com.ssafy.tati.mapper.StudyMapper;
import com.ssafy.tati.service.StudyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.servlet.headers.HttpPublicKeyPinningDsl;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "스터디", description = "스터디 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;
    private final StudyMapper studyMapper;

//    @GetMapping("/")                 /* default size = 10 */
//    public String boardList(Model model, @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
//        Page<Study> studyList = studyService.studyPageList(pageable);
//        int nowPage = studyList.getPageable().getPageNumber() + 1;
//        int startPage = Math.max(nowPage - 4, 1);
//        int endPage = Math.min(nowPage + 5, studyList.getTotalPages());
//
//        model.addAttribute("studyList", studyList);
//        model.addAttribute("nowpage", nowPage);
//        model.addAttribute("startPage", startPage);
//        model.addAttribute("endPage", endPage);
//
//        return ;
//    }

    @PostMapping("/create")
    public ResponseEntity<?> createStudy(@RequestBody StudyReqDto studyReqDto) {
        Study study = studyMapper.studyReqDtoToStudy(studyReqDto);
        studyService.createStudy(study, studyReqDto.getCategoryId());
        List<StudyScheduleReqDto> studyScheduleReqDtoList = studyReqDto.getStudySchedule();
        List<StudySchedule> studyScheduleList = studyMapper.studyReqScheduleListToStudySchedule(studyScheduleReqDtoList);
        for (StudySchedule studySchedule: studyScheduleList) {
            studySchedule.setStudy(study);
            studyService.createStudySchedule(studySchedule);
        }
        return new ResponseEntity<>(study, HttpStatus.OK);
    }

    @GetMapping("/{studyId}")
    public ResponseEntity<?> detailStudy(@PathVariable Integer studyId){
        Study study = studyService.getStudyDetail(studyId);
        StudyDetailResDto studyDetailResDto = studyMapper.studyToStudyDetailResDto(study, study.getCategory());
        return new ResponseEntity<>(studyDetailResDto, HttpStatus.OK);
    }

    @PutMapping("/{studyId}/modify")
    public ResponseEntity<?> modifyStudy(@PathVariable Integer studyId, @RequestBody StudyModifyReqDto studyModifyReqDto){
        StudyModifyResDto studyModifyResDto = studyService.modifyStudy(studyId, studyModifyReqDto);
        return new ResponseEntity<>(studyModifyResDto, HttpStatus.OK);
    }

    @DeleteMapping("/{studyId}/delete/{memberId}")
    public ResponseEntity<?> deleteStudy(@PathVariable Integer studyId, @PathVariable Integer memberId){
        studyService.removeStudy(studyId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



//    @GetMapping()

}
