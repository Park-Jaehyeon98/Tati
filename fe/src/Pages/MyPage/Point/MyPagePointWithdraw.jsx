import React from "react";
import style from "../Mypage.module.css"

import PointWithdraw from '../../../Components/MyPage/Point/PointWithdraw'
import Aside from "../../../Components/MyPage/Aside";


export default function MyPagePointWithdraw(){
    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <PointWithdraw/>
            </div>
        </div>
    )
}