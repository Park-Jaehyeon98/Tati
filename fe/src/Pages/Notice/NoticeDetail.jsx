import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiClient } from '../../api/apiClient';
import style from './NoticeDetail.module.css'


const NoticeDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const boardId = params.boardId;

    const [boardData, setBoardData] = useState({
        boardTitle: '여기는 제목',
        boardContent: '여기는내용입니다',
        memberNickname: '관리자',
        createdDate: '23/07/03',
    });

    const subURL = `/notice/${boardId}`;
    const config = {};

    useEffect(() => {
        apiClient.get(subURL, config)
            .then((res) => {
                setBoardData(res.data)
                console.log(res)
            })
            .catch((err) => { console.log(err.data) })
    }, [])

    const {
        boardTitle,
        boardContent,
        memberNickname,
        createdDate
    } = boardData

    const handleListBtnClick = () => {
        navigate('../')
    }

    const handleModifyBtnClick = () => {
        navigate('Modify')
    }

    return (
        <div className={style.container}>
            <div className={style.titleBox}>
                <div>{boardTitle}</div>
                <div>{createdDate}</div>
            </div>
            <hr />
            <div className={style.revDir}>
                {memberNickname}
            </div>
            <div className={style.contentBox}>
                {boardContent}
            </div>
            <div className={style.revDir}>
                <div className={style.btn} onClick={handleListBtnClick}>목록 보기</div>
                {memberNickname === 'admin' ? <div className={style.btn} onClick={handleModifyBtnClick}>공지사항 수정</div> : <></>}
            </div>

        </div>
    )
}

export default NoticeDetail