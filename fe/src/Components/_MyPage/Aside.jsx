<<<<<<< HEAD
import React from "react";
import "../_MyPage/Aside.css";

export default function Aside({ onButtonClick }) {
  return (
    <div id="box1">
      <div id="box4">
        유저정보
      </div>

      <p>김싸피</p>
      <p>마일리지 30000pt</p>
      <div id="bt">
        <button id="bt" onClick={() => onButtonClick("schedule")}>일정</button>
        <button id="bt"onClick={() => onButtonClick("StudyList")}>스터디목록</button>
        <button id="bt"onClick={() => onButtonClick("Point")}>마일리지</button>
        <button id="bt"onClick={() => onButtonClick("info")}>회원가입수정</button>
=======
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import style from "./Aside.module.css"
import AuthModal from "./AuthModal";

export default function Aside() {

  const navigate = useNavigate();

  const [authModal, setAuthModal] = useState(false); 


  const onButtonClick = (page) => {
    if (page === "schedule") {
      navigate("/MyPage");
    } else if (page === "StudyList") {
      // StudyList 페이지로 이동하는 동작 구현
      navigate("/MyPage/MyPageStudyList");
    } else if (page === "Point") {
      // Point 페이지로 이동하는 동작 구현
      navigate("/MyPage/MyPagePoint");
    } else if (page === "AuthModal") {
      handleButtonClick(); // 회원정보수정 모달을 열기
    }
  };

  const handleButtonClick = () => {
      setAuthModal(true); 
  };
  
  const closeModal  = () => {
    setAuthModal(false); 
  };

  return (
    <div className={style.box1}>
      <div className={style.box4}>
        <img className={style.box4} src="https://images.squarespace-cdn.com/content/v1/5dec67bb31a1cc1ad78a7326/1602465793445-KHV22QMIC8VPDWDFKE4D/0b2f8a51314ab1ebe0505aee843a33b1.jpg" alt="" />
      </div>

      <div className={style.name_point}>
        <p>김싸피</p>
        <p>마일리지 30000pt</p>
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
      </div>

      <div>
        {authModal && 
        <div className={style.modal_backdrop}>
          <AuthModal setAuthModal={setAuthModal} onButtonClick={handleButtonClick} closeModal={closeModal} />
        </div>
        }
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
      </div>
    </div>
  );
}
