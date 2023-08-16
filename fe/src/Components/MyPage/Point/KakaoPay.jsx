import React, { useEffect, useState } from "react";
import style from './KakaoPay.module.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { param } from "jquery";
import { useSelector } from "react-redux";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/reducers/userSlice';
import { Button } from '@material-ui/core';

export default function KakaoPay() {

  const dispatch = useDispatch();

  // 리덕스 펄시스트 유저정보를 불러옴
  const user = useSelector(state => state.user.user);


  // 건들지 않기 ======================================================================================
  const location = useLocation();
  const [tid, setTid] = useState(null);
  const [pg_token, setPg_token] = useState(null)


  // 로컬의 decodedToken가져오기
  const tokenInfo = localStorage.getItem('decodedToken');
  const parseJwt = JSON.parse(tokenInfo);


  // 포인트 내역
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
    if (pgToken) {
      console.log(process.env.REACT_APP_URL)
      axios.post(`${process.env.REACT_APP_URL}/payment/success`, {
        pg_token: pgToken,
        tid: storedTid,
        email: parseJwt.sub
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
          RefreshToken: localStorage.getItem('refreshtoken')
        }
      })
        .then((res) => {
          console.log(res.data.amount.total)

          const updatedUser = { totalPoint: user.totalPoint + res.data.amount.total };
          dispatch(updateUser(updatedUser));
          // 요청이 성공하면 tid와 pgToken을 로컬 스토리지에서 삭제
          localStorage.removeItem('pgToken');
          localStorage.removeItem('tid');
          pointHistory()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // kakaokakaokakaokakaokakaokakaokakaokakao


    pointHistory()

  }, []);
  //===============================================================================================



  // 회원포인트 내역 pointpointpointpointpointpointpointpointvpoint
  const pointHistory = () => {
    if (parseJwt.memberId) {
      console.log("memberId:", parseJwt.memberId);
      // setMemberId(parseJwt.memberId)
    }
    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/point/${parseJwt.memberId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    }, {
    })
      .then((res) => {
        console.log('---------------------------------------------')
        console.log(res.data)
        const sortedPoint = res.data.sort((a, b) => {
          // Sort by pointDate in descending order
          const dateA = new Date(a.pointDate);
          const dateB = new Date(b.pointDate);
          return dateB - dateA;
        });
        setPoint(sortedPoint);
        console.log('회원포인트내역')
        console.log('---------------------------------------------')
      })
      .catch((err) => {
        console.log(err)
      })

  }
  //pointpointpointpointpointpointpointpointpointpointpointpointpoint


  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);


  const PointItem = ({ point, date, day, tid }) => {

    // 결제 취소 
    // 포인트가 부족하면 경고창 아닐 시 실행
    const handleCancel = () => {
      console.log('결제취소----------------------------------------')
      console.log(`amount - ${point} tid - ${tid} email - ${parseJwt.sub}`)
      if (point > user.totalPoint) {
        alert('포인트가 부족합니다')
      } else {
        axios.post(`${process.env.REACT_APP_URL}/payment/cancel`, {
          amount: point,
          tid,
          email: parseJwt.sub
        },{
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
            RefreshToken: localStorage.getItem('refreshtoken')
          }
        })
          .then((res) => {
            console.log(res)

            const updatedUser = { totalPoint: user.totalPoint - point };
            dispatch(updateUser(updatedUser)); // Dispatch the action
            pointHistory()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    };

    const formattedTotalPoint = point.toLocaleString();

    return (
      <div>
        <div className={style.PointItem_text}>
          <p className={style.p_text}>{date} - {formattedTotalPoint} 
          {date == '포인트 적립' && ( // date가 '포인트 인출일'이 아닐 때에만 버튼 렌더링
              <button className={style.cancel_btn} onClick={handleCancel}>
                결제취소
              </button>
            )}
            <h6 className={style.text}>{day.slice(0, 10)} {day.slice(11, 16)}
            </h6></p>
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
      <br />

      <div>
        {point.length === 0 ? (
          <p className={style.point_text}>마일리지 내역이 없습니다!</p>
        ) : (
          <div className={style.box}>
            {currentNotices.map((point, index) => (
              <PointItem
              className={style.PointItem_box}
                key={index}
                point={point.amount}
                date={point.pcontent}
                day={point.pointDate}
                tid={point.tid}
              />
            ))}
          </div>
        )}

        <div className={style.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              className={style.pagination_button}
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              disabled={currentPage === pageNum}
            >
              {pageNum}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
