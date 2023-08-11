import React from "react";
import Aside from "../../Components/MyPage/Aside";
import RewardPoint from "../../Components/MyPage/RewardPoint/RewardPoint";
import style from "./Mypage.module.css"
import MyPageHeader from "../../Components/MyPage/header";


export default function MyPageRewardPoint(){
  return(
    <div className={style.MyPage}>
    <MyPageHeader />
    <div className={style.RewardPoint_box}>
        <RewardPoint />
    </div>
</div>
  )
}