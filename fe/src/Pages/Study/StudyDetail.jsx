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

    const [studyData, setStudyData] = useState({
        categoryId: 1,
        studyName: "스터디이름",
        studyDescription: "스터디설명",
        studyStartDate: "23/07/27",
        studyEndDate: "23/08/01",
        studyHost: "",
        studySchedule: [{ studyDay: '월', studyStartTime: '', studyEndTime: '' },
        { studyDay: '화', studyStartTime: '', studyEndTime: '' },
        { studyDay: '수', studyStartTime: '', studyEndTime: '' }],
        img: "",
        totalMember: 5,
        studyDeposit: 1000,
        disclosure: true,
        studyPassword: "1234"
    });

    // {
    //     "studyId": 24,
    //     "img": "https://tatibucket.s3.ap-northeast-2.amazonaws.com/41403945-6e43-4a8f-a670-e0dc15d070a6_%EC%BA%A1%EC%B2%98%20%281%29.PNG",
    //     "studyName": "제목이 여기임!",
    //     "studyDescription": "설명은 여기",
    //     "totalMember": 0,
    //     "disclosure": true,
    //     "studyHost": "1234",
    //     "studyDeposit": 1000,
    //     "studyPassword": 1234,
    //     "studyStartDate": "2023-08-07",
    //     "studyEndDate": "2023-08-07",
    //     "categoryId": 1
    // }

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
        categoryId,
        studyName,
        studyDescription,
        studyStartDate,
        studyEndDate,
        studySchedule,
        img,
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
            <StudyDetailHeader studyData={studyData} isMember={true} isCandidate={false} studyId={studyId} img={img} />
            <div className={style.btnBox}>
                {/* <div onClick={hanldeViewTypeBtnClick} className={style.btn} key={0}>{viewTypeText[0]} </div>
                <div onClick={hanldeViewTypeBtnClick} className={style.btn} key={1}>{viewTypeText[1]} </div>
                <div onClick={hanldeViewTypeBtnClick} className={style.btn} key={2}>{viewTypeText[2]} </div> */}
            </div>
            <Outlet context={studyData} />
        </div>
    )
}

export default StudyDetail