package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    //이메일로 조회
    @Query("select b from Board as b join fetch b.member as m where m.memberId = :memberId")
    List<Board> findByEmail(Integer memberId);
}
