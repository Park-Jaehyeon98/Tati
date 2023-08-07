package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "스터디 일정 응답 DTO")
public class StudyScheduleResDto {

    @Schema(description = "스터디 요일")
    private String studyDay;

    @Schema(description = "스터디 시작 시간")
    private Time studyStartTime;

    @Schema(description = "스터디 끝 시간")
    private Time studyEndTime;

}
