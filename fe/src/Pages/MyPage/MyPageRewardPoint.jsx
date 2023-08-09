import React from "react";
import Aside from "../../Components/MyPage/Aside";
import RewardPoint from "../../Components/MyPage/RewardPoint/RewardPoint";
import style from "./Mypage.module.css"

export default function MyPageRewardPoint(){
  return(
    <div className={style.myPage}>
    <Aside />
    <div className={style.box2}>
        <RewardPoint />
    </div>
</div>
  )
}