import React, { useState } from "react";
import style from "./_Mypage.module.css"
import Aside from "../../Components/_MyPage/Aside";
import InfoModify from "../../Components/_MyPage/InfoModify";
import Schedule from "../../Components/_MyPage/Schedule";
import Point from "../../Components/_MyPage/Point";
import StudyList from "../../Components/_MyPage/StudyList";

import AuthModal from "../../Components/_MyPage/AuthModal";


export default function MyPage() {
  const [show, setShow] = useState(<Schedule />);
  const [authModal, setAuthModal] = useState(false); 


  const handleButtonClick = (buttonType) => {
    console.log(buttonType)
  if (buttonType === "schedule") {
      setShow(<Schedule />);
    } else if (buttonType === "Point") {
      setShow(<Point />);
    } else if (buttonType === "StudyList") {
      setShow(<StudyList />);
    } else if (buttonType === "AuthModal") {
      setAuthModal(true); 
    } else if (buttonType === "InfoModify") {
      setShow(<InfoModify />);
      setAuthModal(false);
    }
  };
  
  const closeModal  = () => {
    setAuthModal(false); 
  };

  return (
    <div className={style.myPage}>
      <Aside onButtonClick={handleButtonClick} />

      <div className={style.box2}>
        {show}
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
