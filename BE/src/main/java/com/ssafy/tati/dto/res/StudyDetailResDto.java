package com.ssafy.tati.dto.res;

import com.ssafy.tati.dto.res.board.StudyNoticeDetailResDto;
import com.ssafy.tati.entity.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
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

    @Schema(description = "스터디 일정 목록")
    private List<StudyScheduleResDto> studySchedule;

    @Schema(description = "스터디 신청 목록")
    private List<StudyApplicantMemberResDto> applicantList;

    @Schema(description = "스터디 멤버 목록")
    private List<StudyMemberResDto> studyMemberResDtoList;

    @Schema(description = "스터디 대표 공지")
    private StudyNoticeDetailResDto studyNoticeDetailResDto;

    public StudyDetailResDto(Study study, String studyHost, Category category, boolean studyMemberYn, List<StudyScheduleResDto> studySchedule, List<StudyApplicantMemberResDto> applicantList, List<StudyMemberResDto> studyMemberResDtoList, StudyNoticeDetailResDto studyNoticeDetailResDto) {
        this.studyId = study.getStudyId();
        this.img = study.getImg();
        this.studyName = study.getStudyName();
        this.studyDescription = study.getStudyDescription();
        this.totalMember = study.getTotalMember();
        this.disclosure = study.getDisclosure();
        this.studyHost = studyHost;
        this.studyDeposit = study.getStudyDeposit();
        this.studyPassword = study.getStudyPassword();
        this.studyStartDate = study.getStudyStartDate().toString();
        this.studyEndDate = study.getStudyEndDate().toString();
        this.categoryId = category.getCategoryId();

        this.studyMemberYn = studyMemberYn;
        this.totalPenalty = study.getTotalPenalty();
        this.totalDeposit = study.getTotalDeposit();
        this.studySchedule = studySchedule;
        this.applicantList = applicantList;
        this.studyMemberResDtoList = studyMemberResDtoList;
        this.studyNoticeDetailResDto = studyNoticeDetailResDto;
    }
}
