package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "스터디 검색")
public class StudySearchListResDto {
    @Schema(description = "스터디 식별번호")
    private Integer studyId;

    @Schema(description = "스터디 명")
    private String studyName;

    @Schema(description = "총 인원수")
    private Integer totalMember;

    @Schema(description = "공개 여부")
    private Boolean disclosure;
}
