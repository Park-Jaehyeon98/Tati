package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.PointReqDto;
import com.ssafy.tati.dto.res.PointResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostPointMapper {

    default Point pointReqDtoToPoint(Member member, PointReqDto pointReqDto){
        if(pointReqDto == null) return null;

        Point point = new Point();
        point.setPointId(0);
        point.setPointDate(pointReqDto.getPointDate());
        point.setAmount(pointReqDto.getAmount());
        point.setPContent(pointReqDto.getPContent());
        point.setMember(member);

        return point;
    }

    PointResDto pointToPointResDto(Point point);

    List<PointResDto> pointListToPointResDtoList(List<Point> pointList);
}
