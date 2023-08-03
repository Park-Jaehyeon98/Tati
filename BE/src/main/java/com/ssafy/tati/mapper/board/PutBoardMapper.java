package com.ssafy.tati.mapper.board;

import com.ssafy.tati.dto.req.board.PutBoardReqDto;
import com.ssafy.tati.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PutBoardMapper {

    Board putBoardReqDtoToBoard(PutBoardReqDto putBoardReqDto);
}
