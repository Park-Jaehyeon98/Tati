import React from 'react'
import StudyBoardHeader from '../../Components/Study/StudyBoard/StudyBoardHeader'
import { Outlet, useParams } from 'react-router-dom'

const StudyNotice = () => {
    const params = useParams();
    const studyId = params.studyId;

    const boardType = 1;

    return (
        <>
            <Outlet context={{ studyId, boardType }} />
        </>
    )
}

export default StudyNotice