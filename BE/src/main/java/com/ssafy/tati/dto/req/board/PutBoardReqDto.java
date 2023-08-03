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
@Schema(description = "게시판 수정 요청 DTO")
public class PutBoardReqDto {
    @Schema(description = "게시글 식별번호")
    private Integer boardId;
    @Schema(description = "게시글 제목")
    private String boardTitle;
    @Schema(description = "게시글 내용")
    private String boardContent;
    @Schema(description = "게시글 작성자 식별번호")
    private Integer memberId;
}
