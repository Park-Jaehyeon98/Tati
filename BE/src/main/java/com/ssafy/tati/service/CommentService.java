package com.ssafy.tati.service;

import com.ssafy.tati.entity.*;
import com.ssafy.tati.repository.BoardRepository;
import com.ssafy.tati.repository.CommentRepository;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.StudyMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final StudyMemberRepository studyMemberRepository;

    // 스터디 게시판 댓글 등록
    public void addComment(Integer memberId, Integer boardId, Comment comment) {
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

        // 스터디 멤버일때만 댓글 쓸수 있어야 함
        Optional<StudyMember> optionalStudyMember = studyMemberRepository.findByStudyStudyIdAndMember(board.getStudy().getStudyId(), member);
        if (optionalStudyMember.isEmpty()) {
            throw new RuntimeException();
        }

        comment.setMember(member);
        comment.setBoard(board);

        commentRepository.save(comment);
    }

    // 하나의 게시글에 대한 댓글 조회
    public Page<Comment> findCommentByBoardId(Integer boardId, Pageable pageable) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isEmpty()){
            throw new RuntimeException();
        }
        return commentRepository.findByBoardId(boardId, pageable);
    }

    public void modifyComment(Integer memberId, Comment comment) {
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

    public void removeComment(Integer commentId, Integer memberId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        if (optionalComment.isEmpty()){
            throw new RuntimeException();
        }
        Comment comment = optionalComment.get();

        if (comment.getMember().getMemberId().equals(memberId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new RuntimeException();
        }
    }

}