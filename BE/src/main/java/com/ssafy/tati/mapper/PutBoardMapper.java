package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.PutBoardReqDto;
import com.ssafy.tati.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PutBoardMapper {

    Board putBoardReqDtoToBoard(PutBoardReqDto putBoardReqDto);
}
