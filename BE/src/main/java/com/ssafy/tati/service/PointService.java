package com.ssafy.tati.service;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.PointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;
    private final MemberRepository memberRepository;

    //포인트 적립
    public void save(Point point){

        pointRepository.save(point);

        Member member = point.getMember();
        int totalPoint = member.getTotalPoint() + point.getAmount();

        member.updateTotalPoint(totalPoint);
    }

    //포인트 인출
    public void delete(Point point){

        pointRepository.save(point);

        Member member = point.getMember();
        int totalPoint = member.getTotalPoint() - point.getAmount();

        member.updateTotalPoint(totalPoint);
    }

    //포인트 내역
    public List<Point> selectPoint(Integer memberId){
        return pointRepository.selectPoint(memberId);
    }
}
