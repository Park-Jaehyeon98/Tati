package com.ssafy.tati.repository;

import com.ssafy.tati.dto.res.StudyModifyResDto;
import com.ssafy.tati.entity.Study;
import org.hibernate.annotations.SQLDeleteAll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer> {
    Optional<Study> findById(Integer id);
    //    Optional<Study> findAllStudy();

//    @Modifying(clearAutomatically = true)
//    @Query("update Study set ")

//    List<Study> findAllByStudyNameAndStudyDescription(String name);

//    Study findByMemberWith

}
