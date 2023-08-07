import React, {useState, useEffect} from "react";
import style from "./RewardPoint.module.css"
import axios from "axios";

export default function RewardPoint(){

  const [usePoint, setUsePoint] = useState([])

  const memberId = Number(localStorage.getItem('memberId'));

  useEffect(()=>{
    console.log(memberId)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/point/${memberId}`)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })

  },[]);

  
  return(
    <div className={style.RewardPoint}>
      <h1>상벌점내역</h1>

    </div>
  )
}