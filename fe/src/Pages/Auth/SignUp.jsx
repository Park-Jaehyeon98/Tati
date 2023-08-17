import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import style from "./SignUp.module.css"
//로딩중
import Loading from "../../Loading/Loading";
import Tooltip from "../../Components/Common/Tooltip";

export default function SignUp() {

  const navigate = useNavigate();


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

  // 로딩중 스피너
  const [loadingError, setLoadingError] = useState(false);

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
    console.log(formData.email);
    console.log(process.env.REACT_APP_URL);
    setLoadingError(true);

    axios
      .post(`${process.env.REACT_APP_URL}/member/email-check`, {
        email: formData.email,
      })
      .then((res) => {
        console.log(res);
        alert('인증 메일이 발송되었습니다.')
      })
      .catch((err) => {
        console.log(err);
        alert('이메일을 다시 입력해주세요.')
      })
      .finally(() => {
        setLoadingError(false);
      });

  };


  // 이메일 인증번호
  const handleSendNumber = () => {

    setLoadingError(true);
    axios
      .post(`${process.env.REACT_APP_URL}/member/email-code-check`, {
        email: formData.email,
        code: formData.code
      })
      .then((res) => {
        console.log(res);
        alert("이메일 인증확인");
      })
      .catch((err) => {
        console.log(err);
        alert("인증번호가 잘못되었습니다.");
      })
      .finally(() => {
        setLoadingError(false);
      });
  };


  // 닉네임 중복 확인
  const handleSendNickName = () => {
    console.log(formData.memberNickName)
    setLoadingError(true);
    if (formData.memberNickName.length < 2 || formData.memberNickName.length > 10) {
      alert("2~10자 이내로 지어주세요.");
    } else{

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
        alert("중복체크실패");
      })
      .finally(() => {
        setLoadingError(false);
      });
    }
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

    setLoadingError(true);

    if (
      email === "" ||
      code === "" ||
      memberNickName === "" ||
      memberName === "" ||
      password === "" ||
      password2 === ""
    ) {
      alert("입력 해주세요.");
      setLoadingError(false);
    } else if (password !== password2) {
      alert("비밀번호가 서로 다릅니다.");
      setLoadingError(false);
    }else{
      axios
        .post(`${process.env.REACT_APP_URL}/member/sign-up`, {
          email,
          memberName,
          memberNickName,
          password,
        })
        .then((res) => {
          console.log(res);
          navigate('/Login')
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoadingError(false);
        });
    }

  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [showNickNameHint, setShowNickNameHint] = useState(false);

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
          닉네임
          <div className={style.tooltip}>
            <input
              className={style.input_nickname}
              type="text"
              name="memberNickName"
              placeholder="닉네임은 2~10글자 이내"
              value={formData.memberNickName}
              onChange={handleChange}
              onMouseEnter={() => setShowNickNameHint(true)}
              onMouseLeave={() => setShowNickNameHint(false)}
            />
            <input
              className={style.btn_check}
              type="button"
              value="중복확인"
              onClick={handleSendNickName}
            />
            {showNickNameHint && (
              <div className={style.tooltip_content}>
                <p>2~10자 이내</p>
              </div>
            )}
          </div>
        </p>

        <p className={style.signup_text}>
          이름
          <input
            className={style.input_name}
            type="text"
            placeholder="본인 이름을 입력해주세요."
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
          />
        </p>

        <p className={style.signup_text}>
          <span>비밀번호</span>
          <div className={style.tooltip}>
            <input
              className={style.input_password}
              type="password"
              name="password"
              placeholder="8~16글자 이내 특수문자X"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </p>


        <p className={`${style.signup_text} ${style.password}`}>
          비밀번호확인
          <input
            className={style.input_password_check}
            type="text"
            name="password2"
            placeholder="패스워드를 확인합니다."
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


      {/* 로딩 모달 */}
      {loadingError && (
          <div className={`${style.modal}`}>
            <Loading />
          </div>
        )}
    </div >
  );
}
