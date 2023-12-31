package com.ssafy.tati.dto.req;

import com.ssafy.tati.entity.Study;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudyScheduleReqDto {

    @Schema(description = "요일")
    // 월, 화, 수, ...
    private String studyDay;

    @Schema(description = "시작 시간")
    private String studyStartTime;

    @Schema(description = "종료 시간")
    private String studyEndTime;

}
