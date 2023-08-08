import React from 'react'
import {useNavigate} from "react-router-dom"

const Room = () => {
    const navigate = useNavigate();

    const enterRoom = () => {        
        navigate("/VideoRoom");

        //회원 닉네임, 회원 식별번호, 스터디 식별번호 저장 필요 -> 입실버튼 클릭후 회의실에 입장할 때 사용해야함
    };

    return (
        //입실하기 클릭시 비디오룸 입장
        <form className="form-group" onSubmit={enterRoom}>
            <p className="text-center">
                <input className="btn btn-lg btn-success" type="submit" value="입실하기"  />
            </p>
        </form>
    )
}

export default Room