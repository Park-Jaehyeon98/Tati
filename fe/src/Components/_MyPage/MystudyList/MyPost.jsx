import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useNavigate } from "react-router-dom";

export default function MyPost(){

  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const memberId = localStorage.getItem('memberId');

  // 가입한 스터디 ======================================================================================

  console.log(`memberId - ${memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/board-list/${memberId}`)
      .then((res) => {
        console.log('=================================')
        console.log(res.data);
        console.log('==============================')
      })
      .catch((err) => {
        console.log(err,'내 작성글 ------------------');
      });

  },[])


  //작성한 게시글인 경우
  // boardId - int,
  // boardTitle - String,
  // boardHit - int,   > 조회 수
  // boardCommentCount - int,  > 댓글 수
  // boardDate - createdDate
  // 가입한 스터디 ======================================================================================


  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ boardId, boardTitle, boardHit, boardCommentCount, boardDate }) => {
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.p_text}>{boardId} {boardTitle} - 조회수 {boardHit} 댓글수 {boardCommentCount}
            <h6 className={style.text}>{boardDate.slice(0, 10)}</h6></p>
          <hr />
        </div>
      </div>
    );
  };


  const dummyData = [
    {
      boardId: 1,
      boardTitle: "첫 번째 게시물",
      boardHit: 120,
      boardCommentCount: 5,
      boardDate: "2023-08-04T10:30:00.000Z",
    },
    {
      boardId: 2,
      boardTitle: "두 번째 게시물",
      boardHit: 80,
      boardCommentCount: 3,
      boardDate: "2023-08-03T15:45:00.000Z",
    },
    {
      boardId: 3,
      boardTitle: "세 번째 게시물",
      boardHit: 200,
      boardCommentCount: 8,
      boardDate: "2023-08-02T09:20:00.000Z",
    },
    {
      boardId: 4,
      boardTitle: "네 번째 게시물",
      boardHit: 50,
      boardCommentCount: 2,
      boardDate: "2023-08-01T18:10:00.000Z",
    },
    {
      boardId: 5,
      boardTitle: "다섯 번째 게시물",
      boardHit: 300,
      boardCommentCount: 12,
      boardDate: "2023-07-31T22:55:00.000Z",
    },
    {
      boardId: 6,
      boardTitle: "여섯 번째 게시물",
      boardHit: 90,
      boardCommentCount: 4,
      boardDate: "2023-07-30T11:25:00.000Z",
    },
    {
      boardId: 7,
      boardTitle: "일곱 번째 게시물",
      boardHit: 180,
      boardCommentCount: 9,
      boardDate: "2023-07-29T14:00:00.000Z",
    },
    {
      boardId: 8,
      boardTitle: "여덟 번째 게시물",
      boardHit: 70,
      boardCommentCount: 6,
      boardDate: "2023-07-28T17:40:00.000Z",
    },
    {
      boardId: 9,
      boardTitle: "아홉 번째 게시물",
      boardHit: 250,
      boardCommentCount: 10,
      boardDate: "2023-07-27T08:15:00.000Z",
    },
    {
      boardId: 10,
      boardTitle: "열 번째 게시물",
      boardHit: 40,
      boardCommentCount: 1,
      boardDate: "2023-07-26T20:05:00.000Z",
    },
    {
      boardId: 11,
      boardTitle: "열한 번째 게시물",
      boardHit: 150,
      boardCommentCount: 7,
      boardDate: "2023-07-25T12:50:00.000Z",
    },
    {
      boardId: 12,
      boardTitle: "열두 번째 게시물",
      boardHit: 60,
      boardCommentCount: 3,
      boardDate: "2023-07-24T16:30:00.000Z",
    },
  ];
  
  

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = dummyData.slice(startIndex, endIndex);

  return(
    <div className={style.point}>
      <h1>내 작성글</h1>
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
                  boardId={notice.boardId}
                  boardTitle={notice.boardTitle}
                  boardHit={notice.boardHit}
                  boardCommentCount={notice.boardCommentCount}
                  boardDate={notice.boardDate}
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