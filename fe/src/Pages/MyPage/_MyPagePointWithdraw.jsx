import React from "react";
import style from "./_Mypage.module.css"

import PointWithdraw from '../../Components/_MyPage/PointWithdraw'
import Aside from "../../Components/_MyPage/Aside";


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