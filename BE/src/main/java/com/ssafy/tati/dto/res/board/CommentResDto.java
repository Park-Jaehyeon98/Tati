package com.ssafy.tati.dto.res.board;

import com.ssafy.tati.entity.Comment;
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
@Schema(description = "댓글 응답 DTO")
public class CommentResDto {
    @Schema(description = "댓글 식별번호")
    private Integer commentId;
    @Schema(description = "댓글 내용")
    private String commentContent;
    @Schema(description = "작성자 닉네임")
    private String memberNickName;
    @Schema(description = "작성일")
    private LocalDateTime createdDate;
    @Schema(description = "수정일")
    private LocalDateTime modifiedDate;

    public CommentResDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.commentContent = comment.getCommentContent();
        this.memberNickName = comment.getMember().getMemberNickName();
        this.createdDate = comment.getCreatedDate();
        this.modifiedDate = comment.getModifiedDate();
    }
}
