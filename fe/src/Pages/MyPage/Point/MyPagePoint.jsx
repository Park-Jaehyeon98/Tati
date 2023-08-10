import React from "react";
import style from "../Mypage.module.css"

import Point from '../../../Components/MyPage/Point/Point'
import Aside from "../../../Components/MyPage/Aside";
import MyPageHeader from "../../../Components/MyPage/header";

export default function MyPagePoint(){
    return(
        <div className={style.MyPage}>
            <MyPageHeader/>
            <div className={style.Point_box}>
                <Point/>
            </div>
        </div>
    )
}