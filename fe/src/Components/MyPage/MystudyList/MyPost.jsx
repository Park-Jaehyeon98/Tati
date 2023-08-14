import React,{useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useNavigate } from "react-router-dom";

export default function MyPost(){

  const navigate = useNavigate();

  // 내가 작성한 글 목록
  const [myPost, setMyPost] = useState([])

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);

  // 내 작성글  ======================================================================================

  console.log(`memberId - ${parseJwt.memberId}`)
  useEffect(() => {

    console.log(process.env.REACT_APP_URL)
    axios.get(`${process.env.REACT_APP_URL}/member/mypage/board-list/${parseJwt.memberId}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    })
      .then((res) => {
        console.log('내 작성글=================================')
        console.log(res.data);
        setMyPost(res.data)
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

  const NoticeItem = ({ studyId,boardId, boardTitle, boardHit, boardCommentCount, boardDate }) => {
    const handleItemClick = () => {
      navigate(`/Study/${studyId}/Board/${boardId}`);
    };
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.MyPost_text}>
             <h2 onClick={handleItemClick}>{boardTitle}</h2>
              조회수 {boardHit} 댓글수 {boardCommentCount}
            <h6 className={style.MyPost_text_time}>
              {boardDate.slice(0, 10)}
              </h6></p>
          <hr className={style.Study_hr}/>
        </div>
      </div>
    );
  };
  
  

  const totalPages = Math.ceil(myPost.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = myPost.slice(startIndex, endIndex);

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
            {myPost.length === 0 ? (
              <p className={style.ApplyStudy_text_box}>글을 작성해주세요!</p>
              ):(
            <div className={style.box}>
                {currentNotices.map((notice, index) => (
                  <NoticeItem
                    key={index}
                    boardId={notice.boardId}
                    boardTitle={notice.boardTitle}
                    boardHit={notice.boardHit}
                    boardCommentCount={notice.boardCommentCount}
                    boardDate={notice.createdDate}
                    studyId={notice.studyId}
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