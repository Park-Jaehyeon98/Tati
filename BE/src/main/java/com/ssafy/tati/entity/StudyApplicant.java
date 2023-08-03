package com.ssafy.tati.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyApplicantId")
@NoArgsConstructor
@AllArgsConstructor
public class StudyApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyApplicantId;

    @Column(name = "study_applicant_deposit", columnDefinition = "int", nullable = false)
    private Integer studyApplicantDeposit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public StudyApplicant(Study study, Member member, Integer studyDeposit) {
        setStudy(study);
        setMember(member);
        this.studyApplicantDeposit = studyDeposit;
    }
}
