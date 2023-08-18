import React from "react";
import style from "../Mypage.module.css"

import MyPost from "../../../Components/MyPage/MystudyList/MyPost";
import Aside from "../../../Components/MyPage/Aside";
import MyPageHeader from "../../../Components/MyPage/header";
import MyPageBtn from "../../../Components/MyPage/MyPageBtn";

export default function MyPagePost() {
    return (
        <div className={style.MyPage}>
            <MyPageHeader />

            <div>
                <MyPageBtn/>
            </div>
            <div className={style.study_box}>
                <MyPost />
            </div>
        </div>
    )
}