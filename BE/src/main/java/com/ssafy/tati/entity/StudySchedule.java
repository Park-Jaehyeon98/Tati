package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class StudySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyScheduleId;

    @Column(name = "study_day", length = 1, nullable = false)
    private String studyDay;

    @Column(name = "study_start_time", columnDefinition = "date", nullable = false)
    private String studyStartTime;

    @Column(name = "study_end_time", columnDefinition = "date", nullable = false)
    private String studyEndTiem;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

}
