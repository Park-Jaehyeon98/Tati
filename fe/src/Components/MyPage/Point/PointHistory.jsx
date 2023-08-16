import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Charge from "./Charge";
import Withdraw from "./Withdraw";
import KakaoPay from "./KakaoPay";
import style from "./Point.module.css"

export default function PointHistory() {

  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  return (
    <div className={style.point}>

      <div className={style.point_box}>

        <nav className={style.point_nav_btn}>
          <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/MyPagePoint")}>충전</button>
          <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/PointWithdraw")}>인출</button>
          <button className={`${style.nav_blue} ${style.nav_btn}`} onClick={() => handleButtonClick("/MyPage/PointHistory")}>내역</button>
        </nav>

        <div className={style.content}>
        <KakaoPay />
        </div>
      </div>
    </div>
  );
}
