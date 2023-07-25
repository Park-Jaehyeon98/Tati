package com.ssafy.tati.dto.req;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class PointReqDto {
    private String pointDate;
    private int amount;
    private int memberId;
}
