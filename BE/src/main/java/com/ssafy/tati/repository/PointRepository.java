package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Integer> {

    //포인트 내역 조회
    @Query("select p from Point as p join p.member as m where m.memberId = :memberId")
    List<Point> selectPoint(@Param("memberId") Integer memberId);
}
