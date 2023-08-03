package com.ssafy.tati.controller.board;

import com.ssafy.tati.dto.req.board.PostStudyBoardReqDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.mapper.board.PostBoardMapper;
import com.ssafy.tati.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "스터디 공지사항", description = "스터디 공지사항 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyNoticeController {
    private final BoardService boardService;
    private final PostBoardMapper postBoardMapper;

    @Operation(summary = "스터디 공지글 작성 요청", description = "스터디 공지글을 작성 후 글 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping("/notice")
    public ResponseEntity<?> createStudyNotice(@RequestBody PostStudyBoardReqDto postStudyBoardReqDto) {
        Integer memberId = postStudyBoardReqDto.getMemberId();
        Integer studyId = postStudyBoardReqDto.getStudyId();
        Board board = postBoardMapper.postStudyBoardReqDtoToBoard('1', postStudyBoardReqDto);
        boardService.createStudyNotice(memberId, studyId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
