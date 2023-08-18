package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "캠스터디 퇴실 응답 DTO")
public class AttendanceOutResDto {
    @Schema(description = "출석 여부 (결석 / 지각 / 출석)")
    private String isAttended;
}
