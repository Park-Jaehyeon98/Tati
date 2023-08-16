import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useDispatch } from 'react-redux';


export default function ApplyStudy(){

  const navigate = useNavigate();

  // 신청한 스터디 목록
  const [applyStudy, setApplyStudy] = useState([])
  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);

  // 가입한 스터디 ======================================================================================

  console.log(`memberId - ${parseJwt.memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/application-list/${parseJwt.memberId}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
      .then((res) => {
        console.log('신청한스터디=================================')
        console.log(res.data);
        setApplyStudy(res.data)
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'신청한스터디 ------------------');
      });

  },[])


  //studyApplicantId- int,studyName - StringtotalMember - int,currentMemberCount - int
  // 가입한 스터디 ======================================================================================

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ studyApplicantId, studyName, totalMember, currentMemberCount }) => {
    const handleItemClick = () => {
      navigate(`/Study/${studyApplicantId}`);
    };
    return (
      <div>
        <div className={style.ApplyStudy_box}>
          <p className={style.ApplyStudy_text}><h2 onClick={handleItemClick}>{studyName}</h2>{currentMemberCount}/{totalMember} 인원</p>
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };
  
  //==========================================================================
  
  // 더미 데이터 생성 함수
  function generateDummyData(count) {
    const dummyData = [];

    for (let i = 1; i <= count; i++) {
      const studyApplicantId = i;
      const studyName = `Study ${i}`;
      const totalMember = Math.floor(Math.random() * 10) + 5; // 5에서 14 사이의 랜덤값
      const currentMemberCount = Math.floor(Math.random() * totalMember) + 1; // 1에서 totalMember 사이의 랜덤값

      dummyData.push({
        studyApplicantId,
        studyName,
        totalMember,
        currentMemberCount,
      });
    }

    return dummyData;
  }

  // 더미 데이터 생성
  const numberOfEntries = 10; // 생성할 더미 데이터 개수
  const dummyData = generateDummyData(numberOfEntries);
  //==========================================================================

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = dummyData.slice(startIndex, endIndex);

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
          {applyStudy.length === 0 ? (
                <p className={style.ApplyStudy_text_box}>스터디를 신청해주세요!</p>
              ) : (
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
              )}

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