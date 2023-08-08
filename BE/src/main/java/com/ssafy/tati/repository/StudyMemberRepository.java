package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyMemberRepository extends JpaRepository<StudyMember, Integer> {

    void deleteById(Integer id);

    List<StudyMember> findAllByStudyStudyId(Integer studyId);

    Optional<StudyMember> findByStudyStudyIdAndMember(Integer studyId, Member member);
}
