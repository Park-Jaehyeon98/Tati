import React from "react";
import style from "../Mypage.module.css"

import PointWithdraw from '../../../Components/MyPage/Point/PointWithdraw'
import Aside from "../../../Components/MyPage/Aside";
import MyPageHeader from "../../../Components/MyPage/header";
import MyPageBtn from "../../../Components/MyPage/MyPageBtn";
export default function MyPagePointWithdraw(){
    return(
        <div className={style.MyPage}>
            <MyPageHeader/>

            <div>
                <MyPageBtn/>
            </div>
            <div className={style.Point_box}>
                <PointWithdraw/>
            </div>
        </div>
    )
}