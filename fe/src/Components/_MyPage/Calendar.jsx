import React, {useState, useEffect} from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import style from "./Calendar.module.css"

import { useSelector, useDispatch } from "react-redux";
import {addEvent} from "../../redux/actions/actions"
import axios from "axios";


export default function Calendar(){

  // 현재 년, 월
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // const events = useSelector((state) => state.events);

  const dispatch = useDispatch();

  const memberId = localStorage.getItem('memberId');
  const email = localStorage.getItem('email');

  const [img,setImg] = useState(null)

  const [events,setEvents] = useState([])

  useEffect(() => {

    console.log('events ===========================')
    console.log(events)
    console.log('===========================')

    console.log('캘린더',memberId)
    console.log(`year---${year}///month---${month}`)

    console.log(process.env.REACT_APP_URL)

    axios.get(`${process.env.REACT_APP_URL}/member/mypage/${1}`, {
      params: {
        year,
        month
      }
    })
      .then((res) => {
        console.log(' 일정 요청 성공=================================')
        console.log(res.data.scheduleList);

        const eventsToAdd = res.data.scheduleList.map((scheduleItem) => ({
          title: scheduleItem.memberScheduleTitle,
          content: scheduleItem.memberScheduleContent,
          date: scheduleItem.memberScheduleDate.slice(0, 10),
          scheduleId: scheduleItem.memberScheduleId,
        }));

        // const events = eventsToAdd
        setEvents(eventsToAdd);

        console.log(eventsToAdd[0])
        // eventsToAdd 배열을 리덕스 스토어에 추가
        // for (const event of eventsToAdd) {
        //   console.log(event)
        //   dispatch(addEvent(event));
        // }

        setImg(res.data.img)
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'일정 요청 실패------------------');
      });

  }, [])

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

    const postScheduleReqDto = {
      email,
      memberScheduleDate: new Date(),
      memberScheduleContent: eventContent,
      memberScheduleTitle: eventTitle
    }

    axios.post(`${process.env.REACT_APP_URL}/member/mypage/schedule`,
    postScheduleReqDto 
    )
      .then((res) => {
        console.log(' 일정 추가 성공 =================================')
        console.log(res.data);
        const newEvent = {
          title: res.data.memberScheduleTitle,
          content:res.data.memberScheduleContent,
          data:res.data.memberScheduleDate.slice(0,10),
          scheduleId: res.data.memberScheduleId,
        };

        console.log(newEvent)
        dispatch(addEvent(newEvent));
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,' 일정 추가 실패 ------------------');
      });

      //postScheduleReqDto{ email - String, memberScheduleDate- String(20230726), memberScheduleContent- String, memberScheduleTitle- String}

    // 모달에서 입력한 이벤트 내용과 일시를 캘린더에 추가하는 로직을 작성합니다.
    const newEvent = {
      title: eventTitle,
      content:eventContent,
      start: new Date(selectedDate + "T" + eventTime).toISOString(),
      end: new Date(selectedDate + "T" + eventTime).toISOString(),
    };

    console.log(newEvent)
    // 캘린더 이벤트 배열에 새 이벤트를 추가하고 모달을 닫습니다.
    // dispatch(addEvent(newEvent));
    setSelectedDate(null);
    setEventTitle('');
    setEventTime('');
    setEventContent('');
  };


  // 일정 삭제 =======================================================================
  const handleEventClick = (info) => {

    console.log(info.event._def.extendedProps, 'info----------')
    const event = info.event._def.extendedProps

    if (window.confirm("이 일정를 삭제하시겠습니까?")) {
      const filteredEvents = events.filter((event) => event.title !== info.event.title);

      const scheduleId = Number(info.event._def.extendedProps.scheduleId)

      console.log('일정id===============================')
      console.log(scheduleId)
      console.log('일정id===============================')

      // 일정 삭제 요청===================================================

      axios.delete(`${process.env.REACT_APP_URL}/member/mypage/schedule/${scheduleId}`)
      .then((res) => {
        console.log('일정 삭제 성공시=================================')
        console.log(res.data);
        console.log('==============================')
        window.location.reload();
      })
      .catch((err) => {
        console.log(err,' 일정 추가 ------------------');
      });

      // ============================================================

    }
  };


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
          events={[
            { title: '일정 기능 완성', date: '2023-08-03' },
            { title: 'webRTC 구현', start: '2023-08-04', end : "2023-08-06",color : "#FF0000" ,},
            { title: 'webRTC 적용', start: '2023-08-06', end : "2023-08-09", backgroundColor : "#008000" },
            { title: '기능 체크', start: '2023-08-07', end : "2023-08-10" },
            { title: '추가 기능 구현 및 디버깅', start: '2023-08-09', end : "2023-08-12" },
            { title: '추가 기능 구현', start: '2023-08-11', end : "2023-08-14", color : "#0000FF" },
            { title: 'UCC 및 발표 준비', color : "#FFCCE5"  , start: '2023-08-14', end : "2023-08-18", rendering : "background" },
            { title: '발표', date: '2023-08-18'},
            ...events
          ]}
 
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          // firstDay={3}
        />
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
      <img src={img} alt="Uploaded" className={style.file_img}/>
    </div>
  )
}