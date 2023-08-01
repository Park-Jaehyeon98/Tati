import React from "react";
import style from "./_Mypage.module.css"

import Aside from "../../Components/_MyPage/Aside";
import Schedule from "../../Components/_MyPage/Schedule";



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
