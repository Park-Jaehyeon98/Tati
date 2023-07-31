package com.ssafy.tati.repository;

import com.ssafy.tati.entity.MemberSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<MemberSchedule, Integer> {

    //email로 일정 조회
    @Query("select s from MemberSchedule as s join fetch s.member as m where m.email = :email")
    List<MemberSchedule> selectSchedule(@Param("email") String email);
}
