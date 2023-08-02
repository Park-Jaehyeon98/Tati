package com.ssafy.tati.controller;

import com.ssafy.tati.dto.req.PostBoardReqDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.mapper.BoardMapper;
import com.ssafy.tati.mapper.PostBoardMapper;
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

@Tag(name = "FAQ", description = "사이트 FAQ API 문서")
@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FAQController {
    private final BoardService boardService;
    private final PostBoardMapper postBoardMapper;

    @Operation(summary = "faq 작성 요청", description = "사이트 faq 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping
    public ResponseEntity<?> createFAQ(@RequestBody PostBoardReqDto postBoardReqDto) {
        Integer memberId = postBoardReqDto.getMemberId();
        Board board = postBoardMapper.postBoardReqDtoToBoard('9', postBoardReqDto);
        boardService.createBoard(memberId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
