package com.ssafy.tati.dto.req;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "스터디 가입 승인 Dto")
public class StudyApplicantApprovalMemberReqDto {
    @Schema(description = "회원 식별 번호")
    private Integer memberId;

    @Schema(description = "스터디 식별 번호")
    private Integer studyId;
}