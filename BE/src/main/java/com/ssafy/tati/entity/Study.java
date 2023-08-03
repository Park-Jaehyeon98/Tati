package com.ssafy.tati.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "disclosure", columnDefinition = "boolean", nullable = false)
    private Boolean disclosure;

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

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    List<Board> boardList = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    List<StudySchedule> studyScheduleList = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL)
    List<StudyMember> studyMemberList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "category_id")
    private Category category;

    public void update(Category category, String studyName, String studyDescription, Boolean disclosure, Integer studyPassword){
        this.category = category;
        this.studyName = studyName;
        this.studyDescription = studyDescription;
        this.disclosure = disclosure;
        this.studyPassword = studyPassword;
    }

}
