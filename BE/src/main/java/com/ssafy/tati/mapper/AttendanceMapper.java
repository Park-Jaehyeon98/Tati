package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.req.AttendanceInReqDto;
import com.ssafy.tati.dto.req.AttendanceOutReqDto;
import com.ssafy.tati.dto.res.AttendanceInResDto;
import com.ssafy.tati.dto.res.AttendanceOutResDto;
import com.ssafy.tati.dto.res.AttendanceResDto;
import com.ssafy.tati.entity.Attendance;
import com.ssafy.tati.entity.Comment;
import com.ssafy.tati.entity.Member;
import com.ssafy.tati.entity.StudyMember;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    default Attendance attendanceInReqDtoToAttendance(AttendanceInReqDto attendanceInReqDto, StudyMember studyMember, Member member) {
        if(attendanceInReqDto == null || studyMember == null || member == null) return null;

        Attendance attendance = new Attendance();
        attendance.setInTime(attendanceInReqDto.getInTime());
        attendance.setOutTime(attendanceInReqDto.getInTime());
        attendance.setStudyMember(studyMember);
        attendance.setMember(member);

        return attendance;
    }


    AttendanceInResDto attendanceToAttendanceInResDto(Attendance attendance);

    Attendance attendanceOutReqDtoToAttendance(AttendanceOutReqDto attendanceOutReqDto);

    AttendanceOutResDto attendanceToAttendanceOutResDto(Attendance modifiedAttendance);
}
