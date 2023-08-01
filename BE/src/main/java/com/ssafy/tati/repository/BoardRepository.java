package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    //이메일로 조회
    @Query("select b from Board as b join fetch b.member as m where m.memberId = :memberId")
    List<Board> findByEmail(Integer memberId);

//    List<Board> findAllByBoardType();
//
    List<Board> findByBoardType(char boardType);
//
//    @Query("select s.study from Board as s join s.member as m where m.memberId = :memberId")
//    List<Board> selectStudyMemberList(@Param("boardId") Integer boardId);
}
