import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useNavigate } from "react-router-dom";

import { Button } from '@material-ui/core';


export default function JoinStudy(){

  const navigate = useNavigate();


  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const itemsPerPage = 6;
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
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/study-list/${parseJwt.memberId}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
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
  
  
  const NoticeItem = ({ studyId, studyName, studyStartDate, studyEndDate, totalMember,studyMemberCount }) => {
    const handleItemClick = () => {
      navigate(`/Study/${studyId}`);
    };
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.JoinStudy_text}>
            <h2 onClick={handleItemClick} className={style.studyName}>{studyName}</h2>

            <div className={style.studyItem_data}>
            <span role="img" aria-label="writing hand">👥 {studyMemberCount}/{totalMember} </span> 
            <h6 className={style.JoinStudy_text_day}>{studyStartDate} ~ {studyEndDate}</h6>
            </div>

            </p>
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };
  
  //=======================================================================
  // 더미 데이터 생성 함수
function generateDummyData(count) {
  const dummyData = [];
  const currentDate = new Date();

  for (let i = 1; i <= count; i++) {
    const studyId = i;
    const studyName = `Study ${i}`;
    // const studyStartDate = new Date(currentDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // 현재 날짜를 기준으로 30일 내에서 무작위로 생성
    // const studyEndDate = new Date(studyStartDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // 시작 날짜를 기준으로 30일 내에서 무작위로 생성
    const totalMember = Math.floor(Math.random() * 10) + 5; // 5에서 14 사이의 랜덤값
    const studyMemberCount = Math.floor(Math.random() * totalMember) + 1; // 1에서 totalMember 사이의 랜덤값

    dummyData.push({
      studyId,
      studyName,
      // studyStartDate,
      // studyEndDate,
      totalMember,
      studyMemberCount,
    });
  }

  return dummyData;
}

// 더미 데이터 생성
const numberOfEntries = 10; // 생성할 더미 데이터 개수
const dummyData = generateDummyData(numberOfEntries);

// 생성된 더미 데이터 출력
console.log(dummyData);
  //=======================================================================

  const totalPages = Math.ceil(joinStudy.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = joinStudy.slice(startIndex, endIndex);


  return(
    <div className={style.point}>

      <div className={style.JoinStudy_box}>

      <nav className={style.point_nav_btn}>
        <button className={`${style.nav_blue} ${style.nav_btn}`}  onClick={() => handleButtonClick("/MyPage/JoinStudy")}>가입된 스터디</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/ApplyStudy")}>신청한 스터디</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("/MyPage/MyPagePost")}>내 작성글</button>
      </nav>

      <div className={style.content}>

        <div className={style.point_History_box}>
            <div className={style.studyItem_box}>
              {joinStudy.length === 0 ? (
                <p className={style.JoinStudy_text_box}>스터디에 가입해주세요!</p>
              ) : (
                <div className={style.box}>
                  {currentNotices.map((notice, index) => (
                    <NoticeItem
                      key={index}
                      studyId={notice.studyId}
                      studyName={notice.studyName}
                      studyStartDate={notice.studyStartDate}
                      studyEndDate={notice.studyEndDate}
                      totalMember={notice.totalMember}
                      studyMemberCount={notice.studyMemberCount}
                    />
                  ))}
                </div>
              )}
            </div>

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
    </div>
  )
}