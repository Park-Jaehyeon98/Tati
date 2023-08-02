package com.ssafy.tati.service;

import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Comment;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.repository.BoardRepository;
import com.ssafy.tati.repository.CommentRepository;
import com.ssafy.tati.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    // 스터디 게시판 댓글 생성
    public void saveComment(Integer memberId, Integer boardId, Comment comment) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalMember.isEmpty() || optionalBoard.isEmpty()){
            throw new RuntimeException();
        }

        Member member = optionalMember.get();
        Board board = optionalBoard.get();

        if (board.getBoardType() != '2') {
            throw new RuntimeException();
        }
        comment.setMember(member);
        comment.setBoard(board);
        commentRepository.save(comment);
    }

    public void updateComment(Integer memberId, Comment comment) {
        Optional<Comment> optionalComment = commentRepository.findById(comment.getCommentId());

        if (optionalComment.isEmpty()){
            throw new RuntimeException();
        }
        Comment modifyComment = optionalComment.get();

        if (modifyComment.getMember().getMemberId().equals(memberId)) {
            modifyComment.setCommentContent(comment.getCommentContent());
        } else {
            throw new RuntimeException();
        }
    }
}
