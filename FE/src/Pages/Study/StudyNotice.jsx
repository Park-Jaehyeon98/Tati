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
            {studyData.studyMemberYn ?
                <Outlet context={{ studyId, boardType, studyHost, refreshDetail }} /> :
                <h3>스터디 멤버만 볼 수 있습니다</h3>
            }
        </div>
    )
}

export default StudyNotice