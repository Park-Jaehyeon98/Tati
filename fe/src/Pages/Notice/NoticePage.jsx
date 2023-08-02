import React, { useState } from "react";
import style from './NoticePage.module.css';

export default function NoticePage() {
  const itemsPerPage = 17;
  const [currentPage, setCurrentPage] = useState(1);

  const NoticeItem = ({ text, index, date }) => {
    return (
      <div>
        <div className={style.NoticeItem_text}>
          <p className={style.p_text}>{index + 1}번 {text} <h6 className={style.text}>{date}</h6></p>
          <hr />
        </div>
      </div>
    );
  };

  const notices = [
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
    { text: '안녕하세요', date: '23.08.01' },
    { text: '안녕', date: '23.07.31' },
  ];

  const totalPages = Math.ceil(notices.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = notices.slice(startIndex, endIndex);

  return (
    <div className={style.Notice}>
      <div className={style.NoticePage_title_box}>
        <h1 className={style.NoticePage_title}>공지사항</h1>
      </div>

      <div className={style.NoticeItem_box}>
        <div className={style.box}>
          {currentNotices.map((notice, index) => (
            <NoticeItem
              key={startIndex + index}
              text={notice.text}
              date={notice.date}
              index={startIndex + index}
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
  );
}
