import React, { useState } from "react";
import "../Auth/SignUp.css";
import axios from "axios";


export default function SignUp() {

  const [formData, setFormData] = useState({
    email: "",
    number: "",
    nickName: "",
    name: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // 이메일 인증
  const handleSendEmail = () => {
    console.log(formData.email)
    axios
      .post(`http://192.168.31.41:8080/member/email-check`, {
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
    const code = formData.number; // formData의 number 값을 사용
    axios
      .post(`http://192.168.31.41:8080/member/email-code-check`, {
        email: formData.email, // formData의 email 값을 사용
        code,
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
    axios
      .post(`http://192.168.31.41:8080/member/nickname-check`, {
        nickName: formData.nickName,
      })
      .then((res) => {
        alert("중복체크성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 회원가입
  const handleSignUp = () => {
    const { email, number, memberNickName, memberName, password, password2 } = formData; // formData의 값들을 각각 변수로 사용

    console.log(email);
    console.log(number);
    console.log(memberNickName);
    console.log(memberName);
    console.log(password);
    console.log(password2);

    if (
      email === "" ||
      number === "" ||
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
      .post(`http://192.168.31.41:8080/member/sign-up`, {
        email,
        memberName,
        memberNickName,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div id="signup">
        <h1>회원가입</h1>
        <p>
          이메일
          <input
            type="text"
            name="email"
            placeholder="이메일을 입력하시오."
            value={formData.email} // formData의 email 값을 사용
            onChange={handleChange}
          />
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
      </div>
    </div>
  );
}
