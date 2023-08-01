import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudyDetail = () => {
    const [studyData, setStudyData] = useState();
    const params = useParams();
    const studyId = params.studyId;
    // 처음 렌더링시 스터디 상세정보를 받아옴
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://192.168.31.58:8080/study/${studyId}`,
            header: {},
        })
            .then(res => {
                console.log(res.data);
                // setStudyData(res.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }, []);
    return (
        <div>StudyDetail</div>
    )
}

export default StudyDetail