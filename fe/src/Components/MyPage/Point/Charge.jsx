import React, { useState } from "react";
import style from "./Charge.module.css"
import axios from "axios";
import { useSelector } from "react-redux";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/reducers/userSlice';

export default function Change() {

  const dispatch = useDispatch();
  
   // 리덕스 펄시스트 유저정보를 불러옴
   const user = useSelector(state => state.user.user);
  

  const [currentPoint, setCurrentPoint] = useState(user.totalPoint);
  const [rechargeAmount, setRechargeAmount] = useState(0);


  // 로컬의 decodedToken가져오기
  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);


  const handleRechargeBox = (amountBox) => {
    const roundedAmount = Math.ceil(rechargeAmount / amountBox) * amountBox;
      setRechargeAmount((prevAmount) => prevAmount + amountBox); 
  }
  
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
    console.log(process.env.REACT_APP_URL)

    axios.post(`${process.env.REACT_APP_URL}/payment/ready`, {
      email: user.email,
      amount:rechargeAmount
    })
      .then((res) => {
        console.log('=================================')
        console.log(res.data);

        // const updatedUser = {totalPoint:amount};
        // dispatch(updateUser(updatedUser)); // Dispatch the action

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

  const amounts = [5000, 10000,15000];
  
  const handleZero = ()=>{
    setRechargeAmount(0)
  }

  const formattedTotalPoint = currentPoint.toLocaleString();
  const total = currentPoint + rechargeAmount
  const TotalPoint = total.toLocaleString();

  return (
    <div className={style.Change}>


        {/* 충전 박스 */}
        {amounts.map((amountBox) => (
          <button
            key={amountBox}
            className={style.amounts_box}
            onClick={() => handleRechargeBox(amountBox)}
          >
            +{amountBox}
          </button>
        ))}

      <p className={style.point}>현재 포인트 <span className={style.currentPoint}>{formattedTotalPoint}</span></p>

      <p className={style.point}>
        충전 포인트
        <input className={style.rechargeAmount} type="text" value={rechargeAmount} onChange={handleChange} />
        <button className={style.btn} onClick={handleRecharge}>+</button>
        <button className={style.btn} onClick={handleDecrease}>-</button>
      </p>

      <p>총 포인트 <span className={style.total_point}>{TotalPoint}</span></p>

      <button className={`${style.Change_btn} ${style.zero_btn}`} onClick={handleZero}>초기화</button>
      <button className={`${style.Change_btn} ${style.charge_btn}`}onClick={handleTotal}>충전</button>

    </div>
  );
}
