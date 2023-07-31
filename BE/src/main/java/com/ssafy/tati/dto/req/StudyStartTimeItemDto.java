package com.ssafy.tati.dto.req;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudyStartTimeItemDto {
    @Schema(description = "시작시간")
    private String studyStartTime;

//    private StudyStartTimeItemDto(){};

    public StudyStartTimeItemDto(StudyStartTimeItemDto studyStartTimeItemDto) {
        this.studyStartTime = studyStartTimeItemDto.getStudyStartTime();
    }
}
