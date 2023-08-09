import React, { useEffect, useState } from "react";
import style from './KakaoPay.module.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { param } from "jquery";


export default function KakaoPay() {

  // 건들지 않기 ======================================================================================
  const location = useLocation();
  const [tid, setTid] = useState(null);
  const [pg_token, setPg_token] = useState(null)

  // 로컬의 decodedToken가져오기
  const tokenInfo = localStorage.getItem('decodedToken');
  const parseJwt = JSON.parse(tokenInfo);

  const [point, setPoint] = useState([])
  

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
    console.log(`email: ${parseJwt.sub}--------------`)
    // 결제 완료시 토큰 값이 있을 때 최종 결제 
    if(pgToken){
      console.log(process.env.REACT_APP_URL)
      axios.post(`${process.env.REACT_APP_URL}/payment/success`,{
        pg_token:pgToken,
        tid:storedTid,
        email:parseJwt.sub
      })
        .then((res)=>{
          console.log(res)
          // 요청이 성공하면 tid와 pgToken을 로컬 스토리지에서 삭제
          localStorage.removeItem('pgToken');
          localStorage.removeItem('tid');
        })
        .catch((err)=>{
          console.log(err)
        })
    }
    // kakaokakaokakaokakaokakaokakaokakaokakao


    // 회원포인트 내역 pointpointpointpointpointpointpointpointvpoint
    if (parseJwt.memberId) {
      console.log("memberId:", parseJwt.memberId);
      // setMemberId(parseJwt.memberId)
    }
    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/point/${parseJwt.memberId}`,{
      })
        .then((res)=>{
          console.log('---------------------------------------------')
          console.log(res.data)
          setPoint(res.data)
          console.log('회원포인트내역')
          console.log('---------------------------------------------')
        })
        .catch((err)=>{
          console.log(err)
        })

    //pointpointpointpointpointpointpointpointpointpointpointpointpoint

  }, []);
//===============================================================================================



const itemsPerPage = 7;
const [currentPage, setCurrentPage] = useState(1);


const PointItem = ({ point, date, day, tid }) => {

  // 결제 취소
  const handleCancel =()=>{
    console.log('결제취소----------------------------------------')
    console.log(`amount - ${point} tid - ${tid} email - ${parseJwt.sub}`)
    axios.post(`${process.env.REACT_APP_URL}/payment/cancel`,{
      amount :point,
      tid,
      email:parseJwt.sub
    })
      .then((res)=>{
        console.log(res)
        window.location.reload();
      })
      .catch((err)=>{
        console.log(err)
      })
  };

  return (
    <div>
      <div className={style.PointItem_text}>
        <p className={style.p_text}>{date} {point} 
        <h6 className={style.text}>{day} 
        </h6>{date == '포인트 적립' && ( // date가 '포인트 인출일'이 아닐 때에만 버튼 렌더링
              <button className={style.cancel_btn} onClick={handleCancel}>
                결제취소
              </button>
            )}</p>
        <hr />
      </div>
    </div>
  );
};


//====================================

  const totalPages = Math.ceil(point.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = point.slice(startIndex, endIndex);

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
                tid={point.tid}
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
