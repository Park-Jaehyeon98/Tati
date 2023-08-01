package com.ssafy.tati.dto.res;

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
@Schema(description = "공지글 응답 DTO")
public class NoticeResDto {
    @Schema(description = "공지글 식별번호")
    private Integer boardId;
    @Schema(description = "공지글 제목")
    private String boardTitle;
    @Schema(description = "공지글 내용")
    private String boardContent;
    @Schema(description = "작성자 식별번호")
    private Integer memberId;
    @Schema(description = "작성자 닉네임")
    private String memberNickname;
    @Schema(description = "조회수")
    private Integer boardHit;
    @Schema(description = "작성일")
    private LocalDateTime createdDate;
    @Schema(description = "수정일")
    private LocalDateTime modifiedDate;

}
