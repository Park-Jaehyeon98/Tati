import React from "react";
import style from "../Mypage.module.css"

import JoinStudy from "../../../Components/MyPage/MystudyList/JoinStudy";
import MyPageHeader from "../../../Components/MyPage/header";
import MyPageBtn from "../../../Components/MyPage/MyPageBtn";
export default function MyPageJoinStudy(){
    return(
        <div className={style.MyPage}>
            <MyPageHeader/>

            <div>
                <MyPageBtn/>
            </div>
            
            <div className={style.study_box}>
                <JoinStudy/>
            </div>
        </div>
    )
}