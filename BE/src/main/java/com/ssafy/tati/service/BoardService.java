package com.ssafy.tati.service;

import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.repository.BoardRepository;
import com.ssafy.tati.repository.MemberRepository;
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

    // 게시글 등록
    public void save(Board board){
        boardRepository.save(board);
    }

    // 게시글 조회
    public Board findById(Integer boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        System.out.println(optionalBoard.get().getMember().getMemberId());
        System.out.println(optionalBoard.get().getMember().getMemberNickName());
        System.out.println("#############################");
        optionalBoard.get().setBoardHit(optionalBoard.get().getBoardHit() + 1);
//        if (!optionalBoard.isEmpty()) {
//            Integer authorId = optionalBoard.get().getMember();
//        }
//        memberRepository.findById();
        return optionalBoard.get();
    }
    
    //게시글 삭제
    public void delete(Integer boardId) {
        boardRepository.deleteById(boardId);
    }

    // boardType에 맞는 모든 게시글 조회
    public List<Board> selectAllByBoardType(char boardType){
        return boardRepository.findByBoardType(boardType);
    }
}

