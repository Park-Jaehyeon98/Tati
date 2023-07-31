import React from "react";
import style from "./_Mypage.module.css"

import InfoModify from "../../Components/_MyPage/InfoModify";
import Aside from "../../Components/_MyPage/Aside";


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










