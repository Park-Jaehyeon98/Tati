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
@Schema(description = "스터디 게시판 대표글로 등록 / 삭제 요청 DTO")
public class NoticeMainReqDto {
    @Schema(description = "게시글 번호")
    private Integer boardId;
    @Schema(description = "작성자 식별번호")
    private Integer memberId;
}
