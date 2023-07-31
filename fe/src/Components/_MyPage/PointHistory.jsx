import React from "react";
import style from './PointHistory.module.css'
export default function PointHistory(){

    
    return(
        <div>
            <p className={style.PointHistory_title}>포인트 내역</p>
            <hr />
            <br />
            <div className={style.point_list}>
                <p className={style.point_name}>타이타이</p>
                <p className={style.point_day}>23.07.31</p>
            </div>
            <hr />
        </div>
    )
}