import React, {useState}from "react";
import style from "./MyPageBtn.module.css"
import AuthModal from "./AuthModal";
import { useNavigate } from 'react-router-dom';

export default function MyPageBtn(){

    const navigate = useNavigate();

    const [authModal, setAuthModal] = useState(false);

    const handleButtonClick = () => {
        setAuthModal(true);
    };

    const closeModal = () => {
        setAuthModal(false);
    };

    const handleBtnClick=(e)=>{
        console.log(e)
        navigate(e)
    }

    return(
        <div>
            <div>
                <button className={style.btn} onClick={()=>handleBtnClick('/MyPage')}>
                일정
                </button>

                <button className={style.btn} onClick={()=>handleBtnClick("/MyPage/JoinStudy")}>
                내 스터디
                </button>

                <button className={style.btn} onClick={()=>handleBtnClick("/MyPage/MyPagePoint")}>
                    포인트
                </button>

                <button className={style.btn} onClick={()=>handleButtonClick()}>
                회원정보수정
                </button>

                <button className={style.btn} onClick={()=>handleBtnClick("/MyPage/MyPageRewardPoint")}> 
                출결내역
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
    )
}