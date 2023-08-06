package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@EqualsAndHashCode(of = "attendanceId")
public class Attendance {

    @Id //입퇴실 식별번호
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attendanceId;

    //입실 시간
    @Column(name = "in_time", nullable = false)
    private LocalDateTime inTime;

    //퇴실 시간
    @Column(name = "out_time")
    private LocalDateTime outTime;

    //출석 여부 : 0 결석, 1 지각, 2 출석
    @Column(name = "is_attended")
    private Integer isAttended;

    //상벌점
    private Integer score;

    //회원이 제출한 누적 벌금 > 회원이 스터디 끝난 후 가져갈 보증금
    @Column(name = "penalty_amt", columnDefinition = "smallint", nullable = false)
    private Short penaltyAmt;

    //내용
    private String content;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "study_member_id")
//    private StudyMember studyMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;



}
