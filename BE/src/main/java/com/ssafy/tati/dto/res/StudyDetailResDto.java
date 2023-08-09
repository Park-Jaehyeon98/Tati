package com.ssafy.tati.dto.res;

import com.ssafy.tati.entity.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(description = "스터디 상세 ResDto")
public class StudyDetailResDto {

    @Schema(description = "스터디 식별번호")
    private Integer studyId;

    @Schema(description = "이미지 url")
    private String img;

    @Schema(description = "스터디 명")
    private String studyName;

    @Schema(description = "스터디 설명")
    private String studyDescription;

    @Schema(description = "총 인원")
    private Integer totalMember;

    @Schema(description = "공개 여부")
    private boolean disclosure;

    @Schema(description = "스터디 방장")
    private String studyHost;

    @Schema(description = "스터디 보증금")
    private Integer studyDeposit;

    @Schema(description = "스터디 비밀번호")
    private Integer studyPassword;

    @Schema(description = "스터디 시작 날짜")
    private String studyStartDate;

    @Schema(description = "스터디 종료 날짜")
    private String studyEndDate;

    @Schema(description = "카테코리 식별번호")
    private Integer categoryId;

    @Schema(description = "스터디 회원 여부")
    private boolean studyMemberYn;

    @Schema(description = "총 벌금")
    private Integer totalPenalty;

    @Schema(description = "총 보증금")
    private Integer totalDeposit;

    @Schema(description = "게시글 목록")
    private List<Board> boardList;

    @Schema(description = "스터디 일정 목록")
    private List<StudyScheduleResDto> studyScheduleResDtoList;

    @Schema(description = "스터디 신청 목록")
    private List<StudyApplicant> applicantList;

    @Schema(description = "스터디 멤버 목록")
    private List<StudyMemberResDto> studyMemberResDtoList;



}
