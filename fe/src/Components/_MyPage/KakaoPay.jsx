import React, { useEffect, useState } from "react";
import style from './KakaoPay.module.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function KakaoPay() {

  // const location = useLocation();
  // const [tid, setTid] = useState(null);
  // const [pg_token, setPg_token] = useState(null)
  
  // useEffect(() => {
  //   // URL 파라미터로부터 pg_token 값을 추출
  //   const urlParams = new URLSearchParams(location.search);
  //   const pgToken = urlParams.get('pg_token');

  //   // if (pgToken) {
  //   //   console.log("pgToken:", pgToken);
  //   //   setPg_token(pgToken)
  //   // }

  //   const storedTid = localStorage.getItem('tid');
  //   // if (storedTid) {
  //   //   console.log("tid from local storage:", storedTid);
  //   //   setTid(storedTid);
  //   // }

  //   const email = 'rlaalsrbs15@naver.com'
  //   console.log(`tid${storedTid}--------------`)
  //   axios.post(`http://${process.env.REACT_APP_URL}:8080/payment/success`,{
  //     email,
  //     pg_token:pgToken,
  //     tid:storedTid
  //   })
  //     .then((res)=>{
  //       console.log(res)
  //       window.location.href = '/mypage';
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })


  // }, [location]);

  // // 결제 최종
  // const handleSuccess =()=>{
  //   const email = 'rlaalsrbs15@naver.com'
  //   console.log(`pgtoken${pg_token} tid${tid}`)
  //   axios.post(`http://${process.env.REACT_APP_URL}:8080/payment/success`,{
  //     email,
  //     pg_token:pg_token,
  //     tid
  //   })
  //     .then((res)=>{
  //       console.log(res)
  //       window.location.href = '/mypage';
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })
  // }

  // 결제 취소
  // const handleCancel =()=>{
  //   axios.post(`http://${process.env.REACT_APP_URL}:8080/payment/cancel`,{
  //     amount: 3000
  //   })
  //     .then((res)=>{
  //       console.log(res)
  //       window.location.href = '/mypage';
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })
  // }
  const handleCancel =()=>{
    const email = 'rlaalsrbs15@naver.com'
    axios.get(`http://${process.env.REACT_APP_URL}:8080/member/mypage/point/${email}`,{
    })
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div>
     내역
    </div>
  );
}
