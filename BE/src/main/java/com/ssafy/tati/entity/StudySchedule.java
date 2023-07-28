package com.ssafy.tati.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

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

//    @Column(name = "study_start_time", columnDefinition = "date", nullable = false)
    @Column(name = "study_start_time", nullable = false)
    private String studyStartTime;

//    @Column(name = "study_end_time", columnDefinition = "date", nullable = false)
    @Column(name = "study_end_time", nullable = false)
    private String studyEndTime;

    @ManyToOne
    @JoinColumn(name = "study_id")
    private Study study;

}
