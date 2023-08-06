//package com.ssafy.tati.controller.board;
//
//import com.ssafy.tati.dto.req.board.PostCommentReqDto;
//import com.ssafy.tati.dto.req.board.PutCommentReqDto;
//import com.ssafy.tati.dto.res.board.CommentResDto;
//import com.ssafy.tati.entity.Comment;
//import com.ssafy.tati.mapper.board.CommentMapper;
//import com.ssafy.tati.mapper.board.PutCommentMapper;
////import com.ssafy.tati.service.CommentService;
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
//@Tag(name = "스터디 게시판 댓글", description = "스터디 게시판 댓글 API 문서")
//@RestController
//@RequestMapping("/study/board")
//@RequiredArgsConstructor
//public class CommentController {
//    //private final CommentService commentService;
//    private final CommentMapper commentMapper;
//    private final PutCommentMapper putCommentMapper;
//
//    @Operation(summary = "스터디 게시판 댓글 작성 요청", description = "댓글을 작성 후 글 작성 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "댓글 등록 성공"),
//    })
//    @PostMapping("/comment")
//    public ResponseEntity<?> commentAdd(@RequestBody PostCommentReqDto postCommentReqDto) {
//        Integer memberId = postCommentReqDto.getMemberId();
//        Integer boardId = postCommentReqDto.getBoardId();
//        Comment comment = commentMapper.commentReqDtoToComment(postCommentReqDto);
//
//        commentService.addComment(memberId, boardId, comment);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @Operation(summary = "댓글 리스트 조회 요청", description = "댓글 리스트 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "댓글 리스트"),
//    })
//    @GetMapping("/{boardId}/comment")
//    public ResponseEntity<?> commentList(@PageableDefault(size = 10, sort = "createdDate",
//            direction = Sort.Direction.ASC) Pageable pageable, @PathVariable Integer boardId) {
//        Page<Comment> commentPage = commentService.findCommentByBoardId(boardId, pageable);
//        Page<CommentResDto> commentResDtoPage = commentPage.map(c -> new CommentResDto(c));
//
//        return new ResponseEntity(commentResDtoPage, HttpStatus.OK);
//    }
//
//    @Operation(summary = "댓글 수정 요청", description = "댓글 수정 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "댓글 수정 성공"),
//    })
//    @PutMapping("/comment")
//    public ResponseEntity<?> commentModify(@RequestBody PutCommentReqDto putCommentReqDto) {
//        Comment comment = putCommentMapper.putCommentReqDtoToComment(putCommentReqDto);
//        Integer memberId = putCommentReqDto.getMemberId();
//        commentService.modifyComment(memberId, comment);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//    @Operation(summary = "댓글 삭제 요청", description = "댓글 삭제 요청", responses = {
//            @ApiResponse(responseCode = "200", description = "댓글 삭제 성공"),
//    })
//    @DeleteMapping("/comment/{commentId}/{memberId}")
//    public ResponseEntity<?> commentRemove(@PathVariable Integer commentId, @PathVariable Integer memberId) {
//        commentService.removeComment(commentId, memberId);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//}
