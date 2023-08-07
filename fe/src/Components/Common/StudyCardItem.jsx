import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Common/StudyCardItem.module.css';

const StudyCardItem = ({ studyDetail }) => {
    const { studyId, studyName, totalMember, disclosure, currentMember, imageUrl } = studyDetail
    console.log("ss")
    return (
        <Link to={`/Study/${studyId}`}>
            <div className={style.card}>
                {studyName}
                {currentMember} / {totalMember}
                {disclosure}
                {imageUrl}
            </div>
        </Link>
    )
}

export default StudyCardItem