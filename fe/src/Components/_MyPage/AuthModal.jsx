import React,{useState} from "react";
import style from "./AuthModal.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/actions/actions'


export default function AuthModal({ setAuthModal }) {
  
  const navigate = useNavigate();
  // 로컬의 유저pk값을 불러오기
  const memberId = localStorage.getItem('memberId');

  const [password, setPassword] = useState("")

  const dispatch = useDispatch();

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
    console.log(`memberId: ${memberId}`)
    console.log(`password: ${password}`)
    console.log('회원가입수정 입장=========================================')

    axios.post(`http://${process.env.REACT_APP_URL}:8080/member/mypage/check`,{
    email:'t01045999371@gmail.com',
    password
    })
    .then((res) => {
      console.log(res.config)
      // dispatch(setUserInfo(res.data));  
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