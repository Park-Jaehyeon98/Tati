import React from 'react'
import StudyBoardHeader from '../../../Components/Study/StudyBoard/StudyBoardHeader';
import { Outlet, useParams } from 'react-router-dom'


const StudyBoard = () => {
    const params = useParams();
    const studyId = params.studyId;
    const boardType = 2;
    // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

    return (
        <div >
            <StudyBoardHeader studyId={studyId} boardType={boardType} />
            <Outlet context={{ studyId, boardType }} />
        </div>
    )
}

export default StudyBoard