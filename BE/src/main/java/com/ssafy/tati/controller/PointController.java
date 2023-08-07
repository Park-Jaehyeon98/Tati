package com.ssafy.tati.controller;

import com.ssafy.tati.exception.PointException;
import com.ssafy.tati.dto.req.PointReqDto;
import com.ssafy.tati.dto.res.PointResDto;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import com.ssafy.tati.mapper.PostPointMapper;
import com.ssafy.tati.service.MemberService;
import com.ssafy.tati.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Tag(name = "포인트", description = "회원 포인트 API 문서")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class PointController {

    private final MemberService memberService;
    private final PointService pointService;
    private final PostPointMapper postPointMapper;

    @Operation(summary = "포인트 적립", description = "포인트 적립")
    @PostMapping("/point/accumulate")
    public ResponseEntity<?> makePoint(@RequestBody PointReqDto pointReqDto){
        Member member = memberService.findByEmail(pointReqDto.getEmail());

        Point point = postPointMapper.pointReqDtoToPoint(member, pointReqDto);
        pointService.save(point);

        List<Point> pointList = pointService.selectPoint(member.getMemberId());
        List<PointResDto> pointResDtoList = postPointMapper.pointListToPointResDtoList(pointList);

        return new ResponseEntity<>(pointResDtoList, HttpStatus.OK);
    }


    @Operation(summary = "포인트 인출", description = "포인트 인출")
    @PostMapping("/point/withdrawal")
    public ResponseEntity<?> withdrawalPoint(@RequestBody PointReqDto pointReqDto) throws PointException {
        Member member = memberService.findByEmail(pointReqDto.getEmail());

        if(member.getTotalPoint()<pointReqDto.getAmount())
            throw new PointException("현재 가진 금액보다 더 큰 금액을 인출할 수 없습니다.");

        Point point = postPointMapper.pointReqDtoToPoint(member, pointReqDto);
        pointService.delete(point);

        List<Point> pointList = pointService.selectPoint(member.getMemberId());
        List<PointResDto> pointResDtoList = postPointMapper.pointListToPointResDtoList(pointList);

        return new ResponseEntity<>(pointResDtoList, HttpStatus.OK);
    }

    //포인트 내역 조회
    @Operation(summary = "포인트 내역 조회", description = "마이페이지 접속하면 포인트 내역 반환")
    @GetMapping("mypage/point/{memberId}")
    public ResponseEntity<?> selectPoint(@PathVariable Integer memberId){
        List<Point> pointList = pointService.selectPoint(memberId);
        Member member = memberService.findById(memberId);

        //포인트 매퍼에서 resDto로 변환해서 반환
        List<PointResDto> pointResList = new ArrayList<>();
        for(Point point : pointList){
            pointResList.add(new PointResDto(
                point.getPointDate(), point.getTid(), point.getAmount(),
                    member.getTotalPoint(), point.getPContent()
            ));
        }

        return new ResponseEntity(pointResList, HttpStatus.OK);
    }

}
