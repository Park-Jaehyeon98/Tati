import React, { useState } from "react";
import { Link } from "react-router-dom";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './StudyCreate.module.css';

import axios from "axios";
import { apiClient } from "../../api/apiClient";


const StudyCreate = () => {
    const dateToString = (date) => {
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }

    const today = new Date();
    const todayString = dateToString(today);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);



    const [studyData, setStudyData] = useState({
        categoryId: 1, //스터디 카테고리
        studyName: "", //스터디 이름
        studyDescription: "", //스터디 설명
        totalMember: 2, //스터디 멤버 수
        disclosure: true, // 공개 여부
        studyPassword: null, // 패스워드
        studyDeposit: 1,  //보증금 최대 50000
        studyHost: "admin", // memberId 로 들어갈것.

        studyStartDate: todayString, //스터디 시작일
        studyEndDate: todayString, //스터디 종료일

        studySchedule: [{ studyDay: '', studyStartTime: '', studyEndTime: '' },
        { studyDay: '', studyStartTime: '', studyEndTime: '' },
        { studyDay: '', studyStartTime: '', studyEndTime: '' }],
        //스터디 일정 array 안에 object들어가있는형태
        // studyDay : 월,화,수,목,금,토,일 
        // studyTime : '00:00'

        // studyImg: "", //스터디 대표 이미지


    });

    const { categoryId,
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


    const handleCategoryIdClick = (value) => {
        setStudyData({
            ...studyData,
            categoryId: value + 1
        })
    }
    const categoryIdArray = ["자격증", "취업", "학교", "공시", "기타"]
    // const categoryIdButtons = categoryIdArray.map((categoryId) => {
    //     return <button className={categoryIdName === categoryId ? style.selected : style.noSelceted} onClick={() => handleCategoryIdClick(categoryId)}>{categoryId}</button>
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
    const handleStudyCreateSubmit = () => {
        setStudyData({
            ...studyData,
            studyStartDate: dateToString(startDate),
            studyEndDate: dateToString(endDate)
        })
        // axios({
        //     method: 'post',
        //     url: `http://172.30.1.79:8080/study/create`,
        //     header: {},
        //     data: studyData
        // })
        apiClient.post('study/create', studyData)
            .then((res) => {
                console.log(studyData);
                console.log(res);
            }).catch((err) => {
                console.log(err);
                console.log(studyData);
            })
        console.log(studyData)
    }

    // const handleStudyCreateSubmit = () => {
    //     setStudyData({
    //         ...studyData,
    //         studyStartDate: dateToString(startDate),
    //         studyEndDate: dateToString(endDate)
    //     })
    //     axios({
    //         method: 'post',
    //         url: `http://172.30.1.79:8080/study/create`,
    //         header: {},
    //         data: studyData
    //     })
    //         .then((res) => {
    //             console.log(res);
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     console.log(studyData)
    // }
    //폼 제출

    return (
        <div className="box">
            <div style={{ margin: "auto", width: 1000, display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h3>스터디 생성</h3>
                <div></div>
                <div>
                    <div>카테고리</div>
                    {categoryIdArray.map((categoryIdItem, index) =>
                        <button key={categoryIdItem} className={index === categoryId - 1 ? style.selected : style.noSelected} onClick={() => handleCategoryIdClick(index)}>{categoryIdItem}</button>
                    )}
                </div>

                <div>
                    <div>공개 여부</div>
                    <button name="disclosure" className={disclosure ? style.selected : style.noSelected} value={disclosure} onClick={() => handleIsDisclosureClick(true)}> 공개</button>
                    <button name="disclosure" className={!disclosure ? style.selected : style.noSelected} value={disclosure} onClick={() => handleIsDisclosureClick(false)}> 비공개</button>
                </div>
                {!disclosure &&
                    <div>
                        <div>패스워드</div>
                        <input type="studyPassword" name="studyPassword" value={studyPassword} onChange={handleChange} />
                    </div>}
                <div>
                    <div>스터디 이름</div>
                    <input style={{ width: 500 }} type="text" name="studyName" value={studyName} onChange={handleChange} />
                </div>
                <div>
                    <div>스터디 설명</div>
                    <input style={{ width: 500, height: 100 }} type="text" name="studyDescription" value={studyDescription} onChange={handleChange} />
                </div>


                {/* <div>
                    <div>스터디 요일/시간</div>
                    <input type="text" name="studyDay" value={studyDay} onChange={handleChange} />
                </div> */}
                <div>
                    <div>스터디 기간</div>
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>
                </div>



                <div>
                    <div>스터디 멤버수</div>
                    <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                </div>

                {/* <div>
                    <div>스터디 대표이미지</div>
                    <input type="text" name="studyImg" value={studyImg} onChange={handleChange} />
                </div> */}
                <div>
                    <div>스터디 보증금</div>
                    <input type="number" name="studyDeposit" value={studyDeposit} onChange={handleChange} />
                </div>
                <div>
                    <button onClick={handleStudyCreateSubmit}>스터디 생성</button>
                    <Link to='/Study'>
                        <button>취소하기</button>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default StudyCreate;