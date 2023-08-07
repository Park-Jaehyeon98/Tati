package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "스터디 정보 응답 DTO")
public class StudyResDto {

    @Schema(description = "스터디 식별번호")
    private Integer studyId;

    @Schema(description = "스터디 이름")
    private String studyName;

    @Schema(description = "스터디 시작 날짜")
    private LocalDate studyStartDate;

    @Schema(description = "스터디 완료 날짜")
    private LocalDate studyEndDate;

    @Schema(description = "스터디 일정 dto")
    private List<StudyScheduleResDto> studyScheduleList;

}
