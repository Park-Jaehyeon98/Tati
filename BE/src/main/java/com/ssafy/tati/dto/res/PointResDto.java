package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "포인트 응답 DTO")
public class PointResDto {
    @Schema(description = "날짜")
    private LocalDateTime pointDate;

    @Schema(description = "결제고유번호")
    private String tid;

    @Schema(description = "총 금액")
    private int amount;

    @Schema(description = "내용")
    private String pContent;

}
