import React from "react";
import style from "../Mypage.module.css"

import Point from '../../../Components/MyPage/Point/Point'
import MyPageHeader from "../../../Components/MyPage/header";

export default function MyPagePoint(){
    return(
        <div className={style.MyPage}>
            <div className={style.MyPage_Point_box}>
                <MyPageHeader/>
                <div className={style.Point_box}>
                    <Point/>
                </div>
            </div>
        </div>
    )
}