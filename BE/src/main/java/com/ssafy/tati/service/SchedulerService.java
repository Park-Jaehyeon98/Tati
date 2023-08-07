package com.ssafy.tati.service;

import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.Point;
import com.ssafy.tati.entity.Study;
import com.ssafy.tati.entity.StudyMember;
import com.ssafy.tati.repository.StudyManageRepository;
import com.ssafy.tati.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SchedulerService {

    private final StudyManageRepository studyManageRepository;
    private final StudyManageService studyManageService;
    private final PointService pointService;

    @Scheduled(cron = "0 59 11 * * *")
    public void run(){

        //현재 시점 기점으로 완료된 스터디를 찾고, 보증금 정산이 안되어 있다면 벌금을 정산
        //스터디 종료시, 각자 자신이 돌려받을 보증금 ( 스터디의 신청보증금 - 진행스터디원의 벌금) 만큼 회원의 Point 적립
        //스터디 종료시, 스터디테이블의 총벌금을 출석률가 제일 좋은사람한테 point 적립
        //출석률 계산 > 진행스터디 회원의 결석횟수가 제일 적은 회원으로 지정 : 여러명이면 총 벌금 / 회원 명수

        LocalDate today = LocalDate.now();

        List<Study> endedStudyList = studyManageRepository.findEndedStudyList(today);
        for(Study study : endedStudyList){

            List<StudyMember> studyMemberList = study.getStudyMemberList();

            List<StudyMember> excellentMemberList = studyManageRepository.findExcellentMember();
            int excellentPoint = study.getTotalPenalty()/excellentMemberList.size();

            //각자 보증금 돌려받기
            Integer studyDeposit = study.getStudyDeposit();
            for(StudyMember studyMember : studyMemberList){

                Integer totalPenalty = studyMember.getStudyMemberPenalty();

                if(excellentMemberList.contains(studyMember)){
                    Point point = new Point(
                            0, "studyDeposit", LocalDateTime.now(), (studyDeposit+excellentPoint),
                            study.getStudyName()+ " 스터디 보증금 반환", studyMember.getMember()
                    );
                    pointService.save(point);

                } else {
                    Point point = new Point(
                            0, "studyDeposit", LocalDateTime.now(), (studyDeposit-totalPenalty),
                            study.getStudyName()+ " 스터디 보증금 반환", studyMember.getMember()
                    );
                    pointService.save(point);
                }
            }
        }


        //현재 시점 기점으로 스터디의 회원수가 0명인 스터디 delete하기
        List<Study> blankStudy = studyManageRepository.findBlankStudy();
        for(Study study : blankStudy){
            studyManageService.removeStudy(study.getStudyId());
        }
    }
}
