package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.CommentReqDto;
import com.ssafy.tati.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentReqDtoToComment(CommentReqDto commentReqDto) {
        if(commentReqDto == null) return null;

        Comment comment = new Comment();
        comment.setCommentContent(commentReqDto.getCommentContent());

        return comment;
    }
}
