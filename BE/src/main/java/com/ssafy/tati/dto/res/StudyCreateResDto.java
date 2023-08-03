package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "스터디 생성 ResDto")
public class StudyCreateResDto {
    @Schema(description = "스터디 식별번호")
    private Integer StudyId;
}
