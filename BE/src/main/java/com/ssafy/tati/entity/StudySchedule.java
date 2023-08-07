package com.ssafy.tati.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "studyScheduleId")
@NoArgsConstructor
@AllArgsConstructor
public class StudySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyScheduleId;

    @Column(name = "study_day", nullable = false)
    private String studyDay;

    @Column(name = "study_start_time", nullable = false)
    private Time studyStartTime;

    @Column(name = "study_end_time", nullable = false)
    private Time studyEndTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

}
