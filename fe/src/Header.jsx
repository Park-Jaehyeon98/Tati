import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css"

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleschedule = () => {
        const email = 't01045999371@gmail.com'
        console.log(email)
        axios.get(`${process.env.REACT_APP_URL}/member/mypage/schedule/${email}`, {
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
        <div className={style.navBox}>
            <nav>
                <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Notice">
                    공지사항
                </NavLink>
                <NavLink className={({ isActive }) => style["nav-link"] + (isActive ? " " + style.click : "")} to="/Faq">
                    FAQ
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
    )
}

export default Header