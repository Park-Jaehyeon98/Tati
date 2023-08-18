import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Common/StudyCardItem.module.css';

const StudyCardItem = ({ studyDetail, user }) => {
    const { studyId, studyName, totalMember, disclosure, currentMember, imageUrl } = studyDetail

    var studyImg = imageUrl;
    if (imageUrl == null) {
        studyImg = "/Assets/study_img.png";
    }

    return (
        // <Link to={`/Study/${studyId}`}>
        //     <div className={style.card}>
        //         <img src={imageUrl}/>
        //         {studyName}
        //         {currentMember} / {totalMember}
        //         {disclosure}
        //         {imageUrl}
        //         <img src={imageUrl}></img>
        //     </div>
        // </Link>

        <div className={style.card}>
            <Link to={user ? `/Study/${studyId}` : `/Login`} onClick={() => { !user && alert('로그인이 필요합니다') }}>
                {disclosure === false &&
                    <div className={style.lock_icon_div}>
                        <img src="https://tatibucket.s3.ap-northeast-2.amazonaws.com/00ae3cad-c6c5-4d4e-a24b-9c30a24628f3_lock.png" className={style.lock_icon} alt="" />
                    </div>}
                <div className={style.study_img_div}>
                    <img src={studyImg} className={style.study_img} alt="" />
                </div>
                <h5 className={style.study_name}> {studyName} </h5>
                <div className={style.study_member}>

                    {currentMember} / {totalMember}

                    <img src="https://tatibucket.s3.ap-northeast-2.amazonaws.com/bc95851a-c496-4141-9685-33165a29c009_memberIcon.png" className={style.member_icon} alt="" />
                </div>
            </Link>
        </div>
    )
}

export default StudyCardItem