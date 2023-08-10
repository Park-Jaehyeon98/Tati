package com.ssafy.tati.dto.res;

import com.ssafy.tati.entity.Board;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원 게시글 응답 DTO")
public class MemberBoardListResDto {

    @Schema(description = "게시글 식별번호")
    private Integer boardId;

    @Schema(description = "게시글 제목")
    private String boardTitle;

    @Schema(description = "게시글 조회수")
    private Integer boardHit;

    @Schema(description = "댓글 수")
    private Integer boardCommentCount;

    @Schema(description = "작성 날짜")
    private String createdDate;

}
