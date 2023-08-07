import React from "react";
import style from "../_Mypage.module.css"

import JoinStudy from "../../../Components/_MyPage/MystudyList/JoinStudy";
import Aside from "../../../Components/_MyPage/Aside";


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