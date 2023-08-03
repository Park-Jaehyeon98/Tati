package com.ssafy.tati.dto.req.board;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "게시판 글 작성 요청 DTO (스터디 공지사항 및 스터디 게시글 작성 시 사용)")
public class PostStudyBoardReqDto {
    @Schema(description = "게시글 제목")
    private String boardTitle;
    @Schema(description = "게시글 내용")
    private String boardContent;
    @Schema(description = "작성자 식별번호")
    private Integer memberId;
    @Schema(description = "스터디 식별번호")
    private Integer studyId;
}
