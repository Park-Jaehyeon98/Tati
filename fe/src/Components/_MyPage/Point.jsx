<<<<<<< HEAD
import React from "react";

export default function Point(){
  return(
    <div>마일리지</div>
  )
}
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Charge from "./Charge";
import Withdraw from "./Withdraw";

import style from "./Point.module.css"

export default function Point() {

  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  return (
    <div className={style.point}>
      <nav className={style.point_nav_btn}>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/MyPagePoint")}>충전</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/PointWithdraw")}>인출</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/PointHistory")}>내역</button>
      </nav>

      <div className={style.content}>
       <Charge />
      </div>
    </div>
  );
}
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
