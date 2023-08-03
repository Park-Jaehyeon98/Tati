
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import style from "./Router.module.css"

import NoticePage from "../Pages/Notice/NoticePage";
import NoticeCreate from "../Pages/Notice/NoticeCreate";

import MyPage from "../Pages/MyPage/_MyPage";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";
import LandingPage from './../Pages/LandingPage/LandingPage';


import StudyCreate from "../Pages/Study/StudyCreate";
import StudyList from "../Pages/Study/StudyList";
import StudyDetail from "../Pages/Study/StudyDetail";
import StudyModify from "../Pages/Study/StudyModify";

import StudyNotice from "../Pages/Study/StudyNotice/StudyNotice";
import StudyNoticeList from "../Pages/Study/StudyNotice/StudyNoticeList";
import StudyNoticeCreate from "../Pages/Study/StudyNotice/StudyNoticeCreate";
import StudyNoticeDetail from './../Pages/Study/StudyNotice/StudyNoticeDetail';

import StudyBoard from "../Pages/Study/StudyBoard/StudyBoard";
import StudyBoardDetail from "../Pages/Study/StudyBoard/StudyBoardDetail";
import StudyBoardCreate from "../Pages/Study/StudyBoard/StudyBoardCreate";
import StudyBoardList from "../Pages/Study/StudyBoard/StudyBoardList";

import Main from "../Pages/Main/Main";
import KakaoPay from "../Components/_MyPage/KakaoPay";

import MyPageInfoModify from "../Pages/MyPage/_MyPageInfoModify";
import MyPageApplyStudy from "../Pages/MyPage/_MyPageApplyStudy";
import MyPageJoinStudy from "../Pages/MyPage/_MyPageJoinStudy";
import MyPagePost from "../Pages/MyPage/_MyPagePost";
import MyPagePoint from "../Pages/MyPage/_MyPagePoint";
import MyPagePointHistory from "../Pages/MyPage/_MyPagePointHistory";
import MyPagePointWithdraw from "../Pages/MyPage/_MyPagePointWithdraw";



// import { aX } from "@fullcalendar/core/internal-common";
import axios from "axios";


export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleschedule = () => {
    const email = 't01045999371@gmail.com'
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
    localStorage.removeItem("memberId");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    if (memberId) {
      setIsLoggedIn(true);
    }
  }, []);



  return (
    <BrowserRouter>
      <div className={style.navBox}>
        <nav>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/NoticePage">
            공지사항
          </NavLink>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Study">
            스터디
          </NavLink>
          <NavLink onClick={handleschedule} className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/MyPage">
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
        <hr className={style.nav_hr} />
      </div>

      <Routes>

        <Route path="/" element={<Main />} />

        {/* 공지사항 */}
        <Route path="/NoticePage" element={<NoticePage />} />
        <Route path="/NoticeCreate" element={<NoticeCreate />} />

        {/* FAQ */}


        {/* Auth (회원가입 로그인 로그아웃) */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Login />} />


        <Route path="/payment/success" element={<KakaoPay />} />

        {/* 마이페이지 */}
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/MyPageInfoModify" element={<MyPageInfoModify />} />
        <Route path="/MyPage/MyPagePoint" element={<MyPagePoint />} />
        <Route path="/MyPage/PointHistory" element={<MyPagePointHistory />} />
        <Route path="/MyPage/PointWithdraw" element={<MyPagePointWithdraw />} />
        <Route path="/MyPage/ApplyStudy" element={<MyPageApplyStudy />} />
        <Route path="/MyPage/JoinStudy" element={<MyPageJoinStudy />} />
        <Route path="/MyPage/MyPagePost" element={<MyPagePost />} />

        {/* 스터디 CRUD */}
        <Route exact path="/Study" element={<StudyList />} />
        <Route path="/StudyCreate" element={<StudyCreate />} />
        <Route path="/Study/:studyId" element={<StudyDetail />} />
        <Route path="/StudyModify/:studyId" element={<StudyModify />} />

        {/* 스터디 공지사항 */}
        <Route path="/Study/:studyId/Notice" element={<StudyNotice />}>
          <Route path="" element={<StudyNoticeList />} />
          <Route path=":boardId" element={<StudyNoticeDetail />} />
          <Route path="Create" element={<StudyNoticeCreate />} />
        </Route>


        {/* 스터디 게시판 */}
        <Route path="/Study/:studyId/Board" element={<StudyBoard />}>
          <Route path="" element={<StudyBoardList />} />
          <Route path=":boardId" element={<StudyBoardDetail />} />
          <Route path="Create" element={<StudyBoardCreate />} />
        </Route>
        {/* 스터디 웹rtc 입실 */}
        {/* <Route path="/Study/:studyId/Board/Create" element={}/> */}


      </Routes>
    </BrowserRouter>
  );
}
