import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Common/StudyCardItem.module.css';

const StudyCardItem = ({ studyDetail }) => {
    const { studyId, studyName, totalMember, disclosure, currentMember, imageUrl } = studyDetail
    console.log(studyDetail)
    return (
        <Link to={`/Study/${studyId}`}>
            <div className={styles.card}>
                {studyName}
                {currentMember} / {totalMember}
                {disclosure}
                {imageUrl}
            </div>
        </Link>
    )
}

export default StudyCardItem