import React, { useState } from "react";
import "../Study/StudyCreate.css";
import { useNavigate, Link } from "react-router-dom";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from "axios";

const StudyCreate = () => {
    const navigate = useNavigate();

    const [studyData, setStudyData] = useState({
        category: 0, //스터디 카테고리
        studyName: "", //스터디 이름
        studyDescription: "", //스터디 설명

        studyStartDate: "", //스터디 시작일
        studyEndDate: "", //스터디 종료일

        studyDay: "", //스터디 요일, 시간
        totalMember: 2, //스터디 멤버 수
        studyStartTime: "1",
        studyEndTime: "1",
        // studyImg: "", //스터디 대표 이미지
        // studyDeposit: 1,  //보증금 최대 50000
        isPublic: true, // 공개 여부
        password: null // 패스워드
    });



    const { category,
        studyName,
        studyDescription,
        studyStartDate,
        studyEndDate,
        studyDay,
        // studyImg,
        totalMember,
        studyStartTime,
        studyEndTime,
        isPublic,
        password } = studyData


    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudyData({
            ...studyData,
            [name]: value,
        });
    };
    //폼 데이터 수정시 변경


    const handleCategoryClick = (value) => {
        setStudyData({
            ...studyData,
            category: value
        })
    }
    const categoryArray = ["자격증", "취업", "학교", "공시", "기타"]
    // const categoryButtons = categoryArray.map((category) => {
    //     return <button className={categoryName === category ? "selected" : "noSelceted"} onClick={() => handleCategoryClick(category)}>{category}</button>
    // });
    const handleIsPublicClick = (value) => {
        setStudyData({
            ...studyData,
            isPublic: value
        })
    }


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

    const dateToString = (date) => {
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }

    const today = new Date();
    const todayString = dateToString(today);
    const [startDate, setStartDate] = useState(new Date(todayString));
    const [endDate, setEndDate] = useState(new Date(todayString));


    const handleStudyCreateSubmit = () => {
        setStudyData({
            ...studyData,
            studyStartDate: dateToString(startDate),
            studyEndDate: dateToString(endDate)
        })
        axios({
            method: 'post',
            url: `http://59.27.11.90:8080/study/create`,
            header: {},
            data: studyData
        })
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        console.log(studyData)
    }
    //폼 제출

    const handleBackButtonClick = () => {
        navigate('/StudyList');
    }
    //뒤로가기

    return (
        <div className="box">
            <h3>스터디 생성</h3>
            <>
                <div>
                    <span>카테고리</span>
                    {categoryArray.map((categoryItem, index) =>
                        <button key={categoryItem} className={index === category ? "selected" : "noSelected"} onClick={() => handleCategoryClick(index)}>{categoryItem}</button>
                    )}
                </div>

                <div>
                    <span>공개 여부</span>
                    <button name="isPublic" className={isPublic ? "selected" : "noSelected"} value={isPublic} onClick={() => handleIsPublicClick(true)}> 공개</button>
                    <button name="isPublic" className={!isPublic ? "selected" : "noSelected"} value={isPublic} onClick={() => handleIsPublicClick(false)}> 비공개</button>
                </div>
                {!isPublic &&
                    <div>
                        <span>패스워드</span>
                        <input type="password" name="password" value={password} onChange={handleChange} />
                    </div>}
                <div>
                    <span>스터디 이름</span>
                    <input type="text" name="studyName" value={studyName} onChange={handleChange} />
                </div>
                <div>
                    <span>스터디 설명</span>
                    <input style={{ width: 500, height: 100 }} type="text" name="studyDescription" value={studyDescription} onChange={handleChange} />
                </div>


                <div>
                    <span>스터디 요일/시간</span>
                    <input type="text" name="studyDay" value={studyDay} onChange={handleChange} />
                </div>
                <div>
                    <span>스터디 기간</span>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <>
                    </>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>



                <div>
                    <span>스터디 멤버수</span>
                    <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                </div>

                {/* <div>
                    <span>스터디 대표이미지</span>
                    <input type="text" name="studyImg" value={studyImg} onChange={handleChange} />
                </div> */}
                {/* <div>
                    <span>스터디 보증금</span>
                    <input type="number" name="studyDeposit" value={studyDeposit} onChange={handleChange} />
                </div> */}
                <div>
                    <button onClick={handleStudyCreateSubmit}>스터디 생성</button>
                    <button onClick={handleBackButtonClick}>취소하기</button>
                </div>
                <Link to='/StudyList'>
                    <button>이거누르세용</button>
                </Link>
            </>
        </div>
    );

}

export default StudyCreate;