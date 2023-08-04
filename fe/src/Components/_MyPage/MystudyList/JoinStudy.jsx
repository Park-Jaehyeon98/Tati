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

  const memberId = localStorage.getItem('memberId');
  // 가입한 스터디 ======================================================================================
  
  console.log(`memberId - ${memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/study-list/${memberId }`)
      .then((res) => {
        console.log('=================================')
        console.log(res.data);
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'가입스터디 ------------------');
      });
  },[])


  //studyId - int, studyName - String, studyStartDate - String, studyEndDate - String, totalMember - int, studyMembercount - int
  // 가입한 스터디 ======================================================================================
  
  
  const NoticeItem = ({ studyName, studyStartDate, studyEndDate, totalMember,studyMembercount }) => {
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.p_text}>{studyName} - {studyMembercount}/{totalMember} 인원
            <h6 className={style.text}>{studyStartDate} ~ {studyEndDate} 기간</h6></p>
          <hr />
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
    {
      studyId: 2,
      studyName: "스터디 그룹 2",
      studyStartDate: "2023-07-25",
      studyEndDate: "2023-10-15",
      totalMember: 5,
      studyMembercount: 4,
    },
    {
      studyId: 3,
      studyName: "스터디 그룹 3",
      studyStartDate: "2023-08-10",
      studyEndDate: "2023-09-30",
      totalMember: 20,
      studyMembercount: 15,
    },
    {
      studyId: 4,
      studyName: "스터디 그룹 4",
      studyStartDate: "2023-08-05",
      studyEndDate: "2023-10-20",
      totalMember: 12,
      studyMembercount: 9,
    },
    {
      studyId: 5,
      studyName: "스터디 그룹 5",
      studyStartDate: "2023-08-15",
      studyEndDate: "2023-10-31",
      totalMember: 8,
      studyMembercount: 7,
    },
    {
      studyId: 6,
      studyName: "스터디 그룹 6",
      studyStartDate: "2023-08-20",
      studyEndDate: "2023-11-30",
      totalMember: 6,
      studyMembercount: 3,
    },
    {
      studyId: 7,
      studyName: "스터디 그룹 7",
      studyStartDate: "2023-08-08",
      studyEndDate: "2023-09-25",
      totalMember: 15,
      studyMembercount: 12,
    },
    {
      studyId: 8,
      studyName: "스터디 그룹 8",
      studyStartDate: "2023-08-30",
      studyEndDate: "2023-11-15",
      totalMember: 7,
      studyMembercount: 5,
    },
  ];
  

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = dummyData.slice(startIndex, endIndex);

  return(
    <div className={style.point}>
      <h1>가입스터디</h1>
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
                  studyMembercount={notice.studyMembercount}
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