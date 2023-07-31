import React, { useState } from "react";
import axios from "axios";
import "../Auth/Login.css"


const initialFormState = {
  email: "",
  password: "",
};


export default function Login() {

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // 로그인
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
      })
      .catch((err) => {
        console.log(err)
      });
  }


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
      </div>
    </div>
  )
}
