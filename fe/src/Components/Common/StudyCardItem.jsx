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
                        <img src="Assets/disclosureIcon.png" className={style.lock_icon} alt="" />
                    </div>}
                <div className={style.study_img_div}>
                    <img src={studyImg} className={style.study_img} alt="" />
                </div>
                <h5 className={style.study_name}> {studyName} </h5>
                <div className={style.study_member}>

                    {currentMember} / {totalMember}

                    <img src="Assets/member.png" className={style.member_icon} alt="" />
                </div>
            </Link>
        </div>
    )
}

export default StudyCardItem