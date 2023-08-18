import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import style from "./Login.module.css"
import jwt_decode from "jwt-decode";

import RefreshToken from "../../Components/RefreshToken";

import setIsLoggedIn from "../../router/Router";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userSlice';

import PasswordResetModal from './PasswordResetModal';
// 로딩중 스피너
import Loading from '../../Loading/Loading';

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleOpenPasswordResetModal = () => {
    setShowPasswordResetModal(true);
  };

  const handleClosePasswordResetModal = () => {
    setShowPasswordResetModal(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 로그인
  // 로그인 성공 후 토큰과 유저 pk값을 로컬에 저장
  const handleLogin = () => {
    console.log(`이메일: ${formData.email} 비밀번호: ${formData.password}`)

    console.log(process.env.REACT_APP_URL)
    axios.post(`${process.env.REACT_APP_URL}/member/login`, {
      email: formData.email,
      password: formData.password
    })
      .then((res) => {
        console.log(res)
        console.log(res.headers)

        // decodedToken, accessToken 로컬에 저장 - 유저 정보(memberId,memberName,sub,exp,iat)
        const authorizationHeader = res.headers.authorization;
        const accessToken = authorizationHeader.substring(7);
        localStorage.setItem('accessToken', accessToken);
        const decodedToken = jwt_decode(authorizationHeader);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        localStorage.setItem('refreshtoken', res.headers.refreshtoken);

        const user = {
          createdDate: res.data.createdDate,
          email: res.data.email,
          memberId: res.data.memberId,
          memberName: res.data.memberName,
          memberNickName: res.data.memberNickName,
          totalPoint: res.data.totalPoint,
          totalScore: res.data.totalScore,
          totalStudyTime: res.data.totalStudyTime,
          img: null
        }
        RefreshToken()

        dispatch(setUser(user));

        navigate("/Study");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err)
        alert(`${err.response.data}`)
      })
  }



  return (
    <div className={style.Login_box}>
      <img
        className={style.login_img}
        src="./Assets/Login_img01.jpg"
        alt="Login background"
      />

      <div className={style.login}>
        <h1 className={style.login_title}>로그인</h1>
        <div>
          <input
            className={style.loginInput}
            type="text"
            placeholder="이메일"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className={style.loginInput}
            type="password"
            placeholder="비밀번호"
            name="password"
            value={formData.passWord}
            onChange={handleChange}
          />
        </div>
        <div className={style.Login_box_find}>
          <div className={style.password_find} onClick={handleOpenPasswordResetModal}>
            비밀번호 찾기
          </div>
          <NavLink to="/SignUp" className={style.signup}>
            회원가입
          </NavLink>
        </div>

        <button className={style.loginBtn} onClick={handleLogin}>
          로그인
        </button>
        {/* 
      <div className={style.line1}></div>
      <p>간편로그인</p>
      <div className={style.line2}></div>

      <div className={style.socialLogos}>
        <img
          className={style.loginGoogleLogo}
          src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
          alt="Google 로그인"
        />
        <img
          className={style.loginKakaoLogo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/800px-KakaoTalk_logo.svg.png"
          alt="Kakao 로그인"
        />
        <img
          className={style.loginNaverLogo}
          src="/Assets/네이버.png"
          alt="Naver 로그인"
        />
      </div> */}
      </div>

      {showPasswordResetModal && (
        <PasswordResetModal onClose={handleClosePasswordResetModal} />
      )}

    </div>
  );
}
