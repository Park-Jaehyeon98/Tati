import React from "react";
import style from "../Mypage.module.css"

import JoinStudy from "../../../Components/MyPage/MystudyList/JoinStudy";
import Aside from "../../../Components/MyPage/Aside";


export default function MyPageJoinStudy(){
    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <JoinStudy/>
            </div>
        </div>
    )
}