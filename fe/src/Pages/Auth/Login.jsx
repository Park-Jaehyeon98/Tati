<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
import "../Auth/Login.css"


const initialFormState = {
  email: "",
  password: "",
};


export default function Login() {

  const [formData, setFormData] = useState(initialFormState);
=======
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css"


export default function Login(){

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  password: "",});
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // 로그인
<<<<<<< HEAD
  const handleLogin = () => {
    console.log(`이메일: ${formData.email} 비밀번호: ${formData.password}`)

    axios.post(`http://192.168.31.41:8080/member/login`, {
      email: formData.email,
      password: formData.password
    })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        console.log("로그인 성공");
        console.log(res)
=======
  // 로그인 성공 후 토큰과 유저 pk값을 로컬에 저장
  const handleLogin = () => {
    console.log(`이메일: ${formData.email} 비밀번호: ${formData.password}`)
  
    axios.post(`http://${process.env.REACT_APP_URL}:8080/member/login`, { 
      email: formData.email, 
      password: formData.password
    })
      .then((res) => {
        console.log(res)
        console.log(res.headers.refreshtoken)
        // 로컬 스토리지에 데이터 저장
        localStorage.setItem('memberId', res.data.memberId);

        navigate("/MyPage");
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
      })
      .catch((err) => {
        console.log(err)
      });
  }


<<<<<<< HEAD
  return (
    <div>
      <div id="login">
        <h1>로그인</h1>
        <p>
          <input className="loginInput" type="text" name="email" value={formData.email} onChange={handleChange} />
          <br />
          <input className="loginInput" type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} />
        </p>
        <button id="loginBtn" onClick={handleLogin}>로그인</button>
        <div class="line1"></div>
        <p>간편로그인</p>
        <div class="line2"></div>
        <img id="loginGoogleLogo" src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />
        <img id="loginKakaoLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/800px-KakaoTalk_logo.svg.png" alt="" />
        <img id="loginNaverLogo" src="/Assets/네이버.png" alt="" />
=======

  return(
    <div className={style.Login_box}>
        <img className={style.login_img} src="./Assets/Login_img01.jpg" alt="" />
        
        <div className={style.login}>
          <h1 className={style.login_title}>로그인</h1>
          <p>
            <input className={style.loginInput} 
            type="text" 
            placeholder="이메일" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} />
            <br />
            <input className={style.loginInput} 
            type="password" 
            placeholder="비밀번호" 
            name="password" 
            value={formData.passWord} 
            onChange={handleChange} />
          </p>
          <div className={style.Login_box_find}>
            <h5 className={style.password_find}>
              비밀번호 찾기</h5>
            <h5 className={style.signup}>
              회원가입</h5>
          </div>
          <button className={style.loginBtn} 
          onClick={handleLogin}>
            로그인</button>
        <div className={style.line1}></div>
        <p>간편로그인</p>
        <div className ={style.line2}></div>

        <img className={style.loginGoogleLogo} 
        src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />
        {/* kakao 로그인 */}
        <img className={style.loginKakaoLogo} 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/800px-KakaoTalk_logo.svg.png" 
        alt="" />

        <img className={style.loginNaverLogo} 
        src="/Assets/네이버.png" alt="" />

>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
      </div>
    </div>
  )
}
