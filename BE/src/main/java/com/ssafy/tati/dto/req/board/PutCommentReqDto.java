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
@Schema(description = "댓글 수정 요청 DTO")
public class PutCommentReqDto {
    @Schema(description = "댓글 식별번호")
    private Integer commentId;
    @Schema(description = "댓글 내용")
    private String commentContent;
    @Schema(description = "작성자 식별번호")
    private  Integer memberId;
}
