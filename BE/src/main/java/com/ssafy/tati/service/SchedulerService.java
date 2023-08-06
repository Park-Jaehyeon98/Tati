package com.ssafy.tati.service;

import com.ssafy.tati.entity.Study;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SchedulerService {

    private final StudyService studyService;

    @Scheduled(cron = "0 0 0 * * *")
    public void run(){
        //완료된 스터디를 찾고, 벌금을 정산한 후 db에서 삭제 >  게시판, 댓글 자동 삭제

        //모든 스터디를 조회하며 완료시간이 오늘인지 확인
        //완료 날짜가 String인지, Date인지 확인하기
        String today = LocalDate.now().toString();

        //총벌금 컬럼 없는데 추가 가능한가?
        List<Study> studyList = studyService.getStudyList();
        for(Study study : studyList){
            int totalDeposit = study.getStudyDeposit();

        }


    }
}
