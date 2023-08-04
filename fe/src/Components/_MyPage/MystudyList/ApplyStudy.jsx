import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useNavigate } from "react-router-dom";

export default function ApplyStudy(){

  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const memberId = localStorage.getItem('memberId');

  // 가입한 스터디 ======================================================================================

  console.log(`memberId - ${memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/application-list/${memberId}`)
      .then((res) => {
        console.log('=================================')
        console.log(res.data);
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'신청한스터디 ------------------');
      });

  },[])


  //studyApplicantId- int,studyName - StringtotalMember - int,currentMemberCount - int
  // 가입한 스터디 ======================================================================================

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ studyName, totalMember, currentMemberCount }) => {
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.p_text}>{studyName} 
            <h6 className={style.text}>{currentMemberCount}/{totalMember}</h6></p>
          <hr />
        </div>
      </div>
    );
  };


  const dummyData = [
    {
      studyApplicantId: 1,
      studyName: "스터디 그룹 1",
      totalMember: 10,
      currentMemberCount: 8,
    },
    {
      studyApplicantId: 2,
      studyName: "스터디 그룹 2",
      totalMember: 5,
      currentMemberCount: 4,
    },
    {
      studyApplicantId: 3,
      studyName: "스터디 그룹 3",
      totalMember: 20,
      currentMemberCount: 15,
    },
    {
      studyApplicantId: 4,
      studyName: "스터디 그룹 4",
      totalMember: 12,
      currentMemberCount: 9,
    },
    {
      studyApplicantId: 5,
      studyName: "스터디 그룹 5",
      totalMember: 8,
      currentMemberCount: 7,
    },
    {
      studyApplicantId: 6,
      studyName: "스터디 그룹 6",
      totalMember: 6,
      currentMemberCount: 3,
    },
  ];
  

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = dummyData.slice(startIndex, endIndex);

  return(
    <div className={style.point}>
      <h1>신청한스터디</h1>
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

      </div>
    </div>
  )
}