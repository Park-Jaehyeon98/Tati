import React from "react";
import Aside from "../../Components/_MyPage/Aside";
import RewardPoint from "../../Components/_MyPage/RewardPoint/RewardPoint";
import style from "./_Mypage.module.css"

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