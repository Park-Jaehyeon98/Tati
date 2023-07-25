package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class StudyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyMemberId;

    @Column(name = "study_status", nullable = false)
    private  String studyStatus;

    @Column(name = "study_deposit", columnDefinition = "int", nullable = false)
    private Integer studyDeposit;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
