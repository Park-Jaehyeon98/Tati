import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiClient } from '../../api/apiClient';
import style from './NoticeDetail.module.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

const NoticeDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const boardId = params.boardId;
    const user = useSelector((state) => { return state.user.user })

    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
        memberNickname: '',
        createdDate: '',
        boardHit: 0,
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
        createdDate,
        boardHit

    } = boardData


    // 삭제
    const handleDeleteBtnClick = () => {

        axios.delete(`${process.env.REACT_APP_URL}/notice/${boardId}/${1}`)
            .then((res) => {
                console.log(res)
                navigate('../')
            })
            .catch((err) => {
                console.log(err,);
            });
    }

    // 목록
    const handleListBtnClick = () => {
        navigate('../')
    }

    // 수정
    const handleModifyBtnClick = () => {
        navigate(`../${boardId}/Modify`);
    }


    return (
        <div className={style.container}>
            <div className={style.titleBox}>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{boardTitle}</div>
                <div className={style.day}>{createdDate}</div>
            </div>
            <hr />
            <div className={style.revDir}>
                조회수 :{boardHit}
                <br />
                {memberNickname}
            </div>
            <div className={style.contentBox}>
                {boardContent}
            </div>
            <div className={style.revDir}>
                <div className={style.btn} onClick={handleListBtnClick}>목록 보기</div>

                {!user || !(user.memberNickName === 'admin') ||
                    <>
                        <div className={style.btn} onClick={handleDeleteBtnClick}>삭제</div>
                        <div className={style.btn} onClick={handleModifyBtnClick}>공지사항 수정</div>
                    </>
                }
            </div>

        </div>
    )
}

export default NoticeDetail