package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "일정 등록 DTO")
public class ScheduleReqDto {

    @Schema(description = "날짜")
    private LocalDateTime memberScheduleDate;

    @Schema(description = "제목")
    private String memberScheduleTitle;

    @Schema(description = "내용")
    private String memberScheduleContent;

    @Schema(description = "회원 이메일")
    private String email;

}
