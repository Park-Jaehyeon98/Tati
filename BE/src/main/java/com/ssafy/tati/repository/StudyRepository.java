package com.ssafy.tati.repository;

import com.ssafy.tati.dto.res.StudyAllListResDto;
import com.ssafy.tati.dto.res.StudyModifyResDto;
import com.ssafy.tati.entity.MemberSchedule;
import com.ssafy.tati.entity.Study;
import org.hibernate.annotations.SQLDeleteAll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {
    Optional<Study> findById(Integer id);

//    List<Study> findByStudyNameContaining(List<Study> studyList, String keyword);
//
//    @Query("select s from Study as s join fetch s.category as m where m.categoryId = :categoryId")
//    List<Study> selectStudy(@Param("categoryId") Integer categoryId);

    @Query("SELECT s FROM Study s JOIN FETCH s.category c WHERE c.categoryId = :categoryId AND s.studyName LIKE %:keyword%")
    List<Study> findByCategoryAndStudyNameContaining(@Param("categoryId") Integer categoryId, @Param("keyword") String keyword);

    //    Optional<Study> findAllStudy();
//    @Modifying(clearAutomatically = true)
//    @Query("update Study set ")

//    List<Study> findAllByStudyNameAndStudyDescription(String name);

//    Study findByMemberWith

}
