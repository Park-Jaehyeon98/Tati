import React from "react";
import style from "../Mypage.module.css"

import PointHistory from '../../../Components/MyPage/Point/PointHistory'
import Aside from "../../../Components/MyPage/Aside";


export default function MyPagePointHistory(){
    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <PointHistory/>
            </div>
        </div>
    )
}