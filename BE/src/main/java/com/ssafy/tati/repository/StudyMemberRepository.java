package com.ssafy.tati.repository;

import com.ssafy.tati.entity.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Integer> {

    List<StudyMember> findAllByStudyStudyId(Integer studyId);

}
