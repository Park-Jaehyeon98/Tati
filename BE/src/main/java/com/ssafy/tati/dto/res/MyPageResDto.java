package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageResDto {

    //오늘 공부시간
    Integer todayStudyTime;

    //총 공부시간
    Integer totalStudyTime;

    //스터디 리스트

    //할 일 리스트
    @Schema(description = "할 일 리스트")
    List<ScheduleResDto> scheduleList;

    //상 벌점 리스트

}
