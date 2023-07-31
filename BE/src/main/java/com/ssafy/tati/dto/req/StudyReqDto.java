package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(description = "스터디 생성 DTO")
public class StudyReqDto {
    // Study Entity
//    @Schema(hidden = true)
//    private Integer studyId;
    @Schema(description = "스터디 명")
    private String studyName;
    @Schema(description = "스터디 설명")
    private String studyDescription;
    @Schema(description = "허용 인원")
    private Integer totalMember;
    @Schema(description = "비밀번호")
    private Integer studyPassword;
    @Schema(description = "스터디 시작일")
    private String studyStartDate;
    @Schema(description = "스터디 종료일")
    private String studyEndDate;
    // StudySchedule Entity
//    @Schema(hidden = true)
//    private Integer studyScheduleId;
    @Schema(description = "요일 리스트")
    private List<StudyDayItemDto> studyDay;
    @Schema(description = "시작시간 리스트")
    private List<StudyStartTimeItemDto> studyStartTime;
    @Schema(description = "종료시간 리스트")
    private List<StudyEndTimeItemDto> studyEndTime;
    // Category Entity
//    @Schema(hidden = true)
//    private Integer categoryId;
    @Schema(description = "카테고리 이름")
    private String categoryName;

}
