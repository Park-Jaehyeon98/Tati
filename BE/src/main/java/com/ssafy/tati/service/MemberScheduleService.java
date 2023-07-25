package com.ssafy.tati.service;

import com.ssafy.tati.entity.MemberSchedule;
import com.ssafy.tati.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MemberScheduleService {

    //repository 주입
    private final ScheduleRepository scheduleRepository;

    //일정 등록
    public void save(MemberSchedule schedule){
        scheduleRepository.save(schedule);
    }

    //일정 삭제
    public void delete(int memberScheduleId){
        scheduleRepository.deleteById(memberScheduleId);
    }

    //일정 조회(한 달 기준)
    public List<MemberSchedule> selectSchedule(int memberId){
        List<MemberSchedule> schedules = scheduleRepository.selectSchedule(memberId);

        for(MemberSchedule schedule : schedules) {
            if (!schedule.getMemberScheduleDate().substring(4, 6).equals(LocalDate.now().getMonth()))
                schedules.remove(schedule);
        }
        return schedules;
    }



}
