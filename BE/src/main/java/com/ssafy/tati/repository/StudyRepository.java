package com.ssafy.tati.repository;

import com.ssafy.tati.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {

//    @Query("SELECT s FROM Study s JOIN FETCH s.category c WHERE c.categoryId = :categoryId AND s.studyName LIKE %:keyword%")
//    Page<Study> findByCategoryAndStudyNameContaining(@Param("categoryId") Integer categoryId, @Param("keyword") String keyword, Pageable pageable);
//    @Query("SELECT s FROM Study s JOIN FETCH s.category c WHERE c.categoryId = :categoryId AND s.studyName LIKE %:keyword%")
    Page<Study> findByCategoryAndStudyNameContaining(Category category, String keyword, Pageable pageable);

    @Query("SELECT s FROM Study s WHERE s.studyName LIKE %:keyword%")
    Page<Study> findByStudyNameContaining(@Param("keyword") String keyword, Pageable pageable);

    Page<Study> findAll(Pageable pageable);

    @Query("select b from Board as b join fetch b.study as s where s.studyId = :studyId")
    List<Board> findBoardByStudyId(Integer studyId);

    @Query("select sc from StudySchedule as sc join fetch sc.study as s where s.studyId = :studyId")
    List<StudySchedule> findScheduleById(Integer studyId);

    @Query("select sa from StudyApplicant as sa join fetch sa.study as s where s.studyId = :studyId")
    List<StudyApplicant> findApplicantById(Integer studyId);

    @Query("select sm from StudyMember as sm join fetch sm.study as s where s.studyId = :studyId")
    List<StudyMember> findStudyMemberById(Integer studyId);

    @Query("select m from Member as m ")
    List<Member> findMemberByStudyMemberId(Integer studyMemberId);


}
