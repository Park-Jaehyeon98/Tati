import React,{useState} from "react";
import style from "./AuthModal.module.css"
import axios from "axios";



export default function AuthModal({ setAuthModal }) {
  
  // 로컬의 유저pk값을 불러오기
  const retrievedData = localStorage.getItem('useID');

  const [password, setPassword] = useState("")

  const [userInfo, setUserInfo] = useState(null);
  const handleChange = (p) => {
    const { value } = p.target;
    setPassword(value);
  }

  const closeModal = () => {
    setAuthModal(false);
    // 임시===========================================
    window.location.href = "/MyPage/MyPageInfoModify";
  };

  // 유저의 pk와 password 보내기
  // 요청 성공 후 유저의 값을 리덕스로 저장 
  const handlecheck = () => {
    console.log(retrievedData)
    console.log(password)
    axios.post(`http://${process.env.REACT_APP_URL}:8080/member/mypage/check`,{
    password
    })
    .then((res) => {
      console.log(res)  
      setUserInfo(res.data);
      window.location.href = "/MyPage/MyPageInfoModify";
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