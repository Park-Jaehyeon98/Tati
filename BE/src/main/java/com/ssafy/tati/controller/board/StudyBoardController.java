package com.ssafy.tati.controller.board;

import com.ssafy.tati.dto.req.board.PostStudyBoardReqDto;
import com.ssafy.tati.dto.req.board.PutBoardReqDto;
import com.ssafy.tati.dto.res.board.StudyBoardDetailResDto;
import com.ssafy.tati.dto.res.board.StudyBoardListResDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.mapper.board.GetBoardMapper;
import com.ssafy.tati.mapper.board.PostBoardMapper;
import com.ssafy.tati.mapper.board.PutBoardMapper;
import com.ssafy.tati.service.BoardService;
import com.ssafy.tati.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Tag(name = "스터디 게시판", description = "스터디 게시판 API 문서")
@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
public class StudyBoardController {
    private final BoardService boardService;
    private final PostBoardMapper postBoardMapper;
    private final GetBoardMapper getBoardMapper;
    private final PutBoardMapper putBoardMapper;
    private final S3Service s3Service;

    @Operation(summary = "스터디 게시글 작성 요청", description = "스터디 게시글을 작성 후 글 작성 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 등록 성공"),
    })
    @PostMapping(value = "/board", consumes = {"multipart/form-data"})
    public ResponseEntity<?> studyBoardAdd(@RequestPart PostStudyBoardReqDto postStudyBoardReqDto, @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        Integer memberId = postStudyBoardReqDto.getMemberId();
        Integer studyId = postStudyBoardReqDto.getStudyId();
        Board board = postBoardMapper.postStudyBoardReqDtoToBoard('2', postStudyBoardReqDto);

        if (multipartFile != null) {

            String url = s3Service.uploadFile(multipartFile);
            board.setBoardFile(url);
        }
        boardService.addStudyBoard(memberId, studyId, board);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 리스트 조회 요청 (페이징)", description = "스터디 게시글 리스트 요청", responses = {
            @ApiResponse(responseCode = "200", description = "스터디 게시글 리스트"),
    })
    @GetMapping("/{studyId}/board")
    public ResponseEntity<?> studyBoardListPage(@PageableDefault(size = 10, sort = "createdDate",
            direction = Sort.Direction.DESC) Pageable pageable, @PathVariable Integer studyId) {
        Page<Board> boardPage = boardService.findBoardPageByBoardTypeAndStudyId('2', studyId, pageable);
        Page<StudyBoardListResDto> studyBoardListResDtoPage = boardPage.map(StudyBoardListResDto::new);

        return new ResponseEntity(studyBoardListResDtoPage, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 상세 조회 요청", description = "스터디 게시글 상세 조회 요청", responses = {
            @ApiResponse(responseCode = "200", description = "하나의 스터디 게시글 상세"),
    })
    @GetMapping("/board/{boardId}")
    public ResponseEntity<?> studyBoardDetails(@PathVariable Integer boardId) {
        Board board = boardService.findBoardByBoardIdAndBoardType(boardId, '2');
        StudyBoardDetailResDto studyBoardDetailResDto = getBoardMapper.boardToStudyBoardDetailResDto(board);
        return new ResponseEntity(studyBoardDetailResDto, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 파일 다운로드", description = "스터디 게시글 파일 다운로드 요청", responses = {
            @ApiResponse(responseCode = "200", description = "파일 다운로드"),
    })
    @GetMapping("/board/file/download")
    public ResponseEntity<ByteArrayResource> studyBoardFileDownload(String boardFile) throws IOException {
        byte[] data = s3Service.downloadFile(boardFile);
        ByteArrayResource resource = new ByteArrayResource(data);

        String originalFileName = extractOriginalFileName(boardFile);
        String encodedFileName = new String(originalFileName.getBytes("UTF-8"), "ISO-8859-1");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDisposition(ContentDisposition.builder("attachment").filename(encodedFileName).build());

        return new ResponseEntity<>(resource, httpHeaders, HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 수정 요청", description = "스터디  게시글 수정 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 수정 성공"),
    })
    @PutMapping(value = "/board", consumes = {"multipart/form-data"})
    public ResponseEntity<?> studyBoardModify(@RequestPart PutBoardReqDto putBoardReqDto, @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        Board board = putBoardMapper.putBoardReqDtoToBoard(putBoardReqDto);
        Integer memberId = putBoardReqDto.getMemberId();

        String url;
        if (multipartFile != null) {
            String boardFile = board.getBoardFile();

            if (boardFile != null) s3Service.deleteFile(boardFile);
            url = s3Service.uploadFile(multipartFile);
            board.setBoardFile(url);
        }

        boardService.modifyBoard(memberId, board);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "스터디 게시글 삭제 요청", description = "스터디 게시글 삭제 요청", responses = {
            @ApiResponse(responseCode = "200", description = "글 삭제 성공"),
    })
    @DeleteMapping("/board/{boardId}/{memberId}")
    public ResponseEntity<?> studyBoardRemove(@PathVariable Integer boardId, @PathVariable Integer memberId) {
        boardService.removeBoard(boardId, memberId);

        return new ResponseEntity(HttpStatus.OK);
    }

    private String extractOriginalFileName(String fileName) {
        int lastIndexOfSlash = fileName.lastIndexOf("_") + 1;
        return fileName.substring(lastIndexOfSlash);
    }

}