import React, { useEffect, useState } from "react";
import style from './KakaoPay.module.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {setMemberPoint} from "../../redux/actions/actions";


export default function KakaoPay() {

  const dispatch = useDispatch();

  // 건들지 않기 ======================================================================================
  const location = useLocation();
  const [tid, setTid] = useState(null);
  const [pg_token, setPg_token] = useState(null)
  const [memberId, setMemberId] = useState('')

  const email = localStorage.getItem('email');

  useEffect(() => {

    // 카카오페이 결제 kakaokakaokakaokakaokakaokakaokakao
    // URL 파라미터로부터 pg_token 값을 추출
    const urlParams = new URLSearchParams(location.search);
    const pgToken = urlParams.get('pg_token');

    if (pgToken) {
      console.log("pgToken:", pgToken);
      setPg_token(pgToken)
    }

    const storedTid = localStorage.getItem('tid');
    if (storedTid) {
      console.log("tid from local storage:", storedTid);
      setTid(storedTid);
    }


    console.log(`tid${storedTid}--------------`)
    console.log(`pgToken: ${pgToken}--------------`)
    console.log(`email: ${email}--------------`)
    // 결제 완료시 토큰 값이 있을 때 최종 결제 
    if(pgToken){
      console.log(process.env.REACT_APP_URL)
      axios.post(`${process.env.REACT_APP_URL}/payment/success`,{
        email,
        pg_token:pgToken,
        tid:storedTid
      })
        .then((res)=>{
          console.log(res)
          // 요청이 성공하면 tid와 pgToken을 로컬 스토리지에서 삭제
          localStorage.removeItem('tid');
          localStorage.removeItem('pgToken');
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    // kakaokakaokakaokakaokakaokakaokakaokakao


    const memberId = localStorage.getItem('memberId');
    // 회원포인트 내역 pointpointpointpointpointpointpointpointvpoint
    if (memberId) {
      console.log("memberId:", memberId);
      setMemberId(memberId)
    }
    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/point/${memberId}`,{
      })
        .then((res)=>{
          console.log('---------------------------------------------')
          console.log(res.data)
          console.log('회원포인트내역')
          console.log('---------------------------------------------')
          dispatch(setMemberPoint(res.data));
        })
        .catch((err)=>{
          console.log(err)
        })

    //pointpointpointpointpointpointpointpointpointpointpointpointpoint

  }, [ memberId]);
//===============================================================================================



const itemsPerPage = 13;
const [currentPage, setCurrentPage] = useState(1);


const PointItem = ({ point, date, day }) => {
  return (
    <div>
      <div className={style.PointItem_text}>
        <p className={style.p_text}>{date} {point} 충전 
        <button className={style.cancel_btn}
        onClick={handleCancel}
        >결제취소</button><h6 className={style.text}>{day}</h6></p>
        <hr />
      </div>
    </div>
  );
};


// 포인트 내역 데이터를 리덕스 스토어에서 가져옴
const pointData = useSelector((state) => state.memberPoint) || [];

// 데이터
const dates = [
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
  { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},

];
//====================================

  const totalPages = Math.ceil(pointData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = pointData.slice(startIndex, endIndex);


  
  // 결제 취소
  const handleCancel =()=>{
    axios.post(`http://${process.env.REACT_APP_URL}:8080/payment/cancel`,{
      amount: 3000
    })
      .then((res)=>{
        console.log(res)
        window.location.href = '/MyPage/PointHistory';
      })
      .catch((err)=>{
        console.log(err)
      })
  }



  return (
    <div className={style.point_History_box}>
     <h2>포인트 내역</h2>
     <br />
      
      <div>
        <div className={style.box}>
            {currentNotices.map((point, index) => (
              <PointItem
                key={index}
                point={point.amount}
                date={point.pcontent}
                day={point.pointDate}
              />
            ))}
          </div>
          <div className={style.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                disabled={currentPage === pageNum}
              >
                {pageNum}
              </button>
            ))}
          </div>
      </div>
    </div>
  );
}
