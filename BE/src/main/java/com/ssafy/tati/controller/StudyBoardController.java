package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.BoardReqDto;
import com.ssafy.tati.dto.req.PutBoardReqDto;
import com.ssafy.tati.dto.res.NoticeResDto;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Operation(summary = "공지글 / 게시글 수정 요청", description = "스터디 공지글 / 게시글 수정 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 수정 성공"),
    })
    @PutMapping(value = {"/notice/modify", "/board/modify"})
    public ResponseEntity<?> modifyBoard(@RequestBody PutBoardReqDto putBoardReqDto) {
        Board board = putBoardMapper.putBoardReqDtoToBoard(putBoardReqDto);
        Integer memberId = putBoardReqDto.getMemberId();
        boardService.updateBoard(memberId, board);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "공지글 / 게시글 삭제 요청", description = "스터디 공지글 / 게시글 삭제 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 삭제 성공"),
    })
    @DeleteMapping(value = {"/notice/{boardId}/delete/{memberId}", "/board/{boardId}/delete/{memberId}"})
    public ResponseEntity<?> removeBoardById(@PathVariable Integer boardId, @PathVariable Integer memberId) {
        boardService.deleteBoard(boardId, memberId);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "스터디 공지글 상세 조회 요청", description = "스터디 공지글 상세 조회 요청", responses = {
            @ApiResponse(responseCode = "200", description = "하나의 스터디 공지글 상세"),
    })
    @GetMapping(value = {"/notice/{boardId}","/board/{boardId}" })
    public ResponseEntity<?> getBoardById(@PathVariable Integer boardId) {
        Board board = boardService.selectBoardById(boardId);
        NoticeResDto noticeResDto = boardMapper.boardToNoticeResDto(board);

        return new ResponseEntity(noticeResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 공지글 리스트 조회 요청", description = "스터디 공지글 리스트 요청", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 공지글 리스트"),
    })
    @GetMapping("/{studyId}/notice")
    public ResponseEntity<?> listAllStudyNotice(@PathVariable Integer studyId) {
        List<Board> boardList = boardService.selectAllByBoardTypeAndStudyId('1', studyId);
        List<NoticeResDto> noticeResDtoList =  boardMapper.boardListToNoticeResDtoList(boardList);

        return new ResponseEntity(noticeResDtoList, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 리스트 조회 요청", description = "스터디 게시글 리스트 요청", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 게시글 리스트"),
    })
    @GetMapping("/{studyId}/board")
    public ResponseEntity<?> listAllStudyBoard(@PathVariable Integer studyId) {
        List<Board> boardList = boardService.selectAllByBoardTypeAndStudyId('2', studyId);
        List<NoticeResDto> noticeResDtoList =  boardMapper.boardListToNoticeResDtoList(boardList);

        // 댓글 개수 보내줘야 함
        return new ResponseEntity(noticeResDtoList, HttpStatus.OK);
    }
}
