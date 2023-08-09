
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import style from "./Router.module.css"

import Notice from "../Pages/Notice/Notice";
import NoticePage from "../Pages/Notice/NoticePage";
import NoticeList from "../Pages/Notice/NoticeList";
import NoticeCreate from "../Pages/Notice/NoticeCreate";
import NoticeModify from "../Pages/Notice/NoticeModify";

import Faq from "../Pages/Faq/Faq";
import FaqCreate from "../Pages/Faq/FaqCreate";
import FaqList from "../Pages/Faq/FaqList";

import MyPage from "../Pages/MyPage/Schedule/MyPage";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";
import LandingPage from './../Pages/LandingPage/LandingPage';


import Study from "../Pages/Study/Study";
import StudyCreate from "../Pages/Study/StudyCreate";
import StudyList from "../Pages/Study/StudyList";
import StudyDetail from "../Pages/Study/StudyDetail";
import StudyDetailInfo from "../Pages/Study/StudyDetailInfo";
import StudyModify from "../Pages/Study/StudyModify";

import StudyNotice from "../Pages/Study/StudyNotice";

import StudyBoard from "../Pages/Study/StudyBoard/StudyBoard";
import StudyBoardDetail from "../Pages/Study/StudyBoard/StudyBoardDetail";
import StudyBoardCreate from "../Pages/Study/StudyBoard/StudyBoardCreate";
import StudyBoardList from "../Pages/Study/StudyBoard/StudyBoardList";


import Main from "../Pages/Main/Main";
import KakaoPay from "../Components/MyPage//Point/KakaoPay";

import MyPageInfoModify from "../Pages/MyPage/MyPageInfoModify";
import MyPageApplyStudy from "../Pages/MyPage/Study/MyPageApplyStudy";
import MyPageJoinStudy from "../Pages/MyPage/Study/MyPageJoinStudy";
import MyPagePost from "../Pages/MyPage/Study/MyPagePost";
import MyPagePoint from "../Pages/MyPage/Point/MyPagePoint";
import MyPagePointHistory from "../Pages/MyPage/Point/MyPagePointHistory";
import MyPagePointWithdraw from "../Pages/MyPage/Point/MyPagePointWithdraw";
import MyPageRewardPoint from "../Pages/MyPage/MyPageRewardPoint"

// openvidue
import Room from "../Pages/Room/Room";

// import { aX } from "@fullcalendar/core/internal-common";
import axios from "axios";
import NoticeDetail from "../Pages/Notice/NoticeDetail";
import VideoRoomComponent from "../Pages/Room/VideoRoomComponent";

// 리덕스 툴킷
import { useSelector } from 'react-redux';


export default function Router() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const memberId = useSelector((state) => state.user.memberId);
  // 로컬 닉네임
  const memberNickName = localStorage.getItem('memberNickName');

  const handleLogout = () => {

    const token = localStorage.getItem("accessToken");

    axios.get(`${process.env.REACT_APP_URL}/member/logout`, {
      headers: {
        token: token
      }
    })
      .then((res) =>
        console.log(res)
      )
      .catch((err) =>
        console.log(err)
      )

    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (memberNickName) {
      setIsLoggedIn(true);
    }
  }, []);



  return (
    <BrowserRouter>
      <div className={style.navBox}>
        <nav>
          {/* openvidu */}
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Room">
            openvidu
          </NavLink>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Notice">
            공지사항
          </NavLink>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Faq">
            FAQ
          </NavLink>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Study">
            스터디
          </NavLink>
          <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/MyPage">
            마이페이지
          </NavLink>
          {!memberNickName && (
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/SignUp">
              회원가입
            </NavLink>
          )}
          {memberNickName ? (
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

        {/* openvidu */}
        <Route path="/Room" element={<Room />} />
        <Route path="/VideoRoom" element={<VideoRoomComponent />} />

        {/* 공지사항 */}
        <Route path="/Notice" element={<Notice />}>
          {/* <Route path="" element={<NoticePage />} /> */}
          <Route path="" element={<NoticeList />} />
          <Route path="Create" element={<NoticeCreate />} />
          <Route path=":boardId" element={<NoticeDetail />} />
          <Route path=":boardId/Modify" element={<NoticeModify />} />
        </Route>

        {/* FAQ */}
        <Route path="/Faq" element={<Faq />}>
          <Route path="" element={<FaqList />} />
          <Route path="Create" element={<FaqCreate />} />
        </Route>

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
        <Route path="/MyPage/MyPageRewardPoint" element={<MyPageRewardPoint />} />

        <Route path="/Study" element={<Study />}>
          <Route path="" element={<StudyList />} />
          <Route path="Create" element={<StudyCreate />} />
          <Route path=":studyId" element={<StudyDetail />} >
            <Route path="" element={<StudyDetailInfo />} />
            <Route path="Modify" element={<StudyModify />} />

            {/* 스터디 공지사항 */}
            <Route path="Notice" element={<StudyNotice />}>
              <Route path="" element={<StudyBoardList />} />
              <Route path=":boardId" element={<StudyBoardDetail />} />
              <Route path="Create" element={<StudyBoardCreate />} />
            </Route>
            {/* 스터디 게시판 */}
            <Route path="Board" element={<StudyBoard />}>
              <Route path="" element={<StudyBoardList />} />
              <Route path=":boardId" element={<StudyBoardDetail />} />
              <Route path="Create" element={<StudyBoardCreate />} />
            </Route>
          </Route>
        </Route>

        {/* 스터디 웹rtc 입실 */}
        {/* <Route path="/Study/:studyId/Board/Create" element={}/> */}


      </Routes>
    </BrowserRouter>
  );
}
