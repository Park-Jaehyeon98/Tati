package com.ssafy.tati.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyScheduleId")
public class StudySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyScheduleId;

    @Column(name = "study_day", nullable = false)
    private String studyDay;

    @Column(name = "study_start_time", nullable = false)
    private String studyStartTime;

    @Column(name = "study_end_time", nullable = false)
    private String studyEndTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

}
