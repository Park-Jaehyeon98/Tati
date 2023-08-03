package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.StudyApplicant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyApplicantRepository extends JpaRepository<StudyApplicant, Integer> {
    List<StudyApplicant> findAllByStudyStudyId(Integer studyId);

}
