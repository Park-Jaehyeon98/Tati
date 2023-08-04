package com.ssafy.tati.controller.board;

import com.ssafy.tati.dto.req.board.PostStudyBoardReqDto;
import com.ssafy.tati.dto.req.board.PutBoardReqDto;
import com.ssafy.tati.dto.res.board.BoardDetailResDto;
import com.ssafy.tati.dto.res.board.BoardListResDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.mapper.board.GetBoardMapper;
import com.ssafy.tati.mapper.board.PostBoardMapper;
import com.ssafy.tati.mapper.board.PutBoardMapper;
import com.ssafy.tati.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "스터디 공지사항", description = "스터디 공지사항 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyNoticeController {
    private final BoardService boardService;
    private final PostBoardMapper postBoardMapper;
    private final GetBoardMapper getBoardMapper;
    private final PutBoardMapper putBoardMapper;

    @Operation(summary = "스터디 공지글 작성 요청", description = "스터디 공지글을 작성 후 글 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping("/notice")
    public ResponseEntity<?> studyNoticeAdd(@RequestBody PostStudyBoardReqDto postStudyBoardReqDto) {
        Integer memberId = postStudyBoardReqDto.getMemberId();
        Integer studyId = postStudyBoardReqDto.getStudyId();
        Board board = postBoardMapper.postStudyBoardReqDtoToBoard('1', postStudyBoardReqDto);
        boardService.addStudyNotice(memberId, studyId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "스터디 공지글 리스트 조회 요청 (페이징)", description = "스터디 공지글 리스트 요청", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 공지글 리스트"),
    })
    @GetMapping("/{studyId}/notice")
    public ResponseEntity<?> studyNoticeListPage(@PageableDefault(size = 10, sort = "createdDate",
            direction = Sort.Direction.DESC) Pageable pageable, @PathVariable Integer studyId) {
        Page<Board> boardPage = boardService.findBoardPageByBoardTypeAndStudyId('1', studyId, pageable);
        Page<BoardListResDto> boardListResDtoPage = boardPage.map(BoardListResDto::new);

        return new ResponseEntity(boardListResDtoPage, HttpStatus.OK);
    }

    @Operation(summary = "스터디 공지글 상세 조회 요청", description = "스터디 공지글 상세 조회 요청", responses = {
            @ApiResponse(responseCode = "200", description = "하나의 스터디 공지글 상세"),
    })
    @GetMapping("/notice/{boardId}")
    public ResponseEntity<?> studyNoticeDetails(@PathVariable Integer boardId) {
        Board board = boardService.findBoardByBoardIdAndBoardType(boardId, '1');
        BoardDetailResDto boardDetailResDto = getBoardMapper.boardToBoardDetailResDto(board);

        return new ResponseEntity(boardDetailResDto, HttpStatus.OK);
    }


    @Operation(summary = "스터디 공지글 수정 요청", description = "스터디 공지글 수정 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 수정 성공"),
    })
    @PutMapping("/notice")
    public ResponseEntity<?> studyNoticeModify(@RequestBody PutBoardReqDto putBoardReqDto) {
        Board board = putBoardMapper.putBoardReqDtoToBoard(putBoardReqDto);
        Integer memberId = putBoardReqDto.getMemberId();
        boardService.modifyBoard(memberId, board);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "공지글 / 게시글 삭제 요청", description = "스터디 공지글 / 게시글 삭제 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 삭제 성공"),
    })
    @DeleteMapping("/notice/{boardId}/{memberId}")
    public ResponseEntity<?> studyNoticeRemove(@PathVariable Integer boardId, @PathVariable Integer memberId) {
        boardService.removeBoard(boardId, memberId);

        return new ResponseEntity(HttpStatus.OK);
    }

}
