package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.BoardReqDto;
import com.ssafy.tati.dto.res.NoticeResDto;
import com.ssafy.tati.entity.Board;
import com.ssafy.tati.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    default Board boardReqDtoToBoard(char boardType, BoardReqDto boardReqDto){
        if(boardReqDto == null) return null;

        Board board = new Board();
        board.setBoardType(boardType);
        board.setBoardTitle(boardReqDto.getBoardTitle());
        board.setBoardContent(boardReqDto.getBoardContent());
        board.setBoardHit(0);

        return board;
    }

    default NoticeResDto boardToNoticeResDto(Board board) {
        if (board == null) return null;

        NoticeResDto noticeResDto = new NoticeResDto();
        noticeResDto.setBoardId(board.getBoardId());
        noticeResDto.setBoardTitle(board.getBoardTitle());
        noticeResDto.setBoardContent(board.getBoardContent());
        noticeResDto.setMemberId(board.getMember().getMemberId());
        noticeResDto.setMemberNickname(board.getMember().getMemberNickName());
        noticeResDto.setBoardHit(board.getBoardHit());
        noticeResDto.setCreatedDate(board.getCreatedDate());
        noticeResDto.setModifiedDate(board.getModifiedDate());

        return noticeResDto;
    }

    List<NoticeResDto> boardListToNoticeResDtoList(List<Board> boardList);

}
