package com.ssafy.tati.mapper.board;

import com.ssafy.tati.dto.req.board.PostBoardReqDto;
import com.ssafy.tati.dto.req.board.PostStudyBoardReqDto;
import com.ssafy.tati.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostBoardMapper {
    default Board postBoardReqDtoToBoard(char boardType, PostBoardReqDto postBoardReqDto) {
        if (postBoardReqDto == null) return null;

        Board board = new Board();
        board.setBoardType(boardType);
        board.setBoardTitle(postBoardReqDto.getBoardTitle());
        board.setBoardContent(postBoardReqDto.getBoardContent());
        board.setBoardHit(0);

        return board;
    }
    default Board postStudyBoardReqDtoToBoard(char boardType, PostStudyBoardReqDto postStudyBoardReqDto) {
        if (postStudyBoardReqDto == null) return null;

        Board board = new Board();
        board.setBoardType(boardType);
        board.setBoardTitle(postStudyBoardReqDto.getBoardTitle());
        board.setBoardContent(postStudyBoardReqDto.getBoardContent());
        board.setBoardHit(0);

        return board;
    }
}
