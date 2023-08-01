package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "스터디 정보 수정")
public class StudyModifyReqDto {
//    category - int
//    studyName - String
//    studyDescription - String
//    isPublic - boolean
//    password - int
    @Schema(description = "카테고리 식별번호")
    private Integer categoryId;

    @Schema(description = "스터디 이름")
    private String studyName;

    @Schema(description = "스터디 설명")
    private String studyDescription;

    @Schema(description = "공개 여부")
    private boolean disclosure;

    @Schema(description = "비밀번호")
    private Integer studyPassword;

}
