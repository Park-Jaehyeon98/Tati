package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

public interface StudyManageRepository extends JpaRepository<Study, Integer> {

    @Query("select s from Study as s where s.studyEndDate<:today and s.depositEndYn=false")
    List<Study> findEndedStudyList(@Param("today") LocalDate today);

    @Query("select s from Study as s where s.studyMemberList is empty")
    List<Study> findBlankStudy();

    @Query("select sm from StudyMember as sm where sm.absenceCount = (" +
                "select min(absenceCount) from StudyMember)")
    List<StudyMember> findExcellentMember();

}
