import React, { useState } from "react";
<<<<<<< HEAD
import "../Auth/SignUp.css";
import axios from "axios";
=======
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signUpSuccess } from '../../redux/actions/authActions.js';

import axios from "axios";
import style from "./SignUp.module.css"
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e


export default function SignUp() {

<<<<<<< HEAD
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    nickName: "",
    name: "",
    password: "",
    password2: "",
  });
=======
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    {email: "",
    code: "",
    memberNickName: "",
    memberName: "",
    password: "",
    password2: "",}
  );


  const handleCancel = () => {
    window.history.back();
  };
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

<<<<<<< HEAD

  // 이메일 인증
  const handleSendEmail = () => {
    console.log(formData.email)
    axios
      .post(`http://192.168.31.41:8080/member/email-check`, {
=======
//=============================================================================
  // 이메일 인증
  const handleSendEmail = () => {
    console.log(formData.email)
    console.log(process.env.REACT_APP_URL)
    axios
      .post(`http://${process.env.REACT_APP_URL}:8080/member/email-check`, {
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
        email: formData.email, // formData의 email 값을 사용
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
<<<<<<< HEAD
  };
=======
  };  
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e


  // 이메일 인증번호
  const handleSendNumber = () => {
<<<<<<< HEAD
    const code = formData.number; // formData의 number 값을 사용
    axios
      .post(`http://192.168.31.41:8080/member/email-code-check`, {
        email: formData.email, // formData의 email 값을 사용
        code,
=======
    console.log(formData.email);
    console.log(formData.code);
    axios
      .post(`http://${process.env.REACT_APP_URL}:8080/member/email-code-check`, {
        email: formData.email, 
        code: formData.code
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

<<<<<<< HEAD
  // 닉네임 중복 확인
  const handleSendNickName = () => {
    axios
      .post(`http://192.168.31.41:8080/member/nickname-check`, {
        nickName: formData.nickName,
      })
      .then((res) => {
=======

  // 닉네임 중복 확인
  const handleSendNickName = () => {
    axios
      .post(`http://${process.env.REACT_APP_URL}:8080/member/nickname-check`, {
        nickName: formData.nickName, 
      })
      .then((res) => {
        console.log(res)
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
        alert("중복체크성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

<<<<<<< HEAD
  // 회원가입
  const handleSignUp = () => {
    const { email, number, memberNickName, memberName, password, password2 } = formData; // formData의 값들을 각각 변수로 사용

    console.log(email);
    console.log(number);
=======

  // 회원가입
  const handleSignUp = () => {
    const { email, code, memberNickName, memberName, password, password2 } = formData; // formData의 값들을 각각 변수로 사용

    console.log(email);
    console.log(code);
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
    console.log(memberNickName);
    console.log(memberName);
    console.log(password);
    console.log(password2);

    if (
      email === "" ||
<<<<<<< HEAD
      number === "" ||
=======
      code === "" ||
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
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
<<<<<<< HEAD
      .post(`http://192.168.31.41:8080/member/sign-up`, {
=======
      .post(`http://${process.env.REACT_APP_URL}:8080/member/sign-up`, {
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
        email,
        memberName,
        memberNickName,
        password,
      })
      .then((res) => {
        console.log(res);
<<<<<<< HEAD
=======
        dispatch(signUpSuccess(res.data));
        navigate('/Study')
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
      })
      .catch((err) => {
        console.log(err);
      });
  };

<<<<<<< HEAD
  return (
    <div>
      <div id="signup">
        <h1>회원가입</h1>
        <p>
          이메일
          <input
            type="text"
            name="email"
=======

  //================================================================================
  return (
    <div className={style.SignUp_box}>
      <img className={style.img01}src="./Assets/signup02.jpg" alt="" />
      <div className={`${style.signup}`}>
        <h1 className={style.signup_title}>회원가입</h1>
        <p className={style.signup_text}>
          이메일
          <input
          className={style.input_email}
            type="text"
            name="email" 
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
            placeholder="이메일을 입력하시오."
            value={formData.email} // formData의 email 값을 사용
            onChange={handleChange}
          />
<<<<<<< HEAD
          <input type="button" value="인증확인" onClick={handleSendEmail} />
        </p>
        <p>
          이메일 인증
          <input
            type="text"
            name="number"
            placeholder="인증번호를 입력하시오."
            value={formData.number}
            onChange={handleChange}
          />
          <input type="button" value="인증" onClick={handleSendNumber} />
        </p>
        <p>
          이름
          <input
            type="text"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
          />
        </p>
        <p>
          닉네임
          <input
            type="text"
            name="memberNickName"
            value={formData.memberNickName}
            onChange={handleChange}
          />
          <input type="button" value="중복확인" onClick={handleSendNickName} />
          <h6>2~10자 이내</h6>
        </p>
        <p>
          비밀번호
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <h6>8~16자 이내, 특수문자X</h6>
        </p>
        <p>
          비밀번호 확인
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </p>
        <button type="button" onClick={handleSignUp}>
          회원가입완료
        </button>
=======
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
        <p  className={style.signup_text}>
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
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
      </div>
    </div>
  );
}
