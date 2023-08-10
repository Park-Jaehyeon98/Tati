import React from "react";
import style from "../Mypage.module.css"

import ApplyStudy from '../../../Components/MyPage/MystudyList/ApplyStudy'
import Aside from "../../../Components/MyPage/Aside";
import MyPageHeader from "../../../Components/MyPage/header";

export default function MyPageApplyStudy(){
    return(
        <div className={style.MyPage}>
            <MyPageHeader/>
            <div className={style.study_box}>
                <ApplyStudy/>
            </div>
        </div>
    )
}