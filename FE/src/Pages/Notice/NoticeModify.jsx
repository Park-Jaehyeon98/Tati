import React, { useEffect, useState } from 'react'
import style from './NoticeModify.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

import NoticeList from './NoticeList';


const NoticeModify = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState({
        boardTitle: "",
        boardContent: ""
    });

    const boardId = params.boardId;

    useEffect(() => {
        apiClient.get(`/notice/${boardId}`)
            .then((res) => {
                console.log(res)
                setBoardData(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [])


    const { boardTitle, boardContent } = boardData;

    const subURL = 'notice';
    const config = {}



    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value
        })
    }


    const handleSubmitBtnClick = () => {
        apiClient.put(subURL, boardData)
            .then((res) => {
                console.log(res)
                setBoardData(res.data)
                navigate(`../${boardId}`);
            })
            .catch((err) => { console.log(err) })
    }

    const handleCancelBtnClick = () => {
        navigate(`../${boardId}`);
    }


    return (
        <div className={style.FaqModify_box}>
            <h3>공지사항 수정</h3>

            <div className={style.FaqModify_title}>
                <span className={style.FaqModify_title_name}>제목</span>
                <input
                    type="text"
                    name="boardTitle"
                    value={boardTitle}
                    onChange={handleChange}
                    placeholder="제목을 입력해주세요"
                />
            </div>
            <div className={style.FaqModify_title}>
                <span className={style.FaqModify_content_name}>내용</span>
                <textarea
                    className={style.FaqModify_content_input}
                    placeholder="내용을 입력해주세요"
                    name="boardContent"
                    value={boardContent}
                    onChange={handleChange}
                />
            </div>
            <div className={style.FaqModify_btns}>
                <button className={style.FaqModify_btn} onClick={handleSubmitBtnClick} >제출</button>
                <button className={style.FaqModify_btn} onClick={handleCancelBtnClick}>취소</button>
            </div>
        </div>
    )
}

export default NoticeModify