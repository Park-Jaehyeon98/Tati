package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.PutCommentReqDto;
import com.ssafy.tati.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PutCommentMapper {
    Comment putCommentReqDtoToComment(PutCommentReqDto putCommentReqDto);
}
