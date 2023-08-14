import React,{useState} from "react";
import style from "./AuthModal.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import Login from "../../Pages/Auth/Login";

export default function AuthModal({ setAuthModal }) {
  
  // 리덕스 펄시스트 유저정보를 불러옴
  const user = useSelector(state => state.user.user);

  const navigate = useNavigate();

  const [password, setPassword] = useState("")

  // const userInfo = useSelector((state) => state.userReducer.userInfo);

  const handleChange = (p) => {
    const { value } = p.target;
    setPassword(value);
  }

  const closeModal = () => {
    setAuthModal(false);
    // 임시===========================================
    navigate("/MyPage/MyPageInfoModify");
  };

  // 유저의 pk와 password 보내기
  // 요청 성공 후 유저의 값을 리덕스로 저장 
  const handlecheck = () => {
    // console.log(userInfo)
    console.log('회원가입수정 입장=========================================')
    console.log(`email: ${user.email}`)
    console.log(`password: ${password}`)
    console.log('회원가입수정 입장=========================================')

    console.log(process.env.REACT_APP_URL)
    axios.post(`${process.env.REACT_APP_URL}/member/mypage/check`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    },{
    email:user.email,
    password
    })
    .then((res) => {
      console.log(res)
      setAuthModal(false);
      navigate("/MyPage/MyPageInfoModify");
    })
    .catch((err) => {
      console.log(err)
    });
  }


  return(
    <div className={style.AuthModal}>
      <h2 className={style.message_password}>현재 비밀번호를 입력하세요</h2>
      <input className={style.password_input} type="password" name="password" value={password} onChange={handleChange}/>
        <button className={style.close} onClick={closeModal}>
            취소
        </button>
        <button className={style.open} onClick={handlecheck}>
            확인
        </button>
    </div>
  )
}