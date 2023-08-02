package com.ssafy.tati.repository;

import com.ssafy.tati.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("select c from Comment as c where c.board.boardId = :boardId")
    Page<Comment> findByBoardId(Integer boardId, Pageable pageable);
}
