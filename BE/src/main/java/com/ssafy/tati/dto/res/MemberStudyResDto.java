package com.ssafy.tati.dto.res;

import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Study;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberStudyResDto {

    //신청한 스터디 리스트
    @Schema(description = "가입한 스터디 리스트")
    List<Study> studyList;

    //가입한 스터디 리스트
    //@Schema(description = "신청한 스터디 리스트")


    //작성한 게시글 리스트
    @Schema(description = "작성한 게시글 리스트")
    List<Board> boardList;

}
