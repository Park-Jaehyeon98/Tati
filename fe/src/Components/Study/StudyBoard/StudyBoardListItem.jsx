import React from 'react'
import style from './StudyBoardListItem.module.css'
import { useNavigate } from 'react-router-dom';

const StudyBoardListItem = ({ boardData, studyId, boardType }) => {
    const navigate = useNavigate();
    const { boardId, boardTitle, memberNickname, createdDate, boardHit } = boardData;
    const handleBoardItemClick = () => {
        boardType === 1 ?
            navigate(`/Study/${studyId}/Notice/${boardId}`) :
            navigate(`/Study/${studyId}/Board/${boardId}`)
    }


    return (
        <div className={style.boardItem} onClick={handleBoardItemClick}>
            <div className={style.cell}>{boardId}</div>
            <div className={style.cell}>{boardTitle}</div>
            <div className={style.cell}>{memberNickname}</div>
            <div className={style.cell}>{createdDate}</div>
            <div className={style.cell}>{boardHit}</div>
        </div>
    )
}

export default StudyBoardListItem