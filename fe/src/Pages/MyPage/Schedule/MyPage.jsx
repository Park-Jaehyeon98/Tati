import React from "react";
import style from "../Mypage.module.css"

import Aside from "../../../Components/MyPage/Aside";
import Schedule from "../../../Components/MyPage/Schedule/Schedule";
import MyPageHeader from "../../../Components/MyPage/header";


export default function MyPage() {

  return (
    <div className={style.MyPage}>
      <MyPageHeader />
      <div className={style.box2}>
        <Schedule />
      </div>
    </div>
  );
}
