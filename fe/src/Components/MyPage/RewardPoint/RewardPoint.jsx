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
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/point/${parseJwt.memberId}`)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })

  },[]);

  
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ studyName, totalMember, currentMemberCount }) => {
    return (
      <div>
        <div className={style.ApplyStudy_box}>
          <p className={style.ApplyStudy_text}>{studyName} - {currentMemberCount}/{totalMember} 인원</p>
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
      <h1>상벌점내역</h1>

      <div>
        <div className={style.box}>
            {currentNotices.map((notice, index) => (
              <NoticeItem
                key={index}
                studyApplicantId={notice.studyApplicantId}
                studyName={notice.studyName}
                totalMember={notice.totalMember}
                currentMemberCount={notice.currentMemberCount}
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
  )
}