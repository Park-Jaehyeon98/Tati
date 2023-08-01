import React, { useState } from "react";
import "../Study/StudyCreate.css";
import { Link } from "react-router-dom";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from "axios";

const StudyCreate = () => {

    const [studyData, setStudyData] = useState({
        category: 0, //스터디 카테고리
        studyName: "", //스터디 이름
        studyDescription: "", //스터디 설명
        totalMember: 2, //스터디 멤버 수
        disclosure: true, // 공개 여부
        studyPassword: null, // 패스워드
        studyDeposit: 1,  //보증금 최대 50000
        studyHost: "나", // memberId 로 들어갈것.

        studyStartDate: "", //스터디 시작일
        studyEndDate: "", //스터디 종료일

        studySchedule: [{ studyDay: '', studyStartTime: '', studyEndTime: '' },
        { studyDay: '', studyStartTime: '', studyEndTime: '' },
        { studyDay: '', studyStartTime: '', studyEndTime: '' }],
        //스터디 일정 array 안에 object들어가있는형태
        // studyDay : 월,화,수,목,금,토,일 
        // studyTime : '00:00'

        // studyImg: "", //스터디 대표 이미지


    });

    const { category,
        studyName,
        studyDescription,
        // studyStartDate,
        // studyEndDate,

        // studyImg,
        totalMember,
        // studyDay,
        // studyStartTime,
        // studyEndTime,
        studyDeposit,
        disclosure,
        studyPassword } = studyData


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
    const handleIsDisclosureClick = (value) => {
        value ? setStudyData({
            ...studyData,
            disclosure: value,
            studyPassword: null
        }) : setStudyData({
            ...studyData,
            disclosure: value,
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
            url: `http://172.30.1.79:8080/study/create`,
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
                    <button name="disclosure" className={disclosure ? "selected" : "noSelected"} value={disclosure} onClick={() => handleIsDisclosureClick(true)}> 공개</button>
                    <button name="disclosure" className={!disclosure ? "selected" : "noSelected"} value={disclosure} onClick={() => handleIsDisclosureClick(false)}> 비공개</button>
                </div>
                {!disclosure &&
                    <div>
                        <span>패스워드</span>
                        <input type="studyPassword" name="studyPassword" value={studyPassword} onChange={handleChange} />
                    </div>}
                <div>
                    <span>스터디 이름</span>
                    <input type="text" name="studyName" value={studyName} onChange={handleChange} />
                </div>
                <div>
                    <span>스터디 설명</span>
                    <input style={{ width: 500, height: 100 }} type="text" name="studyDescription" value={studyDescription} onChange={handleChange} />
                </div>


                {/* <div>
                    <span>스터디 요일/시간</span>
                    <input type="text" name="studyDay" value={studyDay} onChange={handleChange} />
                </div> */}
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
                <div>
                    <span>스터디 보증금</span>
                    <input type="number" name="studyDeposit" value={studyDeposit} onChange={handleChange} />
                </div>
                <div>
                    <button onClick={handleStudyCreateSubmit}>스터디 생성</button>
                    <Link to='/StudyList'>
                        <button>취소하기</button>
                    </Link>
                </div>
            </>
        </div>
    );

}

export default StudyCreate;