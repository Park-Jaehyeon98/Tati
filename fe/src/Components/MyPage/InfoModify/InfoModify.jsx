import React, { useState, useEffect } from "react";
import style from "./InfoModify.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// 리덕스 저장
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/reducers/userSlice';


export default function InfoModify() {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  // 프로필 수정 상태 관리
  const [showProfileEdit, setShowProfileEdit] = useState(true); 

  
  // 리덕스 펄시스트 유저정보를 불러옴
  const user = useSelector(state => state.user.user);
  
  const [imageDataURL, setImageDataURL] = useState(user.img);

  // 로컬의 유저pk값을 불러오기
  const tokenInfo = localStorage.getItem('decodedToken');
  console.log(JSON.parse(tokenInfo));
  const parseJwt = JSON.parse(tokenInfo);

  // 닉네임 중복 확인
  const [nickName, serNickName] = useState(user.memberNickName)
  
  // 회원정보
  const [userData, setUserData] = useState(user);

  const handleChange = (e) => {
    const { value } = e.target;
    serNickName(value)
  };

  // 닉네임 중복체크
  const handleSendNickName = () => {
    console.log(`닉네임 ${nickName}`)
    console.log(process.env.REACT_APP_URL)
    axios.post(`${process.env.REACT_APP_URL}/member/nickname-check`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    }, {
        memberNickName: nickName,
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
  const [file, setFile] = useState(null)

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setFile(()=>{return e.target.files[0]})
  };
  
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);


  
  // 유저의 pk 와 닉네임을 보냄
  // 요청 성공 후 다시 회원정보 수정 페이지로
  const handleNickNameupdata = () => {
    // console.log(file)
    // if(file == null){
    //   setFile(user.img)
    // }
    const memberIdAsNumber = user.memberId;

    console.log(`memberId - ${memberIdAsNumber} nickName - ${nickName} file - ${file}`)

    const formData = new FormData();



    // Id랑 닉네임 입력
    const putMemberReqDto = {
      "memberId": user.memberId,
      "memberNickName": nickName
    };

    formData.append('file', file)

    formData.append('putMemberReqDto', new Blob([JSON.stringify(putMemberReqDto)], {
      type: "application/json"
    }));

    console.log('-------------------------------------------------')

    console.log(imageDataURL)
    // console.log(process.env.REACT_APP_URL)
    axios.put(`${process.env.REACT_APP_URL}/member/mypage/modifyNickName`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위해 Content-Type을 multipart/form-data로 설정
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      },
    })
      .then((res) => {
        console.log(res);

        const updatedUser = { memberNickName: nickName , img:imageDataURL};
        dispatch(updateUser(updatedUser)); // Dispatch the action

        setImageDataURL()
        navigate("/MyPage/MyPageInfoModify");
        alert("수정됨");
      })
      .catch((err) => {
        console.log(err);
        alert("수정이 안됨")
      });
  }


  // 비밀번호 변경
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handlePasswordChange = (p) => {
    const { value } = p.target;
    setPassword(value);
  }

  const handlePassword2Change = (p) => {
    const { value } = p.target;
    setPassword2(value);
  }


  // 유저의 pk와 password를 보냄
  const handleSendPassword = () => {
    if (password !== password2) {
      alert('비밀번호가 일치하자 않습니다.')
    }
    console.log(`비밀번호 변경: ${password} memberId: ${user.memberId}`)
    axios.put(`${process.env.REACT_APP_URL}/member/mypage/modifyPassword`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        RefreshToken: localStorage.getItem('refreshtoken')
      }
    }, {
      memberId:user.memberId,
      password
    })
      .then((res) => {
        console.log(res)
        // navigate("/MyPage/MyPageInfoModify");
      })
      .catch((err) => {
        console.log(err)
      });
  }
  //


  // 회원탈퇴 
  // 유저 pk를 url에 삽입 후 보냄 (pk는 로컬에)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);


  const handleWithdrawal = () => {
      setShowWithdrawalModal(true);
    };

    const confirmWithdrawal = () => {
      axios
        .delete(`${process.env.REACT_APP_URL}/member/mypage/remove/${parseJwt.sub}`,{
          headers:{
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
            RefreshToken: localStorage.getItem('refreshtoken')
          }
        }, {})
        .then((res) => {
          console.log(res);
          alert("회원탈퇴성공");
          navigate.push("/Login");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const cancelWithdrawal = () => {
      setShowWithdrawalModal(false);
    };


  return (
    <div className={style.container}>

      <div className={style.info_box}>

          <div className={style.btns}>
            <h2>내정보 수정</h2>

          <button
            className={style.InfoModify_change}
            onClick={() => setShowProfileEdit(!showProfileEdit)}
          >
            프로필 수정
          </button>
          <button
            className={style.InfoModify_change}
            onClick={() => setShowProfileEdit(!showProfileEdit)}
          >
            비밀번호 변경
          </button>

          <button onClick={handleWithdrawal} className={style.Withdrawal_btn}>회원탈퇴</button>
          </div>

        {/* 내정보 */}
        <div className={style.contents}>

          {showProfileEdit && (
          <>
          <div className={style.user_profile}>
          <p className={style.InfoModify_text}>
            이메일
            <p className={style.InfoModify_email}>{user.email}</p>
          </p>
          <p className={style.InfoModify_text}>
            이름
            <p className={style.InfoModify_name}>{user.memberName}</p>
          </p>
          <p className={style.InfoModify_profile}>
            <p className={style.InfoModify_profile_p}>프로필</p>

            <label htmlFor="profile" className={`${style.customFileInput} ${style.centeredText}`}>
              이미지 업로드
              <input 
                id="profile" // htmlFor와 연결할 ID
                name="profile" 
                accept="image/*" 
                onChange={handleImageChange} 
                type="file"
                style={{ display: 'none' }} // 파일 입력 필드를 숨김
              />
            </label>  

          {imageDataURL && <img src={imageDataURL} alt="Uploaded" className={style.file_img} />}
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
          </div>

          <button className={`${style.InfoModify_change} ${style.profile_btn}`} onClick={handleNickNameupdata}>완료</button>
          </>
          )}
          </div>
      {/* 비밀번호 */}
      {!showProfileEdit &&(<>
      <div className={style.password_change}>
      <h2>비밀번호 변경</h2>
      <p>비밀번호
        <input
          className={style.InfoModify_password}
          name="password" value={password}
          onChange={handlePasswordChange}
          type="password" />
      </p>
      <p>비밀번호확인
        <input className={style.InfoModify_password2}
          name="password2" value={password2}
          onChange={handlePassword2Change}
          type="password" />
      </p>
      </div>
      <button
        className={`${style.InfoModify_change} ${style.password_btn}`}
        onClick={handleSendPassword}
      >완료</button></>
      )}
        </div>

      {/* <div className={style.InfoModify_line}></div> */}

        


      {showWithdrawalModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <h3>회원탈퇴 경고</h3>
            <p>정말로 회원탈퇴 하시겠습니까?</p>
            <button onClick={confirmWithdrawal}>확인</button>
            <button onClick={cancelWithdrawal}>취소</button>
          </div>
        </div>
      )}
    </div>
  )
}