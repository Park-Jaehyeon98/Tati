import React, {useState, useEffect} from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import style from "./Calendar.module.css"

import { useSelector, useDispatch } from "react-redux";
import {addEvent} from "../../redux/actions/actions"

export default function Calendar(){

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('캘린더')
  })

  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    // 모달 열기 로직 등을 추가하시면 됩니다.
  };

  const handleModalSubmit = () => {
    // 모달에서 입력한 이벤트 내용과 일시를 캘린더에 추가하는 로직을 작성합니다.
    const newEvent = {
      title: eventTitle,
      start: new Date(selectedDate + "T" + eventTime).toISOString(),
      end: new Date(selectedDate + "T" + eventTime).toISOString(),
    };
    // 캘린더 이벤트 배열에 새 이벤트를 추가하고 모달을 닫습니다.
    dispatch(addEvent(newEvent));
    setSelectedDate(null);
    setEventTitle('');
    setEventTime('');
  };

  const handleEventClick = (info) => {
    if (window.confirm("이 이벤트를 삭제하시겠습니까?")) {
      const filteredEvents = events.filter((event) => event.title !== info.event.title);
    }
  };

  return (
    <div>
      {/* 캘린더 */}
      <div className={style.calendar}>
        <FullCalendar
          defaultView="dayGridMonth" // 오타 수정
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
          // events={[
          //   { title: '일정 기능 완성', date: '2023-08-03' },
          //   { title: 'webRTC 구현', start: '2023-08-04', end : "2023-08-06",color : "#FF0000" },
          //   { title: 'webRTC 적용', start: '2023-08-06', end : "2023-08-09", backgroundColor : "#008000" },
          //   { title: '기능 체크', start: '2023-08-07', end : "2023-08-10" },
          //   { title: '추가 기능 구현 및 디버깅', start: '2023-08-09', end : "2023-08-12" },
          //   { title: '추가 기능 구현', start: '2023-08-11', end : "2023-08-14", color : "#0000FF" },
          //   { title: 'UCC 및 발표 준비', color : "#FFCCE5"  , start: '2023-08-14', end : "2023-08-18", rendering : "background"  },
          //   { title: '발표', date: '2023-08-18'},
          // ]}
          events={events} 
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>

      {selectedDate && (
        <div className="modal">
          <div className="modal-content">
            <h2>선택한 날짜: {selectedDate}</h2>
            <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="이벤트 제목" />
            <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
            <button onClick={handleModalSubmit}>추가</button>
            <button onClick={() => setSelectedDate(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  )
}