package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageResDto {

    @Schema(description = "회원 이미지")
    private String img;

    @Schema(description = "오늘 공부시간")
    private Integer todayStudyTime;

    @Schema(description = "총 공부시간")
    private Integer totalStudyTime;

    @Schema(description = "열정지수")
    private Integer totalScore;

    @Schema(description = "스터디 일정 리스트")
    private List<StudyResDto> studyScheduleList;

    @Schema(description = "할 일 리스트")
    private List<ScheduleResDto> scheduleList;

    //상 벌점 리스트

}
