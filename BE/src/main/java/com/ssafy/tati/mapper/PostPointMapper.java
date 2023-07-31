package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.PointReqDto;
import com.ssafy.tati.dto.res.PointResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PointMapper {

    default Point pointReqDtoPoint(PointReqDto pointReqDto){
        if(pointReqDto == null) return null;

        Point point = new Point();
        point.setPointId(0);
        point.setPointDate(pointReqDto.getPointDate());
        point.setAmount(pointReqDto.getAmount());
        point.setP_content("포인트 적립");
        point.setMember(new Member());

        return point;
    }

    PointResDto pointToPointResDto(Point point);
}
