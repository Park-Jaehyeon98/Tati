package com.ssafy.tati.mapper;

import com.ssafy.tati.dto.res.AttendanceResDto;
import com.ssafy.tati.entity.Attendance;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {

    AttendanceResDto attendanceToAttendanceResDto(Attendance attendance);

    List<AttendanceResDto> attendanceListToAttendanceResDtoList(List<Attendance> attendance);

}
