import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const NoticeCreate = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);

    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
        memberId: user.memberId,
        // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ
    });

    const boardType = 0;
    const config = 0;

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
        const subURL = boardType === 0 ? 'notice' : 'faq'
        console.log(subURL)
        apiClient.post(subURL, boardData)
            .then((res) => {
                console.log(res);
                handleCreateBtnClick();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleCreateBtnClick = () => {
        navigate('/Notice')
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