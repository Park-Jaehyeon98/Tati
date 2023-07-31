package com.ssafy.tati.service;

import com.ssafy.tati.Exception.DataNotFoundException;
import com.ssafy.tati.entity.MemberSchedule;
import com.ssafy.tati.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberScheduleService {

    //repository 주입
    private final ScheduleRepository scheduleRepository;

    //일정 등록
    public void save(MemberSchedule schedule){
        scheduleRepository.save(schedule);
    }

    //일정 삭제
    public void delete(Integer memberScheduleId) {
        Optional<MemberSchedule> optionalSchedule = scheduleRepository.findById(memberScheduleId);
        if(!optionalSchedule.isPresent()) { throw new DataNotFoundException("일정이 없습니다."); }
        else scheduleRepository.deleteById(memberScheduleId);
    }

    //일정 조회(한 달 기준)
    public List<MemberSchedule> findSchedules(String email, int month){
        List<MemberSchedule> schedules = scheduleRepository.selectSchedule(email);

        List<MemberSchedule> scheduleList = new ArrayList<>();
        for(MemberSchedule schedule : schedules ){
            int m = Integer.parseInt(schedule.getMemberScheduleDate().substring(2, 4));
            if(m == month) scheduleList.add(schedule);
        }

        return scheduleList;
    }


    //일정 식별번호로 조회
    public MemberSchedule findById(Integer scheduleId) {
        Optional<MemberSchedule> optionalSchedule = scheduleRepository.findById(scheduleId);
        if(!optionalSchedule.isPresent()) throw new DataNotFoundException("일정이 없습니다.");
        else return optionalSchedule.get();
    }


}
