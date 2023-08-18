package com.ssafy.tati.dto.res;

import com.ssafy.tati.entity.Study;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원 가입 스터디 응답 DTO")
public class JoinStudyResDto {

    @Schema(description = "스터디 식별번호")
    private Integer studyId;

    @Schema(description = "스터디 이름")
    private String studyName;

    @Schema(description = "스터디 시작 날짜")
    private LocalDate studyStartDate;

    @Schema(description = "스터디 완료 날짜")
    private LocalDate studyEndDate;

    @Schema(description = "스터디 모집 인원")
    private Integer totalMember;

    @Schema(description = "스터디 가입 인원")
    private Integer studyMemberCount;

    public JoinStudyResDto(Study study, Integer studyMemberCount){
        this.studyId = study.getStudyId();
        this.studyName = study.getStudyName();
        this.studyStartDate = study.getStudyStartDate();
        this.studyEndDate = study.getStudyEndDate();
        this.totalMember = study.getTotalMember();
        this.studyMemberCount = studyMemberCount;
    }
}
