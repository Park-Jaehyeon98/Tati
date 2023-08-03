package com.ssafy.tati.controller.board;

import com.ssafy.tati.dto.req.board.PostBoardReqDto;
import com.ssafy.tati.dto.req.board.PutBoardReqDto;
import com.ssafy.tati.dto.res.board.NoticeResDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.mapper.board.BoardMapper;
import com.ssafy.tati.mapper.board.PostBoardMapper;
import com.ssafy.tati.mapper.board.PutBoardMapper;
import com.ssafy.tati.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "공지 게시판", description = "사이트 공지 게시판 API 문서")
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final BoardService boardService;
    private final BoardMapper boardMapper;
    private final PostBoardMapper postBoardMapper;
    private final PutBoardMapper putBoardMapper;

    @Operation(summary = "공지글 작성 요청", description = "사이트 공지글을 작성 후 글 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping
    public ResponseEntity<?> createNotice(@RequestBody PostBoardReqDto postBoardReqDto) {
        Integer memberId = postBoardReqDto.getMemberId();
        Board board = postBoardMapper.postBoardReqDtoToBoard('0', postBoardReqDto);
        boardService.createBoard(memberId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "공지글 리스트 조회 요청", description = "사이트 공지글 리스트 요청", responses = {
            @ApiResponse(responseCode = "200", description = "공지글 리스트"),
    })
    @GetMapping
    public ResponseEntity<?> listAllNotice() {
        List<Board> boardList = boardService.selectAllByBoardType('0');
        List<NoticeResDto> noticeResDtoList = boardMapper.boardListToNoticeResDtoList(boardList);

        return new ResponseEntity(noticeResDtoList, HttpStatus.OK);
    }

    @Operation(summary = "공지글 상세 조회 요청", description = "사이트 공지글 상세 조회 요청", responses = {
            @ApiResponse(responseCode = "200", description = "하나의 공지글 상세"),
    })
    @GetMapping("/{boardId}")
    public ResponseEntity<?> getNoticeById(@PathVariable Integer boardId) {
        Board board = boardService.selectBoardById(boardId);
        NoticeResDto noticeResDto = boardMapper.boardToNoticeResDto(board);

        return new ResponseEntity(noticeResDto, HttpStatus.OK);
    }

    @Operation(summary = "공지글 삭제 요청", description = "사이트 공지글 삭제 요청", responses = {
            @ApiResponse(responseCode = "200", description = "공지글 삭제 성공"),
    })
    @DeleteMapping("/{boardId}/delete/{memberId}")
    public ResponseEntity<?> removeNoticeById(@PathVariable Integer boardId, @PathVariable Integer memberId) {
        boardService.deleteBoard(boardId, memberId);

        return new ResponseEntity(HttpStatus.OK);
    }


    @Operation(summary = "공지글 수정 요청", description = "사이트 공지글 수정 요청", responses = {
            @ApiResponse(responseCode = "200", description = "공지글 수정 성공"),
    })
    @PutMapping("/modify")
    public ResponseEntity<?> modifyNotice(@RequestBody PutBoardReqDto putBoardReqDto) {
        Board board = putBoardMapper.putBoardReqDtoToBoard(putBoardReqDto);
        Integer memberId = putBoardReqDto.getMemberId();
        boardService.updateBoard(memberId, board);

        return new ResponseEntity(HttpStatus.OK);
    }
}
