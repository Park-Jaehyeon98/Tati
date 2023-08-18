import React, { useState } from 'react';
import style from './PasswordResetModal.module.css';
import axios from 'axios';

const PasswordResetModal = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRequestReset = () => {
    
    axios.post(`${process.env.REACT_APP_URL}/member/login`, {
      email: email,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        alert(`${err.response.data}`)
      });
    onClose();
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modalContent}>
        <h2>비밀번호 재설정</h2>
        <input
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
        />
        <div className={style.btn}>
          <button onClick={handleRequestReset}>요청</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;
