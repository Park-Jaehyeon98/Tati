package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Schema(description = "스터디 생성 DTO")
public class StudyReqDto {

    @Schema(description = "스터디 명")
    private String studyName;

    @Schema(description = "스터디 설명")
    private String studyDescription;

    @Schema(description = "허용 인원")
    private Integer totalMember;

    @Schema(description = "비밀번호")
    private Integer studyPassword;

    @Schema(description = "공개 여부")
    private Boolean disclosure;

    @Schema(description = "스터디 방장")
    private String studyHost;

    @Schema(description = "신청 보증금")
    private Integer studyDeposit;

    @Schema(description = "스터디 시작일")
    private String studyStartDate;

    @Schema(description = "스터디 종료일")
    private String studyEndDate;

    @Schema(description = "스터디 일정 리스트")
    private List<StudyScheduleReqDto> studySchedule;

    @Schema(description = "카테고리 식별번호")
    private Integer categoryId;

}
