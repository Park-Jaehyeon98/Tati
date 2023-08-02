import React from 'react'
import styles from './StudyBoardListItem.module.css'
import { useNavigate } from 'react-router-dom';

const StudyBoardListItem = ({ boardData, studyId }) => {
    const navigate = useNavigate();
    const { boardId, boardTitle, memberNickname, createdDate, boardHit } = boardData;
    const handleBoardItemClick = () => {
        navigate(`/Study/${studyId}/Board/${boardId}`)
    }

    return (
        <div className={styles.boardItem} onClick={handleBoardItemClick}>
            <div className={styles.cell}>{boardId}</div>
            <div className={styles.cell}>{boardTitle}</div>
            <div className={styles.cell}>{memberNickname}</div>
            <div className={styles.cell}>{createdDate}</div>
            <div className={styles.cell}>{boardHit}</div>
        </div>
    )
}

export default StudyBoardListItem