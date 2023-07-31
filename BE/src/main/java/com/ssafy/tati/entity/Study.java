package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.HashSet;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyId")
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyId;

    @Column(name = "study_name", length = 50, nullable = false)
    private String studyName;

    @Column(name = "study_description", nullable = false)
    private String studyDescription;

    @Column(name = "total_member", columnDefinition = "int", nullable = false)
    private Integer totalMember;

    @Column(name = "study_password", columnDefinition = "int")
    private Integer studyPassword;

//    @CreatedDate
//    @Column(name = "study_start_date", columnDefinition = "date", nullable = false)
    @Column(name = "study_start_date", nullable = false)
    private String studyStartDate;

//    @CreatedDate
//    @Column(name = "study_start_date", columnDefinition = "date", nullable = false)
    @Column(name = "study_end_date", nullable = false)
    private String studyEndDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;


//    public void update(Study updateStudy) {
//        this.setStudyName(updateStudy.studyName);
//        this.setStudyPassword(updateStudy.studyPassword);
//    }
}
