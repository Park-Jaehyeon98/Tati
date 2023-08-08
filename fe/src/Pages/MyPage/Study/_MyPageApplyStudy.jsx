import React from "react";
import style from "../_Mypage.module.css"

import ApplyStudy from '../../../Components/_MyPage/MystudyList/ApplyStudy'
import Aside from "../../../Components/_MyPage/Aside";


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