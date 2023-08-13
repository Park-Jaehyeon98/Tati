import React, {useState, useEffect} from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import listPlugin from "@fullcalendar/list";
import style from "./Calendar.module.css"

import axios from "axios";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import {addSchedule, updateSchedule,removeSchedule, clearUserSchedule} from "../../../redux/reducers/userScheduleSlice";
import {addStudySchedule, removeStudySchedule, clearUserStudySchedule} from "../../../redux/reducers/userStudyScheduleSlice";
import { updateUser } from "../../../redux/reducers/userSlice"

// 리덕스 꺼내기
import { useSelector } from 'react-redux';

import { event } from "jquery";


export default function Calendar(){

  const dispatch = useDispatch();
  

  // 현재 년, 월
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;


  const [studyData , setStudyData ] = useState([]);
  // const studyData = []
  const [selectedColor, setSelectedColor] = useState('');
  const [col, setCol] = useState()
  const [eventColor, seteventColor] = useState({})
  const colors = [
    'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan'
  ];


  // 리덕스의 유저정보 와 일정 가져오기
  const userSchedule = useSelector(state => state.user.userSchedule);
  const user = useSelector(state => state.user.user);


  // 사용자의 시간대 출력
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  useEffect(() => {

    console.log(userTimeZone); 
    console.log(studyData); 
    console.log('캘린더 memberId',user.memberId)
    console.log(`year---${year}///month---${month}`)

    loadData()
    },[]);


  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [eventTime, setEventTime] = useState('');


  const [showConfirmation, setShowConfirmation] = useState(false);

  
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };



  // 일정 불러오기 =========================================================================
  const loadData = () => {
    // 여기에 데이터를 다시 불러오는 로직을 작성합니다.
    axios
      .get(`${process.env.REACT_APP_URL}/member/mypage/${user.memberId}`, {
        params: {
          year,
          month
        }
      })
      .then((res) => {
        console.log("일정 요청 성공=================================");
        console.log(res);
        console.log(res.data.studyScheduleList);

        
        //스터디 일정
        res.data.studyScheduleList.forEach(schedule => {
          console.log(schedule.studyScheduleList)
          const targetDays = [0, 2]; // 일요일과 수요일
          const startDate = new Date(schedule.studyStartDate);
          const endDate = new Date(schedule.studyEndDate);
        
          // 보정된 시간대로 일정 생성
          const currentDate = new Date(startDate);
          while (currentDate <= endDate) {
            if (targetDays.includes(currentDate.getUTCDay())) {
              const eventStart = new Date(currentDate);
              eventStart.setUTCHours(19, 0); // 19시 0분
              const eventEnd = new Date(currentDate);
              eventEnd.setUTCHours(20, 0); // 20시 0분
        
              const studyEvent = {
                title: schedule.studyName,
                start: eventStart,
                end: eventEnd,
              };
        
              studyData.push(studyEvent);
            }
        
            // 다음 날짜로 이동
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
          }
        });



        dispatch(updateUser({img:res.data.img}));


        const eventsToAdd = res.data.scheduleList.map((scheduleItem) => ({
          title: scheduleItem.memberScheduleTitle,
          date: scheduleItem.memberScheduleDate.slice(0, 10),
          scheduleId: scheduleItem.memberScheduleId,
          extendedProps: {
            content: scheduleItem.memberScheduleContent,
          },
          color:'null'
        }));

        // 할 일
        dispatch(clearUserSchedule());
        eventsToAdd.forEach((event) => {
          dispatch(addSchedule(event));
        });

        // 내 열정지수, 공부 시간
        dispatch(updateUser({
          totalScore:res.data.totalScore,
          todayStudyTime:res.data.todayStudyTime,
          totalStudyTime:res.data.totalStudyTime
        }))

        console.log("==============================");
      })
      .catch((err) => {
        console.log(err, "일정 요청 실패------------------");
      });
    };

  //=========================================================================



  // 회원일정등록 =======================================================
  const handleModalSubmit = () => {

    
    
    if (!eventTitle || !eventTime) {
      alert("이벤트 제목과 일시를 입력해주세요.");
      return;
    }
    
    
    const selectedDateTime = new Date(`${selectedDate}T${eventTime}`);
    
    console.log(selectedDateTime,'-----------------')

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
          data:res.data.memberScheduleDate.slice(0,10),
          scheduleId: res.data.memberScheduleId,
          extendedProps: {
            content: res.data.memberScheduleContent,
          },
          color:'null'
        };

        dispatch(addSchedule(newEvent))
        loadData()
      })
      .catch((err) => {
        console.log(err,' 일정 추가 실패 ------------------');
      });

    // 캘린더 이벤트 배열에 새 이벤트를 추가하고 모달을 닫습니다.
    setSelectedDate(null);
    setEventTitle('');
    setEventTime('');
    setEventContent('');
  };



  // 일정 삭제 =======================================================================
  const handleConfirmDelete = () => {
    const scheduleId = selectedEvent.extendedProps.scheduleId;

    axios
      .delete(`${process.env.REACT_APP_URL}/member/mypage/schedule/${scheduleId}`)
      .then((res) => {
        console.log("일정 삭제 성공시=================================");
        console.log(res.data);
        console.log("==============================");
        dispatch(removeSchedule(scheduleId));
        loadData();
        setSelectedEvent(null);
      })
      .catch((err) => {
        console.log(err, "일정 추가 ------------------");
      });

    setShowConfirmation(false); // Close the confirmation dialog
  };
  // =========================================================================



  // 일정 수정 ===========================================================================
  const handleEventDrop = (info) => {

    const scheduleId = Number(info.event._def.extendedProps.scheduleId);
    const updatedDate = info.event.start.toISOString();

    axios
      .put(`${process.env.REACT_APP_URL}/member/mypage/schedule/${scheduleId}`, {
        memberScheduleDate: updatedDate,
      })
      .then((res) => {
        console.log("일정 변경 성공 ==============================");
        console.log(res.data);
        console.log("=========================================");
        loadData();
      })
      .catch((err) => {
        console.log(err, "일정 변경 실패 -----------------------");
      });
  };
  //==========================================================================================


  
  const handleEventClick = (info) => {
    console.log('handleEventClick',info.event._def)
    setSelectedEvent(info.event._def);

    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${(now.getMonth() + 1)}`
    
    console.log(formattedNow)
    const event = {
      title: info.event._def.title,
      data:formattedNow,
      scheduleId: info.event._def.sourceId,
      extendedProps: {
        content: info.event._def.extendedProps,
      },
      color:col,
    }
    seteventColor(event)
    setShowConfirmation(true); // Open the confirmation dialog
  };



  const [selectedEvent, setSelectedEvent] = useState(null); 


  // 일정 클릭시 모달 열기===================================================================
  const handleCancelDelete = (info) => {
    setSelectedEvent(null);
    setShowConfirmation(false); // Close the confirmation dialog
  };
  //========================================================================================


  //
  const handleColor = ()=>{
    console.log(eventColor)
    updateSchedule(eventColor)
    setShowConfirmation(false);
  };


  // 색상변경
  const handleColorChange=(color)=>{
    console.log(color)
    setCol(color)
  };


  // 일정
  const events=[
    
    ...userSchedule,
    ...studyData
  ];


  //  월:1, 화:2, 수:3, 목:4, 금:5, 토:6, 일:0
  return (
    <div>
      {/* 캘린더 */}
      <div className={style.Calendar_box}>
        <div className={style.Calendar_box_box}>
      <div className={style.calendar}>
        <FullCalendar
          timeZone = {userTimeZone}
          defaultView="dayGridMonth" 
          editable = {true} // 수정 가능
          resourceAreaHeaderContent="Rooms"
          initialView={'dayGridMonth'}
          locale={"ko"}
          views={{ listWeek: { type: "listWeek", buttonText: "주간 목록" } }}
          headerToolbar={
              {
                  start: 'today prev,next',
                  center: 'title',
                  end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' 
              }
          }
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin]}
          events={events}
          resources = {events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          />
      </div>
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


      {showConfirmation && (
        <div className={style.confirmation_modal}>
          <div className={style.confirmation_modal_content}>
            <p>이 일정를 삭제하시겠습니까?</p>

            <div className={style.color_palette}>
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`${style.color_button} ${selectedColor === color ? style.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={()=>handleColorChange(color)}
                ></button>
              ))}
            </div>
            
            <div className={style.confirmation_buttons}>

              <button className={style.confirm_button} onClick={handleColor}>
                색상변경
              </button>
              <button className={style.confirm_button} onClick={handleConfirmDelete}>
                확인
              </button>
              <button className={style.cancel_button} onClick={handleCancelDelete}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}