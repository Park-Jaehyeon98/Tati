import React, { useState } from "react";
import style from "./Charge.module.css"
import axios from "axios";

export default function Change() {

  const [currentPoint, setCurrentPoint] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState(0);

  const handleRecharge = () => {
    const roundedAmount = Math.ceil(rechargeAmount / 1000) * 1000;
    setRechargeAmount((prevAmount) => prevAmount + 1000); //1000 단위로 올림
  };


  const handleDecrease = () => {
    const roundedAmount = Math.floor(rechargeAmount / 1000) * 1000;
    const newRechargeAmount = Math.max(roundedAmount - 1000, 0);
    setRechargeAmount(newRechargeAmount);
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setRechargeAmount(value);
  };

  // 포인트 결제준비
  const handleTotal = (e) => {
    const amount = currentPoint + rechargeAmount
    setCurrentPoint((prevPoint) => prevPoint + rechargeAmount);
    setRechargeAmount(0);
    axios.post(`http://${process.env.REACT_APP_URL}:8080/payment/ready`, {
      email: 'rlaalsrbs15@naver.com',
      amount
    })
      .then((res) => {
        console.log('=================================')
        console.log(res.data);
        console.log('==============================')
        const { next_redirect_pc_url, tid } = res.data;
        // tid 로컬에 저장
        localStorage.setItem('tid', tid);
        console.log(next_redirect_pc_url, tid);
        window.location.href = next_redirect_pc_url;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  return (
    <div className={style.Change}>

      <p className={style.point}>현재 포인트 <span className={style.currentPoint}>{currentPoint}</span></p>

      <p className={style.point}>
        충전 포인트
        <input className={style.rechargeAmount} type="text" value={rechargeAmount} onChange={handleChange} />
        <button className={style.btn} onClick={handleRecharge}>+</button>
        <button className={style.btn} onClick={handleDecrease}>-</button>
      </p>

      <p>총 포인트 <span className={style.total_point}>{currentPoint + rechargeAmount}</span></p>
      <button className={style.Change_btn} onClick={handleTotal}>충전</button>

    </div>
  );
}
