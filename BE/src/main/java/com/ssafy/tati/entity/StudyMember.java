package com.ssafy.tati.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyMemberId")
@NoArgsConstructor
@AllArgsConstructor
public class StudyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyMemberId;

    @Column(name = "study_member_deposit", columnDefinition = "int", nullable = false)
    private Integer studyMemberDeposit;

    @Column(name = "study_join_date", nullable = false)
    private LocalDate studyJoinDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public StudyMember(Integer point, LocalDate currentDate, Study study, Member member) {
        this.studyMemberDeposit = point;
        this.studyJoinDate = currentDate;
        setMember(member);
        setStudy(study);
    }

    private void setMember(Member member){
        this.member=member;
        if(member!=null){
            member.getStudyList().add(this);
        }
    }

    private void setStudy(Study study){
        this.study=study;
        if(study!=null){
            study.getStudyMemberList().add(this);
        }
    }
}
