package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "게시판 요청 DTO")
public class BoardReqDto {
    @Schema(hidden = true)
    private Integer boardId;
//    @Schema(hidden = true)
//    private char boardType;
    @Schema(description = "게시글 제목")
    private String boardTitle;
    @Schema(description = "게시글 내용")
    private String boardContent;
    @Schema(description = "작성자 식별번호")
    private  Integer memberId;
    @Schema(description = "스터디 식별번호")
    private  Integer studyId;
}
