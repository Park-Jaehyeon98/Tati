package com.ssafy.tati.service;

import com.ssafy.tati.entity.Point;
import com.ssafy.tati.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;

    //포인트 적립
    public void save(Point point){
        pointRepository.save(point);
    }

    //포인트 인출
    public void delete(int pointId){
        pointRepository.deleteById(pointId);
    }

    //포인트 내역
    public List<Point> selectPoint(int memberId){
        return pointRepository.selectPoint(memberId);
    }
}
