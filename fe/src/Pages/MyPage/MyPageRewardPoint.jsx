import React from "react";
import Aside from "../../Components/MyPage/Aside";
import RewardPoint from "../../Components/MyPage/RewardPoint/RewardPoint";
import style from "./Mypage.module.css"
import MyPageHeader from "../../Components/MyPage/header";

import MyPageBtn from "../../Components/MyPage/MyPageBtn";
export default function MyPageRewardPoint(){
  return(
    <div className={style.MyPage}>
      <div className={style.RewardPoint}>

        <MyPageHeader />  
      </div>
      <div>
        <MyPageBtn/>
      </div>
    <div className={style.RewardPoint_box}>
        <RewardPoint />
    </div>
</div>
  )
}