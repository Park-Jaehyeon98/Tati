import React from "react";
import style from "../_Mypage.module.css"

import MyPost from "../../../Components/_MyPage/MystudyList/MyPost";
import Aside from "../../../Components/_MyPage/Aside";


export default function MyPagePost() {
    return (
        <div className={style.myPage}>
            <Aside />
            <div className={style.box2}>
                <MyPost />
            </div>
        </div>
    )
}