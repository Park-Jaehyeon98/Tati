import React, { useState } from "react";

import style from "./Charge.module.css"

export default function Withdraw() {
  const [currentPoint, setCurrentPoint] = useState(3000);
  const [rechargeAmount, setRechargeAmount] = useState(0);

  const handleRecharge = () => {
    console.log(currentPoint - rechargeAmount)
    if(currentPoint - rechargeAmount>0){
        const roundedAmount = Math.ceil(rechargeAmount / 1000) * 1000;
    setRechargeAmount((prevAmount) => prevAmount + 1000); //1000 단위로 올림
    }
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

  const handleTotal = (e) => {
    setCurrentPoint((prevPoint) => prevPoint - rechargeAmount);
    setRechargeAmount(0);
  }
  return (
    <div className={style.Change}>
      <p className={style.point}>현재 포인트 <span className={style.currentPoint}>{currentPoint}</span></p>
      <p className={style.point}>
        인출 포인트
        <input  className={style.rechargeAmount} type="text" value={rechargeAmount} onChange={handleChange} />
        <button  className={style.btn} onClick={handleRecharge}>+</button>
        <button  className={style.btn} onClick={handleDecrease}>-</button>
      </p>
      <p>총 포인트 <span className={style.total_point}>{currentPoint - rechargeAmount}</span></p>
      <button  className={style.Change_btn} onClick={handleTotal}>인출</button>
    </div>
  );
}
