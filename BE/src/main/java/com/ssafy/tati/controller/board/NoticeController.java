//package com.ssafy.tati.controller.board;
//
//import com.ssafy.tati.dto.req.board.PostBoardReqDto;
//import com.ssafy.tati.dto.req.board.PutBoardReqDto;
//import com.ssafy.tati.dto.res.board.BoardDetailResDto;
//import com.ssafy.tati.dto.res.board.BoardListResDto;
//import com.ssafy.tati.entity.Board;
//import com.ssafy.tati.mapper.board.GetBoardMapper;
//import com.ssafy.tati.mapper.board.PostBoardMapper;
//import com.ssafy.tati.mapper.board.PutBoardMapper;
//import com.ssafy.tati.service.BoardService;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//
//@Tag(name = "공지 게시판", description = "사이트 공지 게시판 API 문서")
//@RestController
//@RequestMapping("/notice")
//@RequiredArgsConstructor
//public class NoticeController {
//    private final BoardService boardService;
//    private final PostBoardMapper postBoardMapper;
//    private final GetBoardMapper getBoardMapper;
//    private final PutBoardMapper putBoardMapper;
//
//    @Operation(summary = "공지글 작성 요청", description = "사이트 공지글을 작성 후 글 작성 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
//    })
//    @PostMapping
//    public ResponseEntity<?> noticeAdd(@RequestBody PostBoardReqDto postBoardReqDto) {
//        Integer memberId = postBoardReqDto.getMemberId();
//        Board board = postBoardMapper.postBoardReqDtoToBoard('0', postBoardReqDto);
//        boardService.addBoard(memberId, board);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @Operation(summary = "공지글 리스트 조회 요청 (페이징)", description = "사이트 공지글 리스트 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "공지글 리스트"),
//    })
//    @GetMapping
//    public ResponseEntity<?> noticeListPage(@PageableDefault(size = 10, sort = "createdDate",
//            direction = Sort.Direction.DESC) Pageable pageable) {
//        Page<Board> boardPage = boardService.findBoardPageByBoardType('0', pageable);
//        Page<BoardListResDto> boardListResDtoPage = boardPage.map(BoardListResDto::new);
//
//        return new ResponseEntity(boardListResDtoPage, HttpStatus.OK);
//    }
//
//    @Operation(summary = "공지글 상세 조회 요청", description = "사이트 공지글 상세 조회 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "하나의 공지글 상세"),
//    })
//    @GetMapping("/{boardId}")
//    public ResponseEntity<?> noticeDetails(@PathVariable Integer boardId) {
//        Board board = boardService.findBoardByBoardIdAndBoardType(boardId, '0');
//        BoardDetailResDto boardDetailResDto = getBoardMapper.boardToBoardDetailResDto(board);
//
//        return new ResponseEntity(boardDetailResDto, HttpStatus.OK);
//    }
//
//    @Operation(summary = "공지글 수정 요청", description = "사이트 공지글 수정 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "공지글 수정 성공"),
//    })
//    @PutMapping
//    public ResponseEntity<?> noticeModify(@RequestBody PutBoardReqDto putBoardReqDto) {
//        Board board = putBoardMapper.putBoardReqDtoToBoard(putBoardReqDto);
//        Integer memberId = putBoardReqDto.getMemberId();
//        boardService.modifyBoard(memberId, board);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @Operation(summary = "공지글 삭제 요청", description = "사이트 공지글 삭제 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "공지글 삭제 성공"),
//    })
//    @DeleteMapping("/{boardId}/{memberId}")
//    public ResponseEntity<?> noticeRemove(@PathVariable Integer boardId, @PathVariable Integer memberId) {
//        boardService.removeBoard(boardId, memberId);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//}
