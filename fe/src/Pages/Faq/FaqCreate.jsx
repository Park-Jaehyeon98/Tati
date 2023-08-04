import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';

const FaqCreate = () => {
    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
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
        console.log(subURL)
        apiClient.post(subURL, boardData)
            .then((res) => {
                console.log(res)
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