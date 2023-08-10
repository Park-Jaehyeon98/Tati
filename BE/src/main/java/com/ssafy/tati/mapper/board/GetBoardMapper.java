package com.ssafy.tati.mapper.board;

import com.ssafy.tati.dto.res.board.BoardDetailResDto;
import com.ssafy.tati.dto.res.board.StudyBoardDetailResDto;
import com.ssafy.tati.dto.res.board.StudyNoticeDetailResDto;
import com.ssafy.tati.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GetBoardMapper {

    default BoardDetailResDto boardToBoardDetailResDto(Board board) {
        if (board == null) return null;

        BoardDetailResDto boardDetailResDto = new BoardDetailResDto();
        boardDetailResDto.setBoardId(board.getBoardId());
        boardDetailResDto.setBoardTitle(board.getBoardTitle());
        boardDetailResDto.setBoardContent(board.getBoardContent());
        boardDetailResDto.setMemberId(board.getMember().getMemberId());
        boardDetailResDto.setMemberNickname(board.getMember().getMemberNickName());
        boardDetailResDto.setBoardHit(board.getBoardHit());


        String create = board.getCreatedDate().toLocalDate().toString();
        String modify = board.getModifiedDate().toLocalDate().toString();

        boardDetailResDto.setCreatedDate(create);
        boardDetailResDto.setModifiedDate(modify);

        return boardDetailResDto;
    }

    default StudyBoardDetailResDto boardToStudyBoardDetailResDto(Board board) {
        if (board == null) return null;
        StudyBoardDetailResDto studyBoardDetailResDto = new StudyBoardDetailResDto();
        studyBoardDetailResDto.setBoardId(board.getBoardId());
        studyBoardDetailResDto.setBoardTitle(board.getBoardTitle());
        studyBoardDetailResDto.setBoardContent(board.getBoardContent());
        studyBoardDetailResDto.setBoardContent(board.getBoardContent());
        studyBoardDetailResDto.setMemberId(board.getMember().getMemberId());
        studyBoardDetailResDto.setMemberNickname(board.getMember().getMemberNickName());
        studyBoardDetailResDto.setBoardHit(board.getBoardHit());

        String create = board.getCreatedDate().toLocalDate().toString();
        String modify = board.getModifiedDate().toLocalDate().toString();

        studyBoardDetailResDto.setCreatedDate(create);
        studyBoardDetailResDto.setModifiedDate(modify);
        studyBoardDetailResDto.setCommentCount(board.getCommentList().size());

        studyBoardDetailResDto.setBoardFile(board.getBoardFile());
        String fileName = board.getBoardFile();
        int lastIndexOfSlash = fileName.lastIndexOf("_") + 1;
        String originalFileName = fileName.substring(lastIndexOfSlash);
        studyBoardDetailResDto.setBoardFileName(originalFileName);

        return studyBoardDetailResDto;
    }

    StudyNoticeDetailResDto boardToStudyNoticeDetailResDto(Board board);
}