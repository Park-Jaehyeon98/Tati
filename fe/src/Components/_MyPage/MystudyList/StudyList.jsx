import React from "react";
import { useNavigate } from "react-router-dom";
import style from './StudyList.module.css'

export default function StudyList() {
  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  return (
    <div className={style.point}>
      <nav className={style.point_nav_btn}>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/MyPagePoint")}>가입된스터디</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/PointWithdraw")}>신청한스터디</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/PointHistory")}>내 작성글</button>
      </nav>

      <div className={style.content}>
        <div>신청한스터디</div>
      </div>
    </div>
  )
}