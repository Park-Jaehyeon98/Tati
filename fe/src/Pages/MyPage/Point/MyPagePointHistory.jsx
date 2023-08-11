import React from "react";
import style from "../Mypage.module.css"

import PointHistory from '../../../Components/MyPage/Point/PointHistory'
import Aside from "../../../Components/MyPage/Aside";
import MyPageHeader from "../../../Components/MyPage/header";

export default function MyPagePointHistory(){
    return(
        <div className={style.MyPage}>
            <MyPageHeader/>
            <div className={style.Point_box}>
                <PointHistory/>
            </div>
        </div>
    )
}