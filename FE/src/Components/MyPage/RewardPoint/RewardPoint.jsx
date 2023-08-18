import React, { useState, useEffect } from "react";
import style from "./RewardPoint.module.css"
import axios from "axios";
import { Button } from '@material-ui/core';

export default function RewardPoint() {

  const [usePoint, setUsePoint] = useState([])

  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);


  useEffect(() => {
    console.log(parseJwt.memberId)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/attendance-list/${parseJwt.memberId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
      .then((res) => {
        console.log('상벌---------------------------------')
        console.log(res.data)
        const sortedData = res.data.sort((a, b) => {
          const dateA = new Date(a.attendanceDate);
          const dateB = new Date(b.attendanceDate);
          return dateB - dateA; // 최신 순으로 정렬
        });
  
        setUsePoint(sortedData);
        console.log('상벌---------------------------------')
      })
      .catch((err) => {
        console.log(err)
      })

  }, []);


  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ attendanceDate, content, inTime, isAttended, outTime, score }) => {

    const formattedScore = score !== 'null점' ? score : "0점";
    const formattedContent = content !== null ? content : "스터디 없음";

    const studyName = formattedContent.slice(0, -3);
    const userContent = formattedContent.slice(-2)
    const textColor = (userContent === "결석" || userContent === "지각") ? "red" : "#007BFF";


    return (
      <div>
        <div className={style.ApplyStudy_box}>
          <p className={style.ApplyStudy_text} >
            <div style={{ color: textColor }}>
              {studyName} | {userContent}
            </div>


            <br /> 출석시간 - {inTime} | 퇴실시간 - {outTime} | {formattedScore} | {attendanceDate}</p>
          <hr className={style.Study_hr} />
        </div>
      </div>
    );
  };


  const handlePageClick = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const totalPages = Math.ceil(usePoint.length / itemsPerPage) +1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = usePoint.slice(startIndex, endIndex);
  // console.log("전체", currentNotices)
  // console.log("필터", currentNotices.filter(notice => notice.content !== null))

  return (
    <div className={style.RewardPoint}>
      <div className={style.RewardPoint_box}>

        <h1>입, 퇴실 내역</h1>

        <div>
          <div className={style.usePoint_box}>

          {usePoint.length === 0 ? (
            <p className={style.usePoint_text}>출결이 없습니다!</p>
          ) : (
            <div className={style.box}>
              {currentNotices
                .filter(notice => notice.content !== null)
                .map((notice, index) => (
                  <NoticeItem
                    key={index}
                    attendanceDate={notice.attendanceDate} // 날짜
                    content={notice.content}  // 내용
                    inTime={notice.inTime}  // 출석시간
                    isAttended={notice.isAttended} // 점수
                    outTime={notice.outTime} // 나간시간
                    score={notice.score} // 나간 점수
                  />
                ))}
            </div>
          )}
          </div>

          <div className={style.pagination}>
            <Button className="pagination_button" onClick={handlePrevClick} disabled={currentPage === 1}>
                이전
              </Button>
              <span style={{ 
                marginTop: '3px',
            }}>
              {currentPage}/{totalPages}
              </span>
              <Button className="pagination_button" onClick={handleNextClick} disabled={currentPage === totalPages}>
                다음
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
