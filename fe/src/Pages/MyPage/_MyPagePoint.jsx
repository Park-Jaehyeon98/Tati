import React from "react";
import style from "./_Mypage.module.css"

import Point from '../../Components/_MyPage/Point'
import Aside from "../../Components/_MyPage/Aside";


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