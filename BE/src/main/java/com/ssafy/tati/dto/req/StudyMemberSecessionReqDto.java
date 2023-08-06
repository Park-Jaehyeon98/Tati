package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "스터디 탈퇴")
public class StudyMemberSecessionReqDto {
    @Schema(description = "스터디 식별번호")
    private Integer studyId;
    @Schema(description = "회원 식별번호")
    private Integer memberId;
}
