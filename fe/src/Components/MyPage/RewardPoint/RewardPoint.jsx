import React, {useState, useEffect} from "react";
import style from "./RewardPoint.module.css"
import axios from "axios";
import { Button } from '@material-ui/core';

export default function RewardPoint(){

  const [usePoint, setUsePoint] = useState([])

  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);


  useEffect(()=>{
    console.log(parseJwt.memberId)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/attendance-list/${parseJwt.memberId}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
      .then((res)=>{
        console.log('상벌---------------------------------')
        console.log(res.data)
        setUsePoint(res.data)
        console.log('상벌---------------------------------')
      })
      .catch((err)=>{
        console.log(err)
      })

  },[]);

  
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
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };

  //================================================================
  function generateDummyData(count) {
    const dummyData = [];
  
    for (let i = 1; i <= count; i++) {
      const attendanceDate = `2023-08-${i < 10 ? '0' + i : i}`;
      const content = `Study ${i} ${i % 2 === 0 ? '지각' : '결석'}`;
      const inHour = i % 2 === 0 ? 9 : 8;
      const inMinute = i % 2 === 0 ? 15 : 30;
      const outHour = i % 2 === 0 ? 18 : 17;
      const outMinute = i % 2 === 0 ? 30 : 45;
      const score = 0;
  
      const inTime = `${inHour < 10 ? '0' + inHour : inHour}:${inMinute < 10 ? '0' + inMinute : inMinute}`;
      const outTime = `${outHour < 10 ? '0' + outHour : outHour}:${outMinute < 10 ? '0' + outMinute : outMinute}`;
  
      dummyData.push({
        attendanceDate,
        content,
        inTime,
        isAttended: false,
        outTime,
        score,
      });
    }
  
    return dummyData;
  }
  
  const count = 19;
  const dummyData = generateDummyData(count);
  
  console.log(dummyData);
  //================================================================

  const totalPages = Math.ceil(usePoint.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = usePoint.slice(startIndex, endIndex);


  return(
    <div className={style.RewardPoint}>
      <div className={style.RewardPoint_box}>

        <h1>입, 퇴실 내역</h1>

        <div>
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

            <div className={style.pagination}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  disabled={currentPage === pageNum}
                  className={style.btn}
                >
                  {pageNum}
                </Button>
              ))}
            </div>
        </div>
      </div>
  </div>
  )
}