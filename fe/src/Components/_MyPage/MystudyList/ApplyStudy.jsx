import React,{useState} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import style from './ApplyStudy.module.css'
import { useNavigate } from "react-router-dom";

export default function ApplyStudy(){

  const navigate = useNavigate();

  const handleButtonClick = (tab) => {
    navigate(tab);
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ point, date, day }) => {
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.p_text}>{date} {point} 충전 
            <h6 className={style.text}>{day}</h6></p>
          <hr />
        </div>
      </div>
    );
  };


  const dates = [
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
    { amount:10000 ,pcontent: 'tati_point', pointDate: '23.07.31'},
    { amount:12000 ,pcontent: 'tati_point', pointDate: '23.07.23'},
  
  ];

  const totalPages = Math.ceil(dates.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = dates.slice(startIndex, endIndex);

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
                  point={notice.amount}
                  date={notice.pcontent}
                  day={notice.pointDate}
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