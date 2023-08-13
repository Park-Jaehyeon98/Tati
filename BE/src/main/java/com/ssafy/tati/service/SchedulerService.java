package com.ssafy.tati.service;

import com.ssafy.tati.entity.*;
import com.ssafy.tati.repository.AttendanceRepository;
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
    private final AttendanceRepository attendanceRepository;
    private final AttendanceService attendanceService;

    @Scheduled(cron = "59 59 11 * * *")
    public void run() {

        LocalDate today = LocalDate.now();

        List<Study> endedStudyList = studyManageRepository.findEndedStudyList(today);
        for (Study study : endedStudyList) {

            List<StudyMember> studyMemberList = study.getStudyMemberList();

            List<StudyMember> excellentMemberList = studyManageRepository.findExcellentMember();
            int excellentPoint = study.getTotalPenalty() / excellentMemberList.size();

            //각자 보증금 돌려받기
            Integer studyDeposit = study.getStudyDeposit();
            for (StudyMember studyMember : studyMemberList) {

                Integer totalPenalty = studyMember.getStudyMemberPenalty();

                if (excellentMemberList.contains(studyMember)) {
                    Point point = new Point(
                            0, "studyDeposit", LocalDateTime.now(), (studyDeposit + excellentPoint),
                            study.getStudyName() + " 스터디 보증금 반환", studyMember.getMember()
                    );
                    pointService.save(point);

                } else {
                    Point point = new Point(
                            0, "studyDeposit", LocalDateTime.now(), (studyDeposit - totalPenalty),
                            study.getStudyName() + " 스터디 보증금 반환", studyMember.getMember()
                    );
                    pointService.save(point);
                }
            }
        }


        //현재 시점 기점으로 스터디의 회원수가 0명인 스터디 delete하기
        List<Study> blankStudy = studyManageRepository.findBlankStudy();
        for (Study study : blankStudy) {
            studyManageService.removeStudy(study.getStudyId());
        }

        // 입퇴실 기록 없는 경우(같은 시각으로 초기화 된 상태) 출결 처리
        List<Attendance> attendanceList = attendanceRepository.findAllByIsAttendedIsNull();
        for (Attendance attendance : attendanceList) {
            attendanceService.modifyAttendance(attendance, attendance.getMember().getMemberId());
        }
    }
}
