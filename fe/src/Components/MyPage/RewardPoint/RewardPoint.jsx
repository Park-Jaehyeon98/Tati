import React, {useState, useEffect} from "react";
import style from "./RewardPoint.module.css"
import axios from "axios";

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

  
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ attendanceDate, content, inTime, isAttended, outTime, score }) => {

    // const studyName = content.slice(0, -3);
    // const userContent = content.slice(-2)
    // const textColor = (userContent === "결석" || userContent === "지각") ? "red" : "#007BFF";
    
    return (
      <div>
        <div className={style.ApplyStudy_box}>
          <p className={style.ApplyStudy_text} > 
            {/* <div style={{ color: textColor }}>
            {studyName} 
            {userContent}
            </div> */}

           <br /> 출석시간 - {inTime} / 퇴실시간 - {outTime}  / {score} 점수 / {attendanceDate}</p>
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };



  const totalPages = Math.ceil(usePoint.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = usePoint.slice(startIndex, endIndex);


  return(
    <div className={style.RewardPoint}>
      <div className={style.RewardPoint_box}>

        <h1>입, 퇴실 내역</h1>

        <div>
          <div className={style.box}>
              {currentNotices.map((notice, index) => (
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
            <div className={style.pagination}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  disabled={currentPage === pageNum}
                  className={style.btn}
                >
                  {pageNum}
                </button>
              ))}
            </div>
        </div>
      </div>
  </div>
  )
}