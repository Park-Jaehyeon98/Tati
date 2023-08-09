import React, {useState, useEffect} from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import style from "./Calendar.module.css"

import axios from "axios";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import {addSchedule, removeSchedule, clearUserSchedule} from "../../../redux/reducers/userScheduleSlice";
import {addStudySchedule, removeStudySchedule, clearUserStudySchedule} from "../../../redux/reducers/userStudyScheduleSlice";
import { updateUse } from "../../../redux/reducers/userSlice"

// 리덕스 꺼내기
import { useSelector } from 'react-redux';
import { event } from "jquery";


// 스터디 일정도 등록


export default function Calendar(){

  const dispatch = useDispatch();

  // 현재 년, 월
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;



  const [totalScore,setTotalScore] = useState('')
  const [totalStudyTime,setTotalStudyTime] = useState('')
  const [todayStudyTime,setTodayStudyTime] = useState('')

  // 리덕스의 유저정보 와 일정 가져오기
  const userSchedule = useSelector(state => state.userSchedule);
  const user = useSelector(state => state.user.user);


  useEffect(() => {

    console.log('캘린더 memberId',user.memberId)
    console.log(`year---${year}///month---${month}`)


    axios.get(`${process.env.REACT_APP_URL}/member/mypage/${user.memberId}`, {
      params: {
        year,
        month
      }
    })
      .then((res) => {
        console.log(' 일정 요청 성공=================================')
        console.log(res);
        // console.log(res.data.scheduleList);

        const eventsToAdd = res.data.scheduleList.map((scheduleItem) => ({
          title: scheduleItem.memberScheduleTitle,
          content: scheduleItem.memberScheduleContent,
          date: scheduleItem.memberScheduleDate.slice(0, 10),
          scheduleId: scheduleItem.memberScheduleId,
        }));


        console.log(eventsToAdd)
        dispatch(clearUserSchedule());
        dispatch(addSchedule(eventsToAdd));
        


        setTotalScore(res.data.totalScore)
        setTotalStudyTime(res.data.todayStudyTime)
        setTodayStudyTime(res.data.totalStudyTime)
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'일정 요청 실패------------------');
      });

  },[])

  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };


  // 회원일정등록 =======================================================
  const handleModalSubmit = () => {

    if (!eventTitle || !eventTime) {
      alert("이벤트 제목과 일시를 입력해주세요.");
      return;
    }

    const selectedDateTime = new Date(`${selectedDate}T${eventTime}`);

    const postScheduleReqDto = {
      email:user.email,
      memberScheduleDate: selectedDateTime,
      memberScheduleContent: eventContent,
      memberScheduleTitle: eventTitle
    }
    console.log(postScheduleReqDto.memberScheduleDate)

    axios.post(`${process.env.REACT_APP_URL}/member/mypage/schedule`,postScheduleReqDto)
      .then((res) => {
        console.log(' 일정 추가 성공 =================================')

        console.log(res.data);

        const newEvent = {
          title: res.data.memberScheduleTitle,
          content:res.data.memberScheduleContent,
          data:res.data.memberScheduleDate.slice(0,10),
          scheduleId: res.data.memberScheduleId,
        };

        dispatch(addSchedule(newEvent))
      })
      .catch((err) => {
        console.log(err,' 일정 추가 실패 ------------------');
      });


    // 모달에서 입력한 이벤트 내용과 일시를 캘린더에 추가하는 로직을 작성합니다.
    const newEvent = {
      title: eventTitle,
      content:eventContent,
      start: new Date(selectedDate + "T" + eventTime).toISOString(),
      end: new Date(selectedDate + "T" + eventTime).toISOString(),
    };

    // 캘린더 이벤트 배열에 새 이벤트를 추가하고 모달을 닫습니다.
    setSelectedDate(null);
    setEventTitle('');
    setEventTime('');
    setEventContent('');
  };



  // 일정 삭제 =======================================================================
  const handleEventClick = (info) => {

    if (window.confirm("이 일정를 삭제하시겠습니까?")) {

      const scheduleId = Number(info.event._def.extendedProps.scheduleId)

      // 일정 삭제 요청===================================================

      axios.delete(`${process.env.REACT_APP_URL}/member/mypage/schedule/${scheduleId}`)
      .then((res) => {
        console.log('일정 삭제 성공시=================================')
        console.log(res.data);
        console.log('==============================')
        dispatch(removeSchedule(scheduleId))
      })
      .catch((err) => {
        console.log(err,' 일정 추가 ------------------');
      });
    }
  };
  // =========================================================================


  // 일정
  const events=[
    {title: '222', content: '222', date: '2023-08-09', scheduleId: 9},
    ...userSchedule
  ];


  //  월:1, 화:2, 수:3, 목:4, 금:5, 토:6, 일:0
  return (
    <div>
      {/* 캘린더 */}
      <div className={style.calendar}>
        <FullCalendar
          defaultView="dayGridMonth" 
          initialView={'dayGridMonth'}
          locale={"ko"}
          headerToolbar={
              {
                  start: 'today prev,next',
                  center: 'title',
                  end: 'dayGridMonth,timeGridWeek,timeGridDay' 
              }
          }
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          events={events}
          
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          />

          <div>
            <h1>{totalScore} - 열정지수</h1>
            <h1>{totalStudyTime} - 총 공부시간</h1>
            <h1>{todayStudyTime} - 오늘 공부 시간</h1>
          </div>

      </div>
          
      {selectedDate && (
        <div className={style.modal}>
          <div className={style.modal_content}>
            <h2>선택한 날짜: {selectedDate}</h2>
            <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="이벤트 제목" />
            <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
            <textarea value={eventContent} onChange={(e) => setEventContent(e.target.value)} id="" cols="30" rows="10"></textarea>
            <button onClick={handleModalSubmit}>추가</button>
            <button onClick={() => setSelectedDate(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  )
}