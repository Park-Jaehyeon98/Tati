import React from "react";
import style from "../Mypage.module.css"

import Point from '../../../Components/MyPage/Point/Point'
import Aside from "../../../Components/MyPage/Aside";


export default function MyPagePoint(){
    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <Point/>
            </div>
        </div>
    )
}