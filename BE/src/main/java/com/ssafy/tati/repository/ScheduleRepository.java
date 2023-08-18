package com.ssafy.tati.repository;

import com.ssafy.tati.entity.MemberSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<MemberSchedule, Integer> {

    //memberId로 일정 조회
    @Query("select s from MemberSchedule as s join s.member as m where m.memberId = :memberId")
    List<MemberSchedule> selectSchedule(@Param("memberId") Integer memberId);
}
