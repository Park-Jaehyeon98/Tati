import React from 'react';
import StudyCardItem from '../Common/StudyCardItem';

const StudyCardList = ({ studyList }) => {
    console.log(studyList)
    return <div>{studyList && studyList.map((studyDetail, index) => {
        return <StudyCardItem key={index} studyDetail={studyDetail} />
    })}</div>
}

export default StudyCardList