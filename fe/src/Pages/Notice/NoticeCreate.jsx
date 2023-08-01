import axios from 'axios';
import React, { useState } from 'react'

const NoticeCreate = () => {
    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
        memberId: 1,
    });

    const {
        boardTitle,
        boardContent,
        memberId,
    } = boardData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value,
        });
    };

    const handleSubmitBtnClick = () => {
        axios({
            method: 'post',  // get, put, post 등의 method 정의
            url: 'http://192.168.31.56:8080/notice/create',     // 요청을 보낼 주소
            headers: {}, // 헤더
            data: boardData
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
            });
    }

    return (
        <div>
            <h3>공지사항 생성</h3>
            <div>
                <span>제목</span>
                <input type="text" name="boardTitle" value={boardTitle} onChange={handleChange} />
            </div>
            <div>
                <span>내용</span>
                <input type="text" name="boardContent" value={boardContent} onChange={handleChange} />
            </div>
            <button onClick={handleSubmitBtnClick}>제출</button>
        </div>
    )
}

export default NoticeCreate