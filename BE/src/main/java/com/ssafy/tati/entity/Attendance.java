package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "attendanceId")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attendanceId;

    @Column(name = "in_time", nullable = false)
    private String inTime;

    @Column(name = "out_time")
    private String outTime;

    @Column(name = "is_attended")
    private String isAttended;

    @Column(name = "penalty_amt", columnDefinition = "smallint", nullable = false)
    private Short penaltyAmt;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "study_member_id")
    private StudyMember studyMember;
}
