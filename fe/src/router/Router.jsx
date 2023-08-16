import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import style from "./Router.module.css"

// 공지사항
import Notice from "../Pages/Notice/Notice";
import NoticeList from "../Pages/Notice/NoticeList";
import NoticeCreate from "../Pages/Notice/NoticeCreate";
import NoticeModify from "../Pages/Notice/NoticeModify";

// FAQ
import Faq from "../Pages/Faq/Faq";
import FaqCreate from "../Pages/Faq/FaqCreate";
import FaqList from "../Pages/Faq/FaqList";
import FaqModify from "../Pages/Faq/FaqModify";

// 회원
import MyPage from "../Pages/MyPage/Schedule/MyPage";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";

// 스터디
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
// import CustomVideoRoomComponent from './../Pages/Room/CustomVideoRoomComponent';


// 리덕스 툴킷
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { persistor } from '../redux/store';
import { setUser, clearUser } from '../redux/reducers/userSlice';
import { clearUserSchedule } from '../redux/reducers/userScheduleSlice'

import {clearUserStudySchedule} from "../redux/reducers/userStudyScheduleSlice";


import AuthModal from "../Components/MyPage/AuthModal";
import StudyBoardModify from './../Pages/Study/StudyBoard/StudyBoardModify';


export default function Router() {

  const dispatch = useDispatch();


  const [authModal, setAuthModal] = useState(false);

  const handleButtonClick = () => {
    setAuthModal(true);
  };

  const closeModal = () => {
    setAuthModal(false);
  };

  // 모달을 표시할지 여부를 상태로 관리
  const [showModal, setShowModal] = useState(false);

  const handleMouseLeave = () => {
    setShowModal(false); // 마우스가 마이페이지 영역을 벗어나면 모달을 닫음
  };

  // 모달을 열고 닫는 함수
  const handleModalClick = () => {
    setShowModal(!showModal);
  };


  // 유저 정보 리덕스에서 가져오기
  const user = useSelector((state) => state.user.user);


  // 로그아웃
  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshtoken");

    axios.get(`${process.env.REACT_APP_URL}/member/logout`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "RefreshToken": refreshToken
      }
    })
      .then((res) => {
        console.log(res);
        localStorage.clear();
        dispatch(clearUserStudySchedule())
        dispatch(clearUserSchedule())
        dispatch(clearUser());
        // setIsLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <BrowserRouter>
      <div className={style.navBox}>
        <nav>
          <div className={style.logo}>타티
            <img className={style.logo_img} src="/Assets/logo.png" alt="" />
          </div>
          <div className={style.navBoxIn}>
            {/* openvidu */}
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Room">
              openvidu
            </NavLink>
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Study">
              스터디
            </NavLink>
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Notice">
              공지사항
            </NavLink>
            <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Faq">
              FAQ
            </NavLink>
            {user && (<NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/MyPage" >
              마이페이지
            </NavLink>)}
            {user && (<NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")}
             to="/Login" onClick={handleLogout}>로그아웃</NavLink>)}
            {!user && (
              <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Login">
                로그인
              </NavLink>
            )}
          </div>
        </nav>
        <hr className={style.nav_hr} />


        {/* 회원정보수정페이지로 가는 모달 */}
        <div>
          {authModal &&
            <div className={style.modal_backdrop}>
              <AuthModal setAuthModal={setAuthModal} onButtonClick={handleButtonClick} closeModal={closeModal} />
            </div>
          }
        </div>

      </div>

      <Routes>

        <Route path="/" element={<Main />} />

        {/* openvidu */}
        <Route path="/Room" element={<Room />} />
        <Route path="/VideoEnter" element={<VideoRoomComponent />} />
        {/* <Route path="/CustomVideoRoom" element={<CustomVideoRoomComponent />} /> */}


        {/* 공지사항 */}
        <Route path="/Notice" element={<Notice />}>
          <Route path="" element={<NoticeList />} />
          <Route path="Create" element={<NoticeCreate />} />
          <Route path=":boardId" element={<NoticeDetail />} />
          <Route path=":boardId/Modify" element={<NoticeModify />} />
        </Route>

        {/* FAQ */}
        <Route path="/Faq" element={<Faq />}>
          <Route path="" element={<FaqList />} />
          <Route path="Create" element={<FaqCreate />} />
          <Route path="FaqModify" element={<FaqModify />} />
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

        {/* 스터디 */}
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
              <Route path=":boardId/Modify" element={<StudyBoardModify />} />
              <Route path="Create" element={<StudyBoardCreate />} />
            </Route>

            {/* 스터디 게시판 */}
            <Route path="Board" element={<StudyBoard />}>
              <Route path="" element={<StudyBoardList />} />
              <Route path=":boardId" element={<StudyBoardDetail />} />
              <Route path=":boardId/Modify" element={<StudyBoardModify />} />
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
