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
@Schema(description = "댓글 요청 DTO")
public class PostCommentReqDto {
    @Schema(description = "댓글 내용")
    private String commentContent;
    @Schema(description = "작성자 식별번호")
    private  Integer memberId;
    @Schema(description = "게시글 식별번호")
    private  Integer boardId;
}
