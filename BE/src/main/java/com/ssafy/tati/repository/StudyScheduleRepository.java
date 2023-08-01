package com.ssafy.tati.repository;

import com.ssafy.tati.entity.StudySchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyScheduleRepository extends JpaRepository<StudySchedule, Integer> {
}
