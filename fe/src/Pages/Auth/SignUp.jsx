import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from '../../redux/actions/authActions.js';

import axios from "axios";
import style from "./SignUp.module.css"


export default function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    {
      email: "",
      code: "",
      memberNickName: "",
      memberName: "",
      password: "",
      password2: "",
    }
  );


  const handleCancel = () => {
    window.history.back();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //=============================================================================
  // 이메일 인증
  const handleSendEmail = () => {
    console.log(formData.email)
    console.log(process.env.REACT_APP_URL)
    axios
      .post(`${process.env.REACT_APP_URL}/member/email-check`, {
        email: formData.email, // formData의 email 값을 사용
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // 이메일 인증번호
  const handleSendNumber = () => {
    console.log(formData.email);
    console.log(formData.code);
    axios
      .post(`${process.env.REACT_APP_URL}/member/email-code-check`, {
        email: formData.email,
        code: formData.code
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // 닉네임 중복 확인
  const handleSendNickName = () => {
    console.log(formData.memberNickName)
    console.log(process.env.REACT_APP_URL)
    axios
      .post(`${process.env.REACT_APP_URL}/member/nickname-check`, {
        memberNickName: formData.memberNickName,
      })
      .then((res) => {
        console.log(res)
        alert("중복체크성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // 회원가입
  const handleSignUp = () => {
    const { email, code, memberNickName, memberName, password, password2 } = formData; // formData의 값들을 각각 변수로 사용

    console.log(email);
    console.log(code);
    console.log(memberNickName);
    console.log(memberName);
    console.log(password);
    console.log(password2);

    if (
      email === "" ||
      code === "" ||
      memberNickName === "" ||
      memberName === "" ||
      password === "" ||
      password2 === ""
    ) {
      alert("입력 해주세요.");
    } else if (password !== password2) {
      alert("비밀번호가 서로 다릅니다.");
    }

    axios
      .post(`${process.env.REACT_APP_URL}/member/sign-up`, {
        email,
        memberName,
        memberNickName,
        password,
      })
      .then((res) => {
        console.log(res);
        dispatch(signUpSuccess(res.data));
        navigate('/Study')
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //================================================================================
  return (
    <div className={style.SignUp_box}>
      <img className={style.img01} src="./Assets/signup02.jpg" alt="" />
      <div className={`${style.signup}`}>
        <h1 className={style.signup_title}>회원가입</h1>
        <p className={style.signup_text}>
          이메일
          <input
            className={style.input_email}
            type="text"
            name="email"
            placeholder="이메일을 입력하시오."
            value={formData.email} // formData의 email 값을 사용
            onChange={handleChange}
          />
          <input className={style.btn_check} type="button" value="인증" onClick={handleSendEmail} />
        </p>
        <p className={style.signup_text}>
          인증번호
          <input
            className={style.input_email_check}
            type="password"
            name="code"
            placeholder="인증번호를 입력하시오."
            value={formData.code}
            onChange={handleChange}
          />
          <input className={style.btn_check} type="button" value="인증" onClick={handleSendNumber} />
        </p>
        <p className={style.signup_text}>
          이름
          <input
            className={style.input_name}
            type="text"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
          />
        </p>
        <p className={style.signup_text}>
          닉네임
          <input
            className={style.input_nickname}
            type="text"
            name="memberNickName"
            value={formData.memberNickName}
            onChange={handleChange}
          />
          <input className={style.btn_check} type="button" value="중복확인" onClick={handleSendNickName} />
          <h6 className={style.caution}>2~10자 이내</h6>
        </p>
        <p className={style.signup_text}>
          비밀번호
          <input
            className={style.input_password}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <h6 className={style.caution}>8~16자 이내, 특수문자X</h6>
        </p>
        <p className={style.signup_text}>
          비밀번호확인
          <input
            className={style.input_password_check}
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </p>
        <button
          className={style.signup_btn}
          type="button" onClick={handleSignUp}>
          회원가입완료
        </button>
        <button
          className={style.cancel_btn}
          onClick={handleCancel}
        >
          취소
        </button>
      </div >
    </div >
  );
}
