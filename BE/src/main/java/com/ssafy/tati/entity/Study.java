package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
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

    @Column(name = "study_start_date", columnDefinition = "date", nullable = false)
    private String studyStartDate;

    @Column(name = "study_end_date", columnDefinition = "date", nullable = false)
    private String studyEndDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
