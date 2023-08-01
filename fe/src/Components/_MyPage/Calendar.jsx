import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import style from "./Calendar.module.css"


export default function Calendar(){
  
  return (
    <div>
      {/* 캘린더 */}
      <div className={style.calendar}>
        <FullCalendar
        defaultView="dayGridMomth"
        plugins={[dayGridPlugin]}
        events={[
          {title:'발표', date: '2023-07-28'},
          {title:'코드작성', date: '2023-07-25'},
          {title:'발표준비', date: '2023-07-26'},
        ]}
        />
      </div>

    </div>
  )
}