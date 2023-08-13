import React from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import style from './StudyBoard.module.css'


const StudyBoard = () => {
    const params = useParams();
    const studyId = params.studyId;
    const { studyData, refreshDetail } = useOutletContext();
    const { studyHost } = studyData
    const boardType = 2;
    // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

    return (
        <div className={style.container}>
            <Outlet context={{ studyId, boardType, studyHost, refreshDetail }} />
        </div>
    )
}

export default StudyBoard