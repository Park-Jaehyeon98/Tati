import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const StudyModify = () => {
    const navigate = useNavigate();
    const studyId = useParams

    const [studyData, setStudyData] = useState({
        category: 0, //스터디 카테고리
        studyName: "스터디", //스터디 이름
        studyDescription: "스터디설명", //스터디 설명

        studyStartDate: "", //스터디 시작일
        studyEndDate: "", //스터디 종료일

        studyDay: "", //스터디 요일, 시간
        totalMember: "", //스터디 멤버 수
        studyStartTime: "1",
        studyEndTime: "1",
        // studyImg: "", //스터디 대표 이미지
        // studyDeposit: 1,  //보증금 최대 50000
        isPublic: true, // 공개 여부
        password: null // 패스워드
    });


    const studySchedule = [{ studyDay: '', studyStartTime: '', studyEndTime: '' }]
    // studyDay : 월,화,수,목,금,토,일 
    // studyTime : '00:00'


    // const [studyData, setStudyData] = useState();
    // 페이지 렌더링 될 때 처음 스터디 데이터를 받아옴
    // useEffect(() => {
    //     axios.get(`http://59.27.11.90:8080/study`, {
    //         params: {
    //             studyId: studyId
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res.data);
    //             setStudyData(res.data);
    //         })
    // }, []);

    const { category,
        studyName,
        studyDescription,
        // studyImg,
        totalMember,
        isPublic,
        password } = studyData

    const handleChecked = (e) => {
        e.target.checked ? setStudyData({
            ...studyData,
            isPublic: true,
            password: null
        }) : setStudyData({
            ...studyData,
            isPublic: false,
            password: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudyData({
            ...studyData,
            [name]: value,
        });
    };

    const handleCategoryClick = (value) => {
        setStudyData({
            ...studyData,
            category: value
        })
    }
    const categoryArray = ["자격증", "취업", "학교", "공시", "기타"]

    const handleStudyModifySubmit = () => {
        // 
        axios({
            method: 'put',
            url: `http://59.27.11.90:8080/study/` + studyId + `/modify`,
            header: {},
            params: studyData
        })
            .then((res) => {
                console.log(res.data);
                setStudyData(res.data);
            })
            .catch((err) => {

            })
    }

    const handleBackButtonClick = () => {
        navigate('');
    }


    return (
        <div>
            <h3>스터디 수정하기</h3>
            <>
                <p>
                    <span>카테고리</span>
                    {categoryArray.map((categoryindex, index) =>
                        <button key={index} className={index === category ? "selected" : "noSelected"} onClick={() => handleCategoryClick(category)}>{categoryindex}</button>
                    )}
                </p>

                <p>
                    <span>공개 여부</span>
                    <input type="checkbox" name="isPublic" value={isPublic} onClick={handleChecked} />
                </p>
                {!isPublic &&
                    <p>
                        <span>패스워드</span>
                        <input type="password" name="password" value={password} onChange={handleChange} />
                    </p>}
                <p>
                    <span>스터디 이름</span>
                    <input type="text" name="studyName" value={studyName} onChange={handleChange} />
                </p>
                <p>
                    <span>스터디 설명</span>
                    <input style={{ width: 500, height: 100 }} type="text" name="studyDescription" value={studyDescription} onChange={handleChange} />
                </p>

                <p>
                    <span>스터디 멤버수</span>
                    <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                    <span>2명 ~ 8명</span>
                </p>

                <p>
                    <button onClick={handleStudyModifySubmit}>스터디 수정</button>
                    <button onClick={handleBackButtonClick}>취소하기</button>
                </p>
            </>
        </div>

    )
}

export default StudyModify