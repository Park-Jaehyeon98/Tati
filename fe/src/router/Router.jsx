import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import "../router/Router.css"

import NoticePage from "../Pages/Notice/NoticePage";
import Study from "../Pages/Study/Study";
import MyPage from "../Pages/MyPage/_MyPage";
import InfoModify from "../Components/_MyPage/InfoModify";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";
import LandingPage from './../Pages/LandingPage/LandingPage';
import StudyCreate from "../Pages/Study/StudyCreate";
import StudyList from "../Pages/Study/StudyList";
import StudyDetail from "../Pages/Study/StudyDetail";
import StudyModify from "../Pages/Study/StudyModify";
import NoticeCreate from "../Pages/Notice/NoticeCreate";

export default function Router() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/">
          홈
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/NoticePage">
          공지사항
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/Study">
          스터디
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/MyPage">
          마이페이지
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/SignUp">
          회원가입
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/Login">
          로그인
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/StudyCreate">
          스터디생성
        </NavLink>

        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/StudyDetail">
          스터디 디테일
        </NavLink>

        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/StudyList">
          스터디목록
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/StudyModify">
          스터디수정
        </NavLink>
        <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/NoticeCreate">
          공지사항 생성
        </NavLink>
      </nav>

      <Routes>
        <Route path="/NoticePage" element={<NoticePage />} />
        <Route path="/Study" element={<Study />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPage/InfoModify" element={<InfoModify />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Study" element={<Study />} />
        <Route path="/StudyCreate" element={<StudyCreate />} />
        <Route path="/StudyList" element={<StudyList />} />
        <Route path="/Study/:studyId" element={<StudyDetail />} />
        <Route path="/StudyModify/:studyId" element={<StudyModify />} />
        <Route path="/NoticeCreate" element={<NoticeCreate />} />
      </Routes>
    </BrowserRouter>
  );
}
