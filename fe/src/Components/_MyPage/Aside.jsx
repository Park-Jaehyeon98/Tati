import React from "react";

import style from "./Aside.module.css"


export default function Aside({ onButtonClick }) {

  return (
    <div className={style.box1}>
      <div className={style.box4}>
        <img className={style.box4} src="https://images.squarespace-cdn.com/content/v1/5dec67bb31a1cc1ad78a7326/1602465793445-KHV22QMIC8VPDWDFKE4D/0b2f8a51314ab1ebe0505aee843a33b1.jpg" alt="" />
      </div>

      <div className={style.name_point}>
        <p>김싸피</p>
        <p>마일리지 30000pt</p>
      </div>
      <div>
        <button className={style.bt} onClick={() => onButtonClick("schedule")} >일정</button>
        <button className={style.bt} onClick={() => onButtonClick("StudyList")}>스터디목록</button>
        <button className={style.bt} onClick={() => onButtonClick("Point")}>마일리지</button>
        <button className={style.bt} onClick={() => onButtonClick("AuthModal")}>회원정보수정</button>
      </div>
    </div>
  );
}
