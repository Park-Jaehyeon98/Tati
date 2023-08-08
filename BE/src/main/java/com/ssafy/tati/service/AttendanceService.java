package com.ssafy.tati.service;

import com.ssafy.tati.entity.*;
import com.ssafy.tati.repository.AttendanceRepository;
import com.ssafy.tati.repository.MemberRepository;
import com.ssafy.tati.repository.StudyMemberRepository;
import com.ssafy.tati.repository.StudyScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final MemberRepository memberRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final StudyScheduleRepository studyScheduleRepository;

    // 입실
    public Attendance addAttendance(Attendance attendance) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);
        Optional<Attendance> optionalAttendance = attendanceRepository.findByStudyMemberAndInTimeBetween(attendance.getStudyMember(), startOfDay, endOfDay);

        if (optionalAttendance.isEmpty()) { // 스터디 멤버 중 처음 입실했다면
            // 스터디 멤버 테이블에 있는 멤버들 모두 입/퇴실 시각 초기화
            List<StudyMember> studyMemberList = studyMemberRepository.findAllByStudyStudyId(attendance.getStudyMember().getStudy().getStudyId());
            Attendance createdAttendance = attendanceRepository.save(attendance);
            for (StudyMember studyMember : studyMemberList) {
                if (studyMember.equals(createdAttendance.getStudyMember()))
                    continue;

                Attendance initAttendance = new Attendance();
                initAttendance.setInTime(createdAttendance.getInTime());
                initAttendance.setOutTime(createdAttendance.getOutTime());
                initAttendance.setStudyMember(studyMember);
                initAttendance.setMember(studyMember.getMember());

                attendanceRepository.save(initAttendance);
            }
            return createdAttendance;

        } else { // 스터디 멤버 테이블의 입/퇴실 시간 갱신
            Attendance modifiedAttendance = optionalAttendance.get();
            modifiedAttendance.setInTime(attendance.getInTime());
            modifiedAttendance.setOutTime(attendance.getOutTime());

            return modifiedAttendance;
        }
    }

    // 퇴실
    public Attendance modifyAttendance(Attendance attendance, Integer memberId) {
        Optional<Attendance> optionalAttendance = attendanceRepository.findById(attendance.getAttendanceId());
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalAttendance.isEmpty() || optionalMember.isEmpty()) {
            throw new RuntimeException();
        }
        Attendance modifyAttendance = optionalAttendance.get();
        Member modifyMember = optionalMember.get();
        if (!modifyAttendance.getMember().equals(modifyMember)) {
            throw new RuntimeException();
        }

        modifyAttendance.setOutTime(attendance.getOutTime());
        StudyMember modifyStudyMember = modifyAttendance.getStudyMember();
        Study study = modifyStudyMember.getStudy();
        Integer studyDayNumber = modifyAttendance.getInTime().getDayOfWeek().getValue();

        Optional<StudySchedule> optionalStudySchedule = studyScheduleRepository.findByStudyAndStudyDay(study, Integer.toString(studyDayNumber));
        if (optionalStudySchedule.isEmpty()) {
            throw new RuntimeException();
        }
        StudySchedule studySchedule = optionalStudySchedule.get();
        LocalTime startTime = studySchedule.getStudyStartTime();
        LocalTime endTime = studySchedule.getStudyEndTime();
        LocalTime inTime = modifyAttendance.getInTime().toLocalTime();
        LocalTime outTime = modifyAttendance.getOutTime().toLocalTime();

        char attendanceStatus = '2';

        if (inTime.isAfter(startTime)) { // 시작 시각보다 늦게 들어오면
            attendanceStatus = '1'; // 지각
        }
        Long studyDuration = Duration.between(startTime, endTime).getSeconds();
        Long realStudyTime = Duration.between(inTime, outTime).getSeconds();

        if (studyDuration / 2 > realStudyTime) {
            attendanceStatus = '0'; // 결석
        }
        // 총 공부 시간
        modifyMember.setTotalStudyTime(modifyMember.getTotalStudyTime() + realStudyTime.intValue());

        if (attendanceStatus == '0') { // 결석
            // 출석 여부
            modifyAttendance.setIsAttended('0');
            // 상벌점
            modifyAttendance.setScore(-4);
            // 멤버 누적 상벌점
            Integer beforeScore = modifyMember.getTotalScore();
            modifyMember.setTotalScore(beforeScore - 4);
            Integer beforeAbsenceCount = modifyStudyMember.getAbsenceCount();
            modifyStudyMember.setAbsenceCount(beforeAbsenceCount + 2);
            // 벌금
            Integer pelaltyAmt = modifyStudyMember.getStudy().getStudyDeposit() / 3;
            modifyAttendance.setPenaltyAmt(pelaltyAmt.shortValue());
            modifyStudyMember.setStudyMemberPenalty(modifyMember.getTotalPoint() + pelaltyAmt);
        } else if (attendanceStatus == '1') { // 지각
            // 출석 여부
            modifyAttendance.setIsAttended('1');
            // 상벌점
            modifyAttendance.setScore(-2);
            // 멤버 누적 상벌점
            Integer beforeScore = modifyMember.getTotalScore();
            modifyMember.setTotalScore(beforeScore - 2);
            Integer beforeAbsenceCount = modifyStudyMember.getAbsenceCount();
            modifyStudyMember.setAbsenceCount(beforeAbsenceCount + 1);

            if (modifyStudyMember.getAbsenceCount() % 2 == 0) {
                Integer pelaltyAmt = modifyStudyMember.getStudy().getStudyDeposit() / 3;
                modifyAttendance.setPenaltyAmt(pelaltyAmt.shortValue());
                modifyStudyMember.setStudyMemberPenalty(modifyMember.getTotalPoint() + pelaltyAmt);
            }
        } else { // 출석
            // 출석 여부
            modifyAttendance.setIsAttended('2');
            // 상벌점
            modifyAttendance.setScore(1);
            // 멤버 누적 상벌점 (열정지수)
            Integer beforeScore = modifyMember.getTotalScore();
            modifyMember.setTotalScore(beforeScore + 1);
            Integer beforeAbsenceCount = modifyStudyMember.getAbsenceCount();
            modifyStudyMember.setAbsenceCount(beforeAbsenceCount + 1);
        }

        // AbsenceCount가 6이상이면 진행 스터디회원에서 삭제
        if (modifyStudyMember.getAbsenceCount() >= 6) {
            studyMemberRepository.delete(modifyStudyMember);
        }
        return modifyAttendance;
    }
}
