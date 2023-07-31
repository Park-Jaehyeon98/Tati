package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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

    @Column(name = "is_public", columnDefinition = "boolean", nullable = false)
    private Boolean isPublic;

    @Column(name = "study_host", length = 20, nullable = false)
    private String studyHost;

    @Column(name = "study_deposit", columnDefinition = "int", nullable = false)
    private Integer studyDeposit;

    @Column(name = "study_password", columnDefinition = "int")
    private Integer studyPassword;

    @Column(name = "study_start_date", nullable = false)
    private String studyStartDate;

    @Column(name = "study_end_date", nullable = false)
    private String studyEndDate;

//    @ManyToOne
//    @JoinColumn(name = "category_id")
//    private Category category;

}