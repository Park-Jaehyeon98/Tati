import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';
import style from "./NoticeCreate.module.css"

const NoticeCreate = () => {

    const naviate = useNavigate();

    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
        memberId: 1,
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
                console.log(res)
                naviate('../')
            })
            .catch((err) => {
                console.log(err)
            });
    }


    const handleCancelButtonClick = () => {
        naviate('../')
    }


    return (
        <div className={style.NoticeCreate_box}>
            <h3>공지사항 생성</h3>
            <div className={style.NoticeCreate_title}>
                <span className={style.NoticeCreate_title_name}>제목</span>
                <input
                    className={style.NoticeCreate_title_input}
                    type="text"
                    name="boardTitle"
                    value={boardTitle}
                    onChange={handleChange} />
            </div>

            <div className={style.NoticeCreate_title}>
                <span className={style.NoticeCreate_content_name}>내용</span>
                <textarea
                    className={style.NoticeCreate_content_input}
                    placeholder="내용을 입력해주세요"
                    name="boardContent"
                    value={boardContent}
                    onChange={handleChange}
                />
            </div>

            <div className={style.NoticeCreate_btns}>
                <button className={style.NoticeCreate_btn} onClick={handleSubmitBtnClick}>제출</button>
                <button className={style.NoticeCreate_btn} onClick={handleCancelButtonClick}>취소</button>
            </div>
        </div>
    )
}

export default NoticeCreate