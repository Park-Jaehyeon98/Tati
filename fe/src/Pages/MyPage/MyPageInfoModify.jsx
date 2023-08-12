import React from "react";
import style from "./Mypage.module.css"

import InfoModify from "../../Components/MyPage/InfoModify/InfoModify";
import MyPageHeader from "../../Components/MyPage/header";


export default function MyPageInfoModify(){

    return(
        <div className={style.MyPage}>
            <MyPageHeader/>
            <div className={style.box2}>
                <InfoModify/>
            </div>
        </div>
    );
};










