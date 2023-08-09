import React from "react";
import style from "./Mypage.module.css"

import InfoModify from "../../Components/MyPage/InfoModify/InfoModify";
import Aside from "../../Components/MyPage/Aside";


export default function MyPageInfoModify(){

    return(
        <div className={style.myPage}>
            <Aside/>
            <div className={style.box2}>
                <InfoModify/>
            </div>
        </div>
    );
};










