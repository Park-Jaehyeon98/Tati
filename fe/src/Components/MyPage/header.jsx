import React,{useState, useEffect} from "react";
import style from "./header.module.css"
import { useSelector } from 'react-redux';


export default function MyPageHeader(){



    // 리덕스 펄시스트 유저정보를 불러옴
    const user = useSelector(state => state.user.user);

    const [graphWidth, setGraphWidth] = useState(0);

    useEffect(() => {

        // 열정지수 bar
        // setGraphWidth(60 * 4.5);
        setGraphWidth(user.totalScore * 4.5);
    }, []);

    const formattedTotalPoint = user.totalPoint.toLocaleString();

    return(
        <div className={style.user_score}>
            <div>
                <div className={style.totalScore_box}>
                <h2 className={style.totalScore_h1}>열정지수 {user.totalScore}%</h2>
                </div>
                <div className={style.graph_container}>
                    <div className={style.bar} style={{ width: `${graphWidth}px` }}></div>
                </div>
                <h1>총 공부시간 - {user.totalStudyTime}</h1>
                <h1>오늘 공부 시간 - {user.todayStudyTime}</h1>

            </div>

            <div className={style.user_img}>
                <div className={style.memberNickName_text}>
                    <p className={style.memberNickName_p}>{user.memberNickName}</p>

                    <div className={style.Mileage_img_box}>
                        {/* <img src="./Assets/Mileage.png" className={style.Mileage_img}/> */}
                        <img src="https://cdn-icons-png.flaticon.com/128/2953/2953423.png" className={style.Mileage_img}/>
                        <p className={style.totalPoint_p}>{formattedTotalPoint}</p>
                        <div className={style.M}>M</div>
                    </div>
                </div>
                {user.img ? (
                <img className={style.img_box} src={user.img}/>
                ) : (
                <img
                    className={style.img_box}
                    src="https://images.squarespace-cdn.com/content/v1/5dec67bb31a1cc1ad78a7326/1602465793445-KHV22QMIC8VPDWDFKE4D/0b2f8a51314ab1ebe0505aee843a33b1.jpg"
                    alt=""
                />
                )}

            </div>
        </div>
    )
}