package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "스터디 삭제 ResDto")
public class StudyDeleteResDto {
    @Schema(description = "스터디 이름")
    private String studyName;
}
