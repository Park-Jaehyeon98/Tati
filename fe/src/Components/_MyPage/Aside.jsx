import React from "react";
import "../_MyPage/Aside.css";

export default function Aside({ onButtonClick }) {
  return (
    <div id="box1">
      <div id="box4">
        유저정보
      </div>

      <p>김싸피</p>
      <p>마일리지 30000pt</p>
      <div id="bt">
        <button id="bt" onClick={() => onButtonClick("schedule")}>일정</button>
        <button id="bt"onClick={() => onButtonClick("StudyList")}>스터디목록</button>
        <button id="bt"onClick={() => onButtonClick("Point")}>마일리지</button>
        <button id="bt"onClick={() => onButtonClick("info")}>회원가입수정</button>
      </div>
    </div>
  );
}
