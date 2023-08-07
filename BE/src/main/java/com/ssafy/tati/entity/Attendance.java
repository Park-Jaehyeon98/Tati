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
    private char isAttended;

    //상벌점
    @Column(columnDefinition = "int default 0")
    private Integer score;


    //입퇴실 1건에 대한 벌금
    @Column(name = "penalty_amt", nullable = false, columnDefinition = "int default 0")

    private Short penaltyAmt;

    //내용
    private String content;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "study_member_id")
    private StudyMember studyMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

}
