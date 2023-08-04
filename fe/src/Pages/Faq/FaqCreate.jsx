import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

const FaqCreate = () => {
    const naviate = useNavigate();
    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
        // 멤버아이디 리덕스로 받아와야함.
        memberId: 1,
    });

    const boardType = 9;
    // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ
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
        apiClient.post(subURL, boardData)
            .then((res) => {
                console.log(res)
                if (res.request.status === 200) naviate('../')
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div>
            <h3>FAQ 생성</h3>
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

export default FaqCreate