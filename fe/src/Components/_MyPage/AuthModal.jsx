import React,{useState} from "react";
import style from "./AuthModal.module.css"
import axios from "axios";
import InfoModify from "./InfoModify";
// import { useNavigate } from "react-router-dom";


export default function AuthModal({ setAuthModal, onButtonClick }) {
  
  const [password, setPassword] = useState("")
  // 회원정보
  const [userInfo, setUserInfo] = useState(null);
  // const navigate = useNavigate();

  const handleChange = (p) => {
    const { value } = p.target;
    setPassword(value);
  }

  const closeModal = () => {
    setAuthModal(false);
    onButtonClick("InfoModify");
  };

  const handlecheck = () => {
    console.log(password)
    const email = 't01045999371@gmail.com'
    axios.post(`http://${process.env.REACT_APP_URL}:8080/member/mypage/check`,{
      email,
    password
    })
    .then((res) => {
      console.log(res)  
      setUserInfo(res.data);
      onButtonClick("InfoModify");
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
        {userInfo && <InfoModify userInfo={userInfo} />}
    </div>
  )
}