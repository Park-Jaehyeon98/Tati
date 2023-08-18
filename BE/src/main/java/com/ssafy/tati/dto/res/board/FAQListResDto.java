package com.ssafy.tati.dto.res.board;

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
@Schema(description = "FAQ 응답 DTO")
public class FAQListResDto {
    @Schema(description = "공지글 식별번호")
    private Integer boardId;
    @Schema(description = "공지글 제목")
    private String boardTitle;
    @Schema(description = "공지글 내용")
    private String boardContent;

    public FAQListResDto(Board board) {
        this.boardId = board.getBoardId();
        this.boardTitle = board.getBoardTitle();
        this.boardContent = board.getBoardContent();
    }
}
