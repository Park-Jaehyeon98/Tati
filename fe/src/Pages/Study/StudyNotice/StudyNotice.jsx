import React from 'react'
import StudyNoticeHeader from '../../../Components/Study/StudyNotice/StudyNoticeHeader'
import { Outlet, useParams } from 'react-router-dom'

const StudyNotice = () => {
    const params = useParams();
    const studyId = params.studyId;

    return (
        <div>
            <StudyNoticeHeader />
            <Outlet studyId={studyId} />
        </div>
    )
}

export default StudyNotice