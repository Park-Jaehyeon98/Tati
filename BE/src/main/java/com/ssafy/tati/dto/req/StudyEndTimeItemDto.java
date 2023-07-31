package com.ssafy.tati.dto.req;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudyEndTimeItemDto {
    @Schema(description = "종료시간")
    private String studyEndTime;

//    private StudyEndTimeItemDto(){};

    public StudyEndTimeItemDto(StudyEndTimeItemDto studyEndTimeItemDto) {
        this.studyEndTime = studyEndTimeItemDto.getStudyEndTime();
    }
}
