import React from "react";
import style from "../Mypage.module.css"

import Aside from "../../../Components/MyPage/Aside";
import Schedule from "../../../Components/MyPage/Schedule/Schedule";



export default function MyPage() {

  return (
    <div className={style.myPage}>
      <Aside />
      <div className={style.box2}>
        <Schedule />
      </div>
    </div>
  );
}
