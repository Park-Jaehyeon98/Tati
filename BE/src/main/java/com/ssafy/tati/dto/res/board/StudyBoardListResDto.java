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
@Schema(description = "스터디 게시글 리스트 응답 DTO (스터디 게시판 리스트 조회 시 사용)")
public class StudyBoardListResDto {
    @Schema(description = "게시글 식별번호")
    private Integer boardId;
    @Schema(description = "게시글 제목")
    private String boardTitle;
    @Schema(description = "작성자 닉네임")
    private String memberNickname;
    @Schema(description = "조회수")
    private Integer boardHit;
    @Schema(description = "작성일")
    private String createdDate;
    @Schema(description = "수정일")
    private String modifiedDate;
    @Schema(description = "댓글수")
    private Integer commentCount;

    public StudyBoardListResDto(Board board) {
        this.boardId = board.getBoardId();
        this.boardTitle = board.getBoardTitle();
        this.memberNickname = board.getMember().getMemberNickName();
        this.boardHit = board.getBoardHit();
        String create = board.getCreatedDate().toLocalDate().toString();
        String modify = board.getModifiedDate().toLocalDate().toString();
        this.createdDate = create;
        this.modifiedDate = modify;
        this.commentCount = board.getCommentList().size();
    }
}
