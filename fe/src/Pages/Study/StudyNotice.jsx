import React from 'react'
import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import style from './StudyNotice.module.css'

const StudyNotice = () => {
    const params = useParams();
    const studyId = params.studyId;
    const { studyData, refreshDetail } = useOutletContext();
    const { studyHost } = studyData
    const boardType = 1;

    return (
        <div className={style.container}>
            <Outlet context={{ studyId, boardType, studyHost, refreshDetail }} />
        </div>
    )
}

export default StudyNotice