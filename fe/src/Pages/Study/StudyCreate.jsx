import React, { useState } from "react";
import "../Study/StudyCreate.css";
import { useNavigate, Link } from "react-router-dom";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from "axios";

const StudyCreate = () => {
    const navigate = useNavigate();

    const [studyData, setStudyData] = useState({
        categoryName: "자격증", //스터디 카테고리
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



    const { categoryName,
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
            categoryName: value
        })
    }
    const categoryArray = ["자격증", "취업", "학교", "공시", "기타"]

    // const categoryButtons = categoryArray.map((category) => {
    //     return <button className={categoryName === category ? "selected" : "noSelceted"} onClick={() => handleCategoryClick(category)}>{category}</button>
    // });

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
        navigate('');
    }
    //뒤로가기

    return (
        <div className="box">
            <h3>스터디 생성</h3>
            <>
                <p>
                    <span>카테고리</span>
                    {categoryArray.map((category, index) =>
                        <button key={index} className={category === categoryName ? "selected" : "noSelected"} onClick={() => handleCategoryClick(category)}>{category}</button>
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
                    <span>스터디 요일/시간</span>
                    <input type="text" name="studyDay" value={studyDay} onChange={handleChange} />
                </p>
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



                <p>
                    <span>스터디 멤버수</span>
                    <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                </p>

                {/* <p>
                    <span>스터디 대표이미지</span>
                    <input type="text" name="studyImg" value={studyImg} onChange={handleChange} />
                </p> */}
                {/* <p>
                    <span>스터디 보증금</span>
                    <input type="number" name="studyDeposit" value={studyDeposit} onChange={handleChange} />
                </p> */}
                <p>
                    <button onClick={handleStudyCreateSubmit}>스터디 생성</button>
                    <button onClick={handleBackButtonClick}>취소하기</button>
                </p>
                <Link to='/StudyList'>
                    <button>이거누르세용</button>
                </Link>
            </>
        </div>
    );

}

export default StudyCreate;