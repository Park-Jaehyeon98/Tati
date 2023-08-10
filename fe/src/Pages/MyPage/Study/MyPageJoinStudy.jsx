import React from "react";
import style from "../Mypage.module.css"

import JoinStudy from "../../../Components/MyPage/MystudyList/JoinStudy";
import Aside from "../../../Components/MyPage/Aside";
import MyPageHeader from "../../../Components/MyPage/header";

export default function MyPageJoinStudy(){
    return(
        <div className={style.MyPage}>
            <MyPageHeader/>
            <div className={style.study_box}>
                <JoinStudy/>
            </div>
        </div>
    )
}