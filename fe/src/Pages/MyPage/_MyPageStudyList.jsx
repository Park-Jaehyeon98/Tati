import React from "react";
import style from "./_Mypage.module.css"

import StudyList from "../../Components/_MyPage/StudyList";
import Aside from "../../Components/_MyPage/Aside";


export default function MyPageStudyList(){
    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <StudyList/>
            </div>
        </div>
    )
}