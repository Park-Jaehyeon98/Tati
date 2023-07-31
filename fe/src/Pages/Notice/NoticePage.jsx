import React from "react";
import style from './NoticePage.module.css'



export default function NoticePage(){

  // 공지사항들
  const NoticeItem=(notice)=>{
    return(
      <div>
        <div className={style.NoticeItem_text}>
          <p>{notice.text} <h6 className={style.text}>{notice.date}</h6></p>
          <hr />
        </div>
      </div>
    );
  };

  const notices = [
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
  ];

  return (
    <div className={style.Notice}>
        <div className={style.NoticePage_title_box}>
          <h1 className={style.NoticePage_title}>공지사항</h1>
        </div>

      <div className={style.NoticeItem_box}>
        <div className={style.box}>
        {notices.map((notice, index) => (
            <NoticeItem 
            key={index} 
            text={notice.text} 
            date={notice.date} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}


