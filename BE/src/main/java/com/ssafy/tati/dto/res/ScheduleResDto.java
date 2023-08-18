package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "일정 응답 DTO")
public class ScheduleResDto {

    @Schema(description = "일정 식별번호")
    private Integer memberScheduleId;

    @Schema(description = "날짜")
    private LocalDate memberScheduleDate;

    @Schema(description = "제목")
    private String memberScheduleTitle;

    @Schema(description = "내용")
    private String memberScheduleContent;
}
