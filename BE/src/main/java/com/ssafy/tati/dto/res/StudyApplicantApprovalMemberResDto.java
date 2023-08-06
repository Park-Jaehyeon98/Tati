package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 전체 리스트 ResDto")
public class StudyApplicantApprovalMemberResDto {
    @Schema(description = "스터디 식별번호")
    private Integer memberId;

    @Schema(description = "회원 식별번호")
    private Integer studyId;

    @Schema(description = "회원 닉네임")
    private String memberNickName;
}
