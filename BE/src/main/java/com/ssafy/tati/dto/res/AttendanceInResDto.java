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
@Schema(description = "캠스터디 입실 응답 DTO")
public class AttendanceInResDto {
    @Schema(description = "입퇴실 식별번호")
    private Integer attendanceId;
}
