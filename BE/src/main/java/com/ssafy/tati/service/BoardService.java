package com.ssafy.tati.service;

import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyMember;
import com.ssafy.tati.repository.BoardRepository;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.StudyMemberRepository;
import com.ssafy.tati.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;

    // 게시글 등록
    public void createBoard(Integer memberId, Board board){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()){
            throw new RuntimeException();
        }
        Member member = optionalMember.get();

        if (!member.getMemberNickName().equals("admin")) {
            throw new RuntimeException();
        }

        board.setMember(member);
        boardRepository.save(board);
    }

    // 게시글 조회
    public Board selectBoardById(Integer boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (!optionalBoard.isPresent()){
            throw new RuntimeException();
        }
        Board board = optionalBoard.get();
        board.setBoardHit(board.getBoardHit() + 1);
        return board;
    }
    
    //게시글 삭제
    public void deleteBoard(Integer boardId, Integer memberId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (!optionalBoard.isPresent()){
            throw new RuntimeException();
        }
        Board board = optionalBoard.get();

        if (board.getMember().getMemberId().equals(memberId)) {
            boardRepository.deleteById(boardId);
        } else {
            throw new RuntimeException();
        }
    }

    // boardType에 맞는 모든 게시글 조회
    public List<Board> selectAllByBoardType(char boardType){
        return boardRepository.findByBoardType(boardType);
    }

    // boardType과 studyId에 맞는 모든 게시글 조회
    public List<Board> selectAllByBoardTypeAndStudyId(char boardType, Integer studyId){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if (!optionalStudy.isPresent()){
            throw new RuntimeException();
        }
        Study study = optionalStudy.get();
        return boardRepository.findByBoardTypeAndStudy(boardType, study);
    }

    public void updateBoard(Integer memberId, Board board) {
        Optional<Board> optionalBoard = boardRepository.findById(board.getBoardId());

        if (!optionalBoard.isPresent()){
            throw new RuntimeException();
        }
        Board modifyBoard = optionalBoard.get();

        if (modifyBoard.getMember().getMemberId().equals(memberId)) {
            modifyBoard.setBoardTitle(board.getBoardTitle());
            modifyBoard.setBoardContent(board.getBoardContent());
        } else {
            throw new RuntimeException();
        }
    }

    // 스터디 공지글 생성
    public void createStudyNotice(Integer memberId, Integer studyId, Board board) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if (optionalMember.isEmpty() || optionalStudy.isEmpty()){
            throw new RuntimeException();
        }
        Member member = optionalMember.get();
        Study study = optionalStudy.get();

        if (!member.getMemberNickName().equals(study.getStudyHost())) {
            throw new RuntimeException();
        }

        board.setMember(member);
        board.setStudy(study);
        boardRepository.save(board);
    }

    // 스터디 게시글 생성
    public void createStudyBoard(Integer memberId, Integer studyId, Board board) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if (optionalMember.isEmpty() || optionalStudy.isEmpty()){
            throw new RuntimeException();
        }
        Member member = optionalMember.get();
        Study study = optionalStudy.get();

        // 스터디 멤버일때만 글 쓸수 있어야 함
//        Optional<StudyMember> optionalStudyMember = studyMemberRepository.findByMemberIdAndStudyId(memberId, studyId);
//        if (optionalStudyMember.isEmpty()) {
//            throw new RuntimeException();
//        }

        board.setMember(member);
        board.setStudy(study);
        boardRepository.save(board);
    }

}

