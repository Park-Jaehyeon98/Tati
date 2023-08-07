package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {

    @Query("SELECT s FROM Study s JOIN FETCH s.category c WHERE c.categoryId = :categoryId AND s.studyName LIKE %:keyword%")
    List<Study> findByCategoryAndStudyNameContaining(@Param("categoryId") Integer categoryId, @Param("keyword") String keyword);




}
