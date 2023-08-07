package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "캠스터디 입실 요청 DTO")
public class AttendanceInReqDto {
    @Schema(description = "스터디 식별번호")
    private Integer studyId;
    @Schema(description = "회원 식별번호")
    private Integer memberId;
    @Schema(description = "스터디 입실시각")
    @DateTimeFormat(pattern = "yy-MM-dd HH:mm:ss")
    private LocalDateTime inTime;
}
