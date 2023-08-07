package com.ssafy.tati.repository;

import com.ssafy.tati.entity.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Integer> {

    List<StudyMember> findAllByStudyStudyId(Integer studyId);

    Optional<StudyMember> findByStudyIdAndMemberId(Integer studyId, Integer memberId);
}
