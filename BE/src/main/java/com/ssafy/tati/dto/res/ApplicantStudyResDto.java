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
@Schema(description = "회원 신청 스터디 응답 DtO")
public class ApplicantStudyResDto {

    @Schema(description = "신청 스터디 식별번호")
    private Integer studyApplicantId;

    @Schema(description = "스터디 이름")
    private String studyName;

    @Schema(description = "스터디 모집명수")
    private Integer totalMember;

    @Schema(description = "스터디 신청 명수")
    private Integer currentMemberCount;

}
