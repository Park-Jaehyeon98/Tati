<<<<<<< HEAD
import React from "react";


export default function InfoModify(){
  return (
    <div>    </div>
=======
import React,{useState} from "react";
import style from "./InfoModify.module.css"
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InfoModify( ){
  
  const navigate = useNavigate();

  // 회원정보 리덕스에서 가져오기
  const userInfo = useSelector((state) => state.userInfo);
  // 닉네임 중복 확인
  const [nickName, serNickName] = useState("")
  // 회원정보
  const [userData, setUserData] = useState(userInfo);

  const handleChange = (e) => {
    const {value} = e.target;
    serNickName(value)
  };

  // 닉네임 중복체크
  const handleSendNickName = () => {
    console.log(`닉네임 ${nickName}`)
    axios
      .post(`http://${process.env.REACT_APP_URL}:8080/member/nickname-check`, {
        nickName: nickName, 
      })
      .then((res) => {
        alert("중복체크성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 

  // 프로필
  const [profile,setProfile] = useState('')

  const handleProfileChange = (e) => {
    const {value} = e.target;
    setProfile(value)
  };


  // 유저의 pk 와 닉네임을 보냄
  // 요청 성공 후 다시 회원정보 수정 페이지로
  const handleNickNameupdata = () => {
    console.log(`닉네임 ${nickName} 프로필 ${profile}`)
    // window.history.back();
    const email = 'rlaalsrbs15@naver.com'
    axios.put(`http://${process.env.REACT_APP_URL}:8080/member/mypage/modifyNickName`,{
      email,  
    nickName: nickName, 
    })
    .then((res) => {
      alert("수정됨");
    })
    .catch((err) => {
      console.log(err);
      alert("수정이 안됨")
    });
  }

  // 비밀번호 수정
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handlePasswordChange = (p) => {
    const {value} = p.target;
    setPassword(value);
  }

  const handlePassword2Change = (p) => {
    const {value} = p.target;
    setPassword2(value);
  }

  // 유저의 pk와 password를 보냄
  const handleSendPassword = () => {
    if (password !== password2){
      alert('비밀번호가 일치하자 않습니다.')
    }
    axios.put(`http://${process.env.REACT_APP_URL}:8080/member/mypage/modifyPassword`,{
      password
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    });
  }
  //


  // 회원탈퇴 
  // 유저 pk를 url에 삽입 후 보냄 (pk는 로컬에)
  const handleWithdrawal =()=>{
    const email = 'rlaalsrbs15@naver.com'
    axios.delete(`http://${process.env.REACT_APP_URL}:8080/member/mypage/remove/${email}`,{
  
    })
    .then((res) => {
      console.log(res)
      alert('회원탈퇴성공')
      navigate.push("/Login");
    })
    .catch((err) => {
      console.log(err)
    });
  }

  return (
    <div className={style.container}>

      <h2>내정보 수정</h2>
      
      {/* 내정보 */}
      <div className={style.contents}>
        <p className={style.InfoModify_text}>
          이메일
          <p className={style.InfoModify_email}>{userData}</p>
        </p>  
        <p className={style.InfoModify_text}>
          이름
          <p className={style.InfoModify_name}>김싸피</p>
        </p>  
        <p className={style.InfoModify_profile}>
          프로필
          <input name="profile" value={profile} onChange={handleProfileChange} className={style.InfoModify_email} type="file"/>
          <input type="button" value="업로드" />
        </p>  
        <p>
          닉네임
          <input name="NickName" 
            value={nickName} 
            onChange={handleChange}
            className={style.InfoModify_nickname}
             type="text" 
             />
          <button className={style.InfoModify_nickname_check_btn}
            onClick={handleSendNickName}
          >중복체크</button>
        </p>  
        <button className={style.InfoModify_change} onClick={handleNickNameupdata}>완료</button>
      </div>

      <div className={style.InfoModify_line}></div>

      {/* 비밀번호 */}
      <h2>비밀번호 변경</h2>
      <p>비밀번호
        <input 
        className={style.InfoModify_password} 
        name="password" value={password} 
        onChange={handlePasswordChange}
        type="password"/>
      </p>
      <p>비밀번호확인
        <input className={style.InfoModify_password2}
        name="password2" value={password2} 
        onChange={handlePassword2Change}
        type="password"/>
      </p>
      <button 
      className={style.InfoModify_change}
        onClick={handleSendPassword}
      >완료</button>

      <button onClick={handleWithdrawal}>회원탈퇴</button>
    </div>
>>>>>>> 7e1ae3aabb788553f58bc79ec20b90bf4ad9985e
  )
}