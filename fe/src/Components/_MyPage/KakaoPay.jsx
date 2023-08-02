import React, { useEffect, useState } from "react";
import style from './KakaoPay.module.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function KakaoPay() {

  // 건들지 않기 ======================================================================================
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
//===============================================================================================

const itemsPerPage = 14;
const [currentPage, setCurrentPage] = useState(1);

const NoticeItem = ({ point, date, day }) => {
  return (
    <div>
      <div className={style.NoticeItem_text}>
        <p className={style.p_text}>{date} {point} 충전 
        <button className={style.cancel_btn}
        onClick={handleCancel}
        >결제취소</button><h6 className={style.text}>{day}</h6></p>
        <hr />
      </div>
    </div>
  );
};

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

  const totalPages = Math.ceil(dates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = dates.slice(startIndex, endIndex);

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

  // const handleCancel =()=>{
  //   const email = 'rlaalsrbs15@naver.com'
  //   axios.get(`http://${process.env.REACT_APP_URL}:8080/member/mypage/point/${email}`,{
  //   })
  //     .then((res)=>{
  //       console.log(res)
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })
  // }

  return (
    <div className={style.point_History_box}>
     {/* <h2>포인트 내역</h2>
     <br /> */}
      
      <div>
        <div className={style.box}>
            {currentNotices.map((notice, index) => (
              <NoticeItem
                key={index}
                point={notice.amount}
                date={notice.pcontent}
                day={notice.pointDate}
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
