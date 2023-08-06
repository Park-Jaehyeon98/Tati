//package com.ssafy.tati.controller.board;
//
//import com.ssafy.tati.dto.req.board.NoticeMainReqDto;
//import com.ssafy.tati.dto.req.board.PostStudyBoardReqDto;
//import com.ssafy.tati.dto.req.board.PutBoardReqDto;
//import com.ssafy.tati.dto.res.board.StudyNoticeDetailResDto;
//import com.ssafy.tati.dto.res.board.StudyNoticeListResDto;
//import com.ssafy.tati.entity.Board;
//import com.ssafy.tati.mapper.board.GetBoardMapper;
//import com.ssafy.tati.mapper.board.NoticeMainMapper;
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
//@Tag(name = "스터디 공지사항", description = "스터디 공지사항 API 문서")
//@RestController
//@RequestMapping("/study")
//@RequiredArgsConstructor
//public class StudyNoticeController {
//    private final BoardService boardService;
//    private final PostBoardMapper postBoardMapper;
//    private final GetBoardMapper getBoardMapper;
//    private final PutBoardMapper putBoardMapper;
//    private final NoticeMainMapper noticeMainMapper;
//
//    @Operation(summary = "스터디 공지글 작성 요청", description = "스터디 공지글을 작성 후 글 작성 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
//    })
//    @PostMapping("/notice")
//    public ResponseEntity<?> studyNoticeAdd(@RequestBody PostStudyBoardReqDto postStudyBoardReqDto) {
//        Integer memberId = postStudyBoardReqDto.getMemberId();
//        Integer studyId = postStudyBoardReqDto.getStudyId();
//        Board board = postBoardMapper.postStudyBoardReqDtoToBoard('1', postStudyBoardReqDto);
//        boardService.addStudyNotice(memberId, studyId, board);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @Operation(summary = "스터디 공지글 리스트 조회 요청 (페이징)", description = "스터디 공지글 리스트 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "스터디 공지글 리스트"),
//    })
//    @GetMapping("/{studyId}/notice")
//    public ResponseEntity<?> studyNoticeListPage(@PageableDefault(size = 10, sort = "createdDate",
//            direction = Sort.Direction.DESC) Pageable pageable, @PathVariable Integer studyId) {
//        Page<Board> boardPage = boardService.findBoardPageByBoardTypeAndStudyId('1', studyId, pageable);
//        Page<StudyNoticeListResDto> studyNoticeListResDtos = boardPage.map(StudyNoticeListResDto::new);
//
//        return new ResponseEntity(studyNoticeListResDtos, HttpStatus.OK);
//    }
//
//    @Operation(summary = "스터디 공지글 상세 조회 요청", description = "스터디 공지글 상세 조회 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "하나의 스터디 공지글 상세"),
//    })
//    @GetMapping("/notice/{boardId}")
//    public ResponseEntity<?> studyNoticeDetails(@PathVariable Integer boardId) {
//        Board board = boardService.findBoardByBoardIdAndBoardType(boardId, '1');
//        StudyNoticeDetailResDto studyNoticeDetailResDto = getBoardMapper.boardToStudyNoticeDetailResDto(board);
//
//        return new ResponseEntity(studyNoticeDetailResDto, HttpStatus.OK);
//    }
//
//
//    @Operation(summary = "스터디 공지글 수정 요청", description = "스터디 공지글 수정 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "글 수정 성공"),
//    })
//    @PutMapping("/notice")
//    public ResponseEntity<?> studyNoticeModify(@RequestBody PutBoardReqDto putBoardReqDto) {
//        Board board = putBoardMapper.putBoardReqDtoToBoard(putBoardReqDto);
//        Integer memberId = putBoardReqDto.getMemberId();
//        boardService.modifyBoard(memberId, board);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @Operation(summary = "공지글 / 게시글 삭제 요청", description = "스터디 공지글 / 게시글 삭제 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "글 삭제 성공"),
//    })
//    @DeleteMapping("/notice/{boardId}/{memberId}")
//    public ResponseEntity<?> studyNoticeRemove(@PathVariable Integer boardId, @PathVariable Integer memberId) {
//        boardService.removeBoard(boardId, memberId);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @Operation(summary = "스터디 공지사항 대표글로 등록 요청", description = "스터디 공지사항을 대표글로 등록 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "대표글 등록 성공"),
//    })
//    @PostMapping("/notice/main")
//    public ResponseEntity<?> studyMainNoticeSave(@RequestBody NoticeMainReqDto boardMainReqDto) {
//        Board board = noticeMainMapper.noticeMainReqDtoToBoard(boardMainReqDto);
//        boardService.saveStudyMainNotice(boardMainReqDto.getMemberId(), board);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @Operation(summary = "스터디 공지사항 대표글 내리기 요청", description = "스터디 공지사항을 대표글 내리기 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "대표글 삭제 성공"),
//    })
//    @DeleteMapping("/notice/main")
//    public ResponseEntity<?> studyMainNoticeRemove(@RequestBody NoticeMainReqDto boardMainReqDto) {
//        Board board = noticeMainMapper.noticeMainReqDtoToBoard(boardMainReqDto);
//        boardService.removeStudyMainNotice(boardMainReqDto.getMemberId(), board);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//}
