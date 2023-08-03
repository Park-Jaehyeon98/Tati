package com.ssafy.tati.mapper.board;

import com.ssafy.tati.dto.req.board.PutCommentReqDto;
import com.ssafy.tati.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PutCommentMapper {
    Comment putCommentReqDtoToComment(PutCommentReqDto putCommentReqDto);
}
