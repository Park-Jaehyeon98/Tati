package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyMemberId")
public class StudyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyMemberId;

    @Column(name = "study_member_status", nullable = false)
    private  String studyMemberStatus;

    @Column(name = "study_member_deposit", columnDefinition = "int", nullable = false)
    private Integer studyMemberDeposit;

    @Column(name = "study_join_date", nullable = false)
    private String studyJoinDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}