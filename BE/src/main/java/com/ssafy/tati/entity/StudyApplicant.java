package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyApplicantId")
public class StudyApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyApplicantId;

    @Column(name = "study_applicant_deposit", columnDefinition = "int", nullable = false)
    private Integer studyApplicantDeposit;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "study_id")
    private Study studyId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member memberId;
}
