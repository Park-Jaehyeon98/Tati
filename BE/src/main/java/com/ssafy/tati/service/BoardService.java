package com.ssafy.tati.service;

import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.repository.BoardRepository;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.StudyMemberRepository;
import com.ssafy.tati.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    // 관리자 게시글 (공지사항, FAQ) 등록
    public void addBoard(Integer memberId, Board board){
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

    // 스터디 공지글 등록
    public void addStudyNotice(Integer memberId, Integer studyId, Board board) {
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

    // 스터디 게시글 등록
    public void addStudyBoard(Integer memberId, Integer studyId, Board board) {
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

    // 게시글 단건 조회
    public Board findBoardByBoardId(Integer boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isEmpty()){
            throw new RuntimeException();
        }
        Board board = optionalBoard.get();
        board.setBoardHit(board.getBoardHit() + 1);
        return board;
    }

    // 게시글 단건 조회
    public Board findBoardByBoardIdAndBoardType(Integer boardId, char boardType){
        Optional<Board> optionalBoard = boardRepository.findByBoardIdAndBoardType(boardId, boardType);
        if (optionalBoard.isEmpty()){
            throw new RuntimeException();
        }
        Board board = optionalBoard.get();
        board.setBoardHit(board.getBoardHit() + 1);
        return board;
    }

    // boardType에 맞는 모든 게시글 조회
    public List<Board> findBoardByBoardType(char boardType){
        return boardRepository.findByBoardType(boardType);
    }

    public Page<Board> findBoardPageByBoardType(char boardType, Pageable pageable) {
        return boardRepository.findByBoardType(boardType, pageable);
    }

    // boardType과 studyId에 맞는 모든 게시글 조회
    public List<Board> findBoardByBoardTypeAndStudyId(char boardType, Integer studyId){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if (optionalStudy.isEmpty()){
            throw new RuntimeException();
        }
        Study study = optionalStudy.get();
        return boardRepository.findByBoardTypeAndStudy(boardType, study);
    }

    // boardType과 studyId에 맞는 모든 게시글 조회
    public Page<Board> findBoardPageByBoardTypeAndStudyId(char boardType, Integer studyId, Pageable pageable){
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        if (optionalStudy.isEmpty()){
            throw new RuntimeException();
        }
        Study study = optionalStudy.get();
        return boardRepository.findByBoardTypeAndStudy(boardType, study, pageable);
    }

    // 게시글 변경
    public void modifyBoard(Integer memberId, Board board) {
        Optional<Board> optionalBoard = boardRepository.findById(board.getBoardId());

        if (optionalBoard.isEmpty()){
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

    // 게시글 삭제
    public void removeBoard(Integer boardId, Integer memberId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);

        if (optionalBoard.isEmpty()){
            throw new RuntimeException();
        }
        Board board = optionalBoard.get();

        if (board.getMember().getMemberId().equals(memberId)) {
            boardRepository.deleteById(boardId);
        } else {
            throw new RuntimeException();
        }
    }

    public void saveStudyMainNotice(Integer memberId, Board board) {
        Optional<Board> optionalBoard = boardRepository.findById(board.getBoardId());

        if (optionalBoard.isEmpty()){
            throw new RuntimeException();
        }
        Board saveNoticeMainBoard = optionalBoard.get();
        if (!saveNoticeMainBoard.getMember().getMemberId().equals(memberId)) {
            throw new RuntimeException();
        }

        Optional<Board> existingNoticeMain = boardRepository.findByBoardTypeAndStudyAndMainNoticeYnTrue('1', saveNoticeMainBoard.getStudy());

        if (existingNoticeMain.isPresent()) { // 기존 대표 공지글이 있는 경우
            existingNoticeMain.get().setMainNoticeYn(false); // 기존 대표 공지글 false로 변경
        }

        saveNoticeMainBoard.setMainNoticeYn(true);
    }

    public void removeStudyMainNotice(Integer memberId, Board board) {
        Optional<Board> optionalBoard = boardRepository.findById(board.getBoardId());

        if (optionalBoard.isEmpty()){
            throw new RuntimeException();
        }
        Board removeNoticeMainBoard = optionalBoard.get();
        if (!removeNoticeMainBoard.getMember().getMemberId().equals(memberId)) {
            throw new RuntimeException();
        }

        removeNoticeMainBoard.setMainNoticeYn(false);
    }
}

