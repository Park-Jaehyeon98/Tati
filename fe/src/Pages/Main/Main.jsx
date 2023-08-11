import React, { useState, useEffect } from "react";
import style from './Main.module.css';

export default function Main() {
  const handleButtonClick = () => {
    window.location.href = "/login"; // 로그인 페이지의 경로를 여기에 입력합니다.
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <img className={style.img01} src="./Assets/Main01.jpg" alt="" />

      <div className={style.Main_title}>
        <p className={style.Main_title01}>참석하면 돈을 얻는 온라인 스터디</p>
        <p className={style.Main_title02}>Earn money by <br /> attending</p>
        <button className={style.Main_start_btn} onClick={handleButtonClick}>
          지금 바로 시작하기
        </button>
      </div>

      <h1 className={style.Main_title03}>🌟타티는 이런 분들을 원해요🌟</h1>
      <img className={style.img02} src="./Assets/Main02.png" alt="" />
      <img className={style.img03} src="./Assets/Main03.jpg" alt="" />

      {showScrollToTop && (
        <button className={style.scroll_to_top_btn} onClick={scrollToTop}>
          맨 위로 이동
        </button>
      )}
    </div>
  );
}
