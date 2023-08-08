import React from "react";
import style from "../Mypage.module.css"

import ApplyStudy from '../../../Components/MyPage/MystudyList/ApplyStudy'
import Aside from "../../../Components/MyPage/Aside";


export default function MyPageApplyStudy(){
    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <ApplyStudy/>
            </div>
        </div>
    )
}