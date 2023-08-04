import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

const StudyDetail = () => {
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
    const params = useParams();
    const studyId = params.studyId;
    // 처음 렌더링시 스터디 상세정보를 받아옴

    // 테스트용
    // setStudyData({
    //     category: 1,
    //     studyName: "스터디이름",
    //     studyDescription: "스터디설명",
    //     studyStartDate: "23/07/27",
    //     studyEndDate: "23/08/01",
    //     studySchedule: [{ studyDay: '월', studyStartTime: '', studyEndTime: '' },
    //     { studyDay: '화', studyStartTime: '', studyEndTime: '' },
    //     { studyDay: '수', studyStartTime: '', studyEndTime: '' }],
    //     // studyImg,
    //     totalMember: 5,
    //     // studyDay,
    //     // studyStartTime,
    //     // studyEndTime,
    //     studyDeposit: 1000,
    //     disclosure: true,
    //     studyPassword: "1234"
    // });

    // useEffect(() => {
    //     apiClient.get(`study/${studyId}`)
    //         .then(res => {
    //             console.log(res.data);
    //             // setStudyData(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err.data);
    //         })
    // }, []);

    // 
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: `http://192.168.31.58:8080/study/${studyId}`,
    //         header: {},
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //             // setStudyData(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err.data);
    //         })
    // }, []);
    return (
        <div>
            스터디 상세
            <div>

            </div>

        </div>
    )
}

export default StudyDetail