import React from "react";
import style from "../_Mypage.module.css"

import PointHistory from '../../../Components/_MyPage/Point/PointHistory'
import Aside from "../../../Components/_MyPage/Aside";


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