import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Aside.module.css"
import AuthModal from "./AuthModal";

export default function Aside() {

  const navigate = useNavigate();

  const [authModal, setAuthModal] = useState(false);

  const totalPoint = localStorage.getItem('totalPoint');
  const memberNickName = localStorage.getItem('memberNickName');

  const onButtonClick = (page) => {
    if (page === "schedule") {
      navigate("/MyPage");
    } else if (page === "StudyList") {
      // StudyList 페이지로 이동하는 동작 구현
      navigate("/MyPage/JoinStudy");
    } else if (page === "Point") {
      // Point 페이지로 이동하는 동작 구현
      navigate("/MyPage/MyPagePoint");
    } else if (page === "AuthModal") {
      handleButtonClick(); // 회원정보수정 모달을 열기
    } else if (page === "RewardPoint") {
      navigate("/MyPage/MyPageRewardPoint"); // 상벌점내역 페이지로 이동
    }
  };

  const handleButtonClick = () => {
    setAuthModal(true);
  };

  const closeModal = () => {
    setAuthModal(false);
  };

  return (
    <div className={style.box1}>
      <div className={style.box4}>
        <img className={style.box4} src="https://images.squarespace-cdn.com/content/v1/5dec67bb31a1cc1ad78a7326/1602465793445-KHV22QMIC8VPDWDFKE4D/0b2f8a51314ab1ebe0505aee843a33b1.jpg" alt="" />
      </div>

      <div className={style.name_point}>
        <p>{memberNickName}</p>
        <p>마일리지 {totalPoint}pt</p>
      </div>
      <div>
        <button className={style.bt} onClick={() => onButtonClick("schedule")}>
          일정
        </button>
        <button className={style.bt} onClick={() => onButtonClick("StudyList")}>
          스터디목록
        </button>
        <button className={style.bt} onClick={() => onButtonClick("Point")}>
          마일리지
        </button>
        <button className={style.bt} onClick={() => onButtonClick("AuthModal")}>
          회원정보수정
        </button>
        <button className={style.bt} onClick={() => onButtonClick("RewardPoint")}>
          상벌점내역
        </button>
      </div>

      <div>
        {authModal &&
          <div className={style.modal_backdrop}>
            <AuthModal setAuthModal={setAuthModal} onButtonClick={handleButtonClick} closeModal={closeModal} />
          </div>
        }
      </div>
    </div>
  );
}
