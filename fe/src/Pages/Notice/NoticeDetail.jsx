import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiClient } from '../../api/apiClient';
import style from './NoticeDetail.module.css'
import { useSelector } from 'react-redux';


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

    const boardType = 0;
    
    const {
        boardTitle,
        boardContent,
        memberNickname,
        createdDate,
        boardHit
        
    } = boardData

    const handleListBtnClick = () => {
        navigate('../')
    }

    const handleModifyBtnClick = () => {
        navigate('Modify')
    }

    const handleDeleteBtnClick = () => {
        console.log(subURL)
        apiClient.delete(subURL+`/${user.memberId}`)
            .then((res) => {
                console.log(res);
                navigate('../')
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className={style.container}>
            <div className={style.titleBox}>
                <div>{boardTitle}</div>
                <div>{createdDate}</div>
            </div>
            <hr />
            <div className={style.revDir}>
                {memberNickname} || 조회수 : 
                {boardHit}
            </div>
            <div className={style.contentBox}>
                {boardContent}
            </div>
            <div className={style.revDir}>
                <div className={style.btn} onClick={handleListBtnClick}>목록 보기</div>
                {(user.memberNickName === 'admin') && <div className={style.btn} onClick={handleModifyBtnClick}>공지사항 수정</div>}
                {(user.memberNickName === 'admin') && <div className={style.btn} onClick={handleDeleteBtnClick}>공지사항 삭제</div>}
            </div>

        </div>
    )
}

export default NoticeDetail