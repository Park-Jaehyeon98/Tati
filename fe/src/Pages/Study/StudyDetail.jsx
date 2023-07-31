import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const StudyDetail = () => {
    const [studyData, setStudyData] = useState();
    const studyId = useParams();
    // 처음 렌더링시 스터디 상세정보를 받아옴
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://59.27.11.90:8080/study`,
            header: {},
            params: {
                studyId: studyId
            }
        })
            .then(res => {
                console.log(res.data);
                setStudyData(res.data);
            })
    }, []);

    return (
        <div>StudyDetail</div>
    )
}

export default StudyDetail