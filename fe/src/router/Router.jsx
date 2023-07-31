import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import style from "./Router.module.css"

import NoticePage from "../Pages/Notice/NoticePage";
import Study from "../Pages/Study/Study";
import MyPage from "../Pages/MyPage/_MyPage";
import InfoModify from "../Components/_MyPage/InfoModify";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";
import Main from "../Pages/Main/Main";
import KakaoPay from "../Components/_MyPage/KakaoPay";
import CreateNotice from "../Pages/Notice/CreateNotice";

// import { aX } from "@fullcalendar/core/internal-common";
import axios from "axios";


export default function Router() {

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleschedule = () => {
    const email='t01045999371@gmail.com'
    console.log(email)
    axios.get(`http://${process.env.REACT_APP_URL}:8080/member/mypage/schedule/${email}`, { 
      params: 7
    })
      .then((res) => {
        console.log(res)
        alert('요청 성공')
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <BrowserRouter>
      <div className={style.navBox}>
        <nav>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")}to="/NoticePage">
            공지사항
          </NavLink>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")}to="/Study">
            스터디
          </NavLink>
          <NavLink onClick={handleschedule} className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")}to="/MyPage">
            마이페이지
          </NavLink>
          {!isLoggedIn && (
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/SignUp">
              회원가입
            </NavLink>
          )}
          {isLoggedIn ? (
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Logout" onClick={handleLogout}>
              로그아웃
            </NavLink>
          ) : (
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Login">
              로그인
            </NavLink>
          )}
        </nav>
        <hr className={style.nav_hr}/>
      </div>

      <Routes>
        <Route path="/NoticePage" element={<NoticePage />} />
        <Route path="/Study" element={<Study />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/InfoModify" element={<InfoModify />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/payment/success" element={<KakaoPay />} />
        <Route path="/CreateNotice" element={<CreateNotice />} />
      </Routes>
    </BrowserRouter>
  );
}
