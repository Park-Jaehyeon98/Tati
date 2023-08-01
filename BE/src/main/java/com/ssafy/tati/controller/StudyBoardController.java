package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.BoardReqDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.mapper.BoardMapper;
import com.ssafy.tati.mapper.PutBoardMapper;
import com.ssafy.tati.service.BoardService;
import com.ssafy.tati.service.MemberService;
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

@Tag(name = "스터디 게시판", description = "스터디 게시판 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyBoardController {
    private final BoardService boardService;
    private final MemberService memberService;
    private final BoardMapper boardMapper;
    private final PutBoardMapper putBoardMapper;

    @Operation(summary = "스터디 공지글 작성 요청", description = "스터디 공지글을 작성 후 글 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping("/notice/create")
    public ResponseEntity<?> createStudyNotice(@RequestBody BoardReqDto boardReqDto) {
        Board board = boardMapper.boardReqDtoToBoard('1', boardReqDto);
        Integer memberId = boardReqDto.getMemberId();
        Integer studyId = boardReqDto.getStudyId();

        boardService.saveStudyNotice(memberId, studyId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 작성 요청", description = "스터디 게시글을 작성 후 글 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping("/board/create")
    public ResponseEntity<?> createStudyBoard(@RequestBody BoardReqDto boardReqDto) {
        Board board = boardMapper.boardReqDtoToBoard('2', boardReqDto);
        Integer memberId = boardReqDto.getMemberId();
        Integer studyId = boardReqDto.getStudyId();
        boardService.saveStudyBoard(memberId, studyId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
