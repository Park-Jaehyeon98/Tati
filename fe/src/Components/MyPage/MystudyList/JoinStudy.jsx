import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useNavigate } from "react-router-dom";

export default function JoinStudy(){

  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  // 가입된 스터디 리스트
  const [joinStudy, setJoinStudy] = useState([])
  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);
  // 가입한 스터디 ======================================================================================
  
  console.log(`memberId - ${parseJwt.memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/study-list/${parseJwt.memberId }`)
      .then((res) => {
        console.log('가입스터디=================================')
        console.log(res.data);
        setJoinStudy(res.data)
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'가입스터디 ------------------');
      });
  },[])


  //studyId - int, studyName - String, studyStartDate - String, studyEndDate - String, totalMember - int, studyMembercount - int
  // 가입한 스터디 ======================================================================================
  
  
  const NoticeItem = ({ studyName, studyStartDate, studyEndDate, totalMember,studyMemberCount }) => {
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.JoinStudy_text}>{studyName} - {studyMemberCount}/{totalMember} 인원
            <h6 className={style.JoinStudy_text_day}>{studyStartDate} ~ {studyEndDate} 기간</h6></p>
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };


  const dummyData = [
    {
      studyId: 1,
      studyName: "스터디 그룹 1",
      studyStartDate: "2023-08-01",
      studyEndDate: "2023-09-30",
      totalMember: 10,
      studyMembercount: 8,
    },
  ];
  

  const totalPages = Math.ceil(joinStudy.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = joinStudy.slice(startIndex, endIndex);

  return(
    <div className={style.point}>

      <div className={style.JoinStudy_box}>

      <nav className={style.point_nav_btn}>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/JoinStudy")}>가입된스터디</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/ApplyStudy")}>신청한스터디</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/MyPagePost")}>내 작성글</button>
      </nav>

      <div className={style.content}>

        <div className={style.point_History_box}>
        
        <div>
          <div className={style.box}>
              {currentNotices.map((notice, index) => (
                <NoticeItem
                  key={index}
                  studyName={notice.studyName}
                  studyStartDate={notice.studyStartDate}
                  studyEndDate={notice.studyEndDate}
                  totalMember={notice.totalMember}
                  studyMemberCount={notice.studyMemberCount}
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
      </div>
    </div>
  )
}