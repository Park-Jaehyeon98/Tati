import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Charge.module.css"
import axios from "axios";
import { useSelector } from "react-redux";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/reducers/userSlice';

export default function Withdraw() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
   // 리덕스 펄시스트 유저정보를 불러옴
   const user = useSelector(state => state.user.user);

  
  const [currentPoint, setCurrentPoint] = useState(user.totalPoint);
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


  // 현재 시간
  const currentDate = new Date();;



  // 인출 =================================================================
  const handleTotal = (e) => {
    setCurrentPoint((prevPoint) => prevPoint - rechargeAmount);
    setRechargeAmount(0);
    const pContent = '포인트 인출'

    console.log(`인출 email - ${user.email} 
    amount - ${rechargeAmount} 
    pointDate - ${currentDate}
    pContent - ${pContent}`)

    console.log(process.env.REACT_APP_URL)

    axios.post(`${process.env.REACT_APP_URL}/member/point/withdrawal`, {
      email:user.email,
      amount:rechargeAmount,
      pointDate:currentDate,
      pContent
    },{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
      .then((res) => {
        console.log('=================================')
        console.log(res.data);
        console.log('==============================')
        navigate("/MyPage/PointHistory")
        const updatedUser = {totalPoint:currentPoint - rechargeAmount};
        dispatch(updateUser(updatedUser)); // Dispatch the action
      })
      .catch((err) => {
        console.log(err,'------------------');
      });

      // email - String, amount - Integer, pointDate - String, pContent - String (포인트 결제 취소, 보증금 내기)
  }
  // =========================================================================================

  const formattedTotalPoint = currentPoint.toLocaleString();
  const Amount = rechargeAmount.toLocaleString();
  const total = currentPoint - rechargeAmount
  const TotalPoint = total.toLocaleString();

  return (
    <div className={style.Change}>
      <p className={style.point}>현재 포인트 <span className={style.currentPoint}>{formattedTotalPoint}</span></p>
      <p className={style.point}>
        인출 포인트
        <input  className={style.rechargeAmount} type="text" readOnly value={Amount} onChange={handleChange} />
        <button  className={style.btn} onClick={handleRecharge}>+</button>
        <button  className={style.btn} onClick={handleDecrease}>-</button>
      </p>
      <p>총 포인트 <span className={style.total_point}>{TotalPoint}</span></p>
      <button  className={style.Change_btn} onClick={handleTotal}>인출</button>
    </div>
  );
}
