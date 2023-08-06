package com.ssafy.tati.mapper.board;

import com.ssafy.tati.dto.req.board.NoticeMainReqDto;
import com.ssafy.tati.entity.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoticeMainMapper {
    Board noticeMainReqDtoToBoard(NoticeMainReqDto noticeMainReqDto);
}
