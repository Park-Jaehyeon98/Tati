package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "ATTENDANCE")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attendanceId;

    @CreationTimestamp
    @Column(name = "in_time", nullable = false)
    private String inTime;

    @CreationTimestamp
    @Column(name = "out_time")
    private String outTime;

    @Column(name = "is_attended")
    private String isAttended;

    @Column(name = "penalty_amt", columnDefinition = "smallint", nullable = false)
    private Short penaltyAmt;

    @ManyToOne
    @JoinColumn(name = "study_member_id")
    private StudyMember studyMember;
}
