import React, { useEffect, useState } from 'react'
import style from './NoticeModify.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

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
            })
            .catch((err) => { console.log(err) })
        navigate(`../${boardId}`);
    }
    const handleCancleBtnClick = () => {
        navigate(`../${boardId}`);
    }

    return (
        <div>
            <h3>공지사항 수정</h3>
            <div>
                제목
                <input type="text" name="boardTitle" value={boardTitle} onChange={handleChange} />
            </div>
            <div>
                내용
                <input type="text" name="boardContent" value={boardContent} onChange={handleChange} />
            </div>
            <div>
                <div className={style.btn} onClick={handleSubmitBtnClick}>
                    수정하기
                </div>
                <div className={style.btn} onClick={handleCancleBtnClick}>
                    취소
                </div>
            </div>
        </div>
    )
}

export default NoticeModify