import React from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';

import style from "./Calendar.module.css"


export default function Calendar(){
  
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
                  start: 'today ,prev,next',
                  center: 'title',
                  end: 'dayGridMonth,timeGridWeek,timeGridDay' 
              }
          }
          plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
          events={[
            { title: '발표', date: '2023-07-28' },
            { title: '코드작성', date: '2023-07-25' },
            { title: '발표준비', date: '2023-07-26' },
          ]}
        />
      </div>

    </div>
  )
}