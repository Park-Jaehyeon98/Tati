package com.ssafy.tati.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter @Setter
@EqualsAndHashCode(of = "studyApplicantId")
@NoArgsConstructor
@AllArgsConstructor
public class StudyApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyApplicantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public StudyApplicant(Study study, Member member) {
        setStudy(study);
        setMember(member);
    }

    public Integer getMemberId() {
        Integer memberId = member.getMemberId();
        return memberId;
    }
}
