import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import StudyDetailHeader from './../../Components/Study/StudyDetailHeader';
import style from './StudyDetail.module.css'

const StudyDetail = () => {
    const params = useParams();
    const studyId = params.studyId;

    const navigate = useNavigate();
    // viewType 0, 1, 2 : 메인, 공지, 스터디게시판
    const viewTypeURL = ['', 'Notice', 'Board']
    const viewTypeText = ['스터디 메인', '스터디 공지사항', '스터디 게시판']
    const [viewType, setViewType] = useState(0);


    const [studyData, setStudyData] = useState({
        category: 1,
        studyName: "스터디이름",
        studyDescription: "스터디설명",
        studyStartDate: "23/07/27",
        studyEndDate: "23/08/01",
        studySchedule: [{ studyDay: '월', studyStartTime: '', studyEndTime: '' },
        { studyDay: '화', studyStartTime: '', studyEndTime: '' },
        { studyDay: '수', studyStartTime: '', studyEndTime: '' }],
        // studyImg,
        totalMember: 5,
        // studyDay,
        // studyStartTime,
        // studyEndTime,
        studyDeposit: 1000,
        disclosure: true,
        studyPassword: "1234"
    });

    // 처음 렌더링시 스터디 상세정보를 받아옴


    useEffect(() => {
        apiClient.get(`study/${studyId}`)
            .then(res => {
                // console.log(res.data);
                setStudyData(res.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }, []);

    const {
        category,
        studyName,
        studyDescription,
        studyStartDate,
        studyEndDate,
        studySchedule,
        // studyImg,
        totalMember,
        // studyDay,
        // studyStartTime,
        // studyEndTime,
        studyDeposit,
        disclosure,
        studyPassword
    } = studyData

    const hanldeViewTypeBtnClick = (e) => {
        console.log()
    }

    return (
        <div>
            {/* 헤더에 필요한 내용  : 가입여부, 신청여부,< 방장여부, 스터디 이미지, 스터디 요일, 비밀글여부; 스터디데이터>  */}
            <StudyDetailHeader viewType={viewType} studyData={studyData} isMember={true} isCandidate={false} studyId={studyId} />
            <div className={style.btnBox}>

                {/* 메인, 공지사항, 게시판 이동 */}
                {[0, 1, 2].map((index) => {
                    return <Link key={index} to={viewTypeURL[index]}>
                        <div className={style.btn} key={index}>{viewTypeText[index]} </div>
                    </Link>
                })}
                {/* <div onClick={hanldeViewTypeBtnClick} className={style.btn} key={0}>{viewTypeText[0]} </div>
                <div onClick={hanldeViewTypeBtnClick} className={style.btn} key={1}>{viewTypeText[1]} </div>
                <div onClick={hanldeViewTypeBtnClick} className={style.btn} key={2}>{viewTypeText[2]} </div> */}
            </div>
            <Outlet context={studyData} />
        </div>
    )
}

export default StudyDetail