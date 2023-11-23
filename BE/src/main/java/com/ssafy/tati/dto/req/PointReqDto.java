package com.ssafy.tati.dto.req;

import com.ssafy.tati.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "포인트 요청 DTO")
public class PointReqDto {

    @Schema(description = "날짜")
    private LocalDateTime pointDate;

    @Schema(description = "총 금액")
    private int amount;

    @Schema(description = "내용")
    private String pContent;

    @Schema(description = "이메일")
    private String email;

}