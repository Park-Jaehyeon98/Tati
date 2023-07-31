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
public class StudyDayItemDto {
    @Schema(description = "요일")
    private String studyDay;

//    private StudyDayItemDto() {}
    public StudyDayItemDto(StudyDayItemDto studyDayItemDto) {
        this.studyDay = studyDayItemDto.getStudyDay();
    }

}
