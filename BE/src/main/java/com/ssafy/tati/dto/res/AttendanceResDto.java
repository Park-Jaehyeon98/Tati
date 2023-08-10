package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원 입퇴실 응답 DtO")
public class AttendanceResDto {

    @Schema(description = "날짜")
    private LocalDate attendanceDate;

    @Schema(description = "입실시간")
    private LocalTime inTime;

    @Schema(description = "퇴실시간")
    private LocalTime outTime;

    @Schema(description = "출석여부")
    private char isAttended;

    @Schema(description = "상벌점")
    private String score;

    @Schema(description = "내용")
    private String content;
}
