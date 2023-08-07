import React, { useState } from "react";
import { Link } from "react-router-dom";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './StudyCreate.module.css';
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
        studyHost: localStorage.getItem("memberNickName"), // memberNickName으로 들어갈것 
        studyStartDate: todayString, //스터디 시작일
        studyEndDate: todayString, //스터디 종료일
        studySchedule: [{ studyDay: '', studyStartTime: '', studyEndTime: '' },
        { studyDay: '', studyStartTime: '', studyEndTime: '' },
        { studyDay: '', studyStartTime: '', studyEndTime: '' }], //스터디 일정 array 안에 object들어가있는형태
    });
    const [studyImg, setStudyImg] = useState(null); //스터디이미지
    const [studyImgView, setStudyImgView] = useState(null); // 스터디이미지 보기


    const { categoryId,
        studyName,
        studyDescription,
        // studyStartDate,
        // studyEndDate,

        studySchedule,
        totalMember,
        studyDeposit,
        disclosure,
        studyPassword } = studyData

    // 기본 input text 필드 처리 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudyData({
            ...studyData,
            [name]: value,
        });
    };

    // 카테고리 선택
    const handleCategoryIdClick = (value) => {
        setStudyData({
            ...studyData,
            categoryId: value + 1
        })
    }
    const categoryIdArray = ["자격증", "취업", "학교", "공시", "기타"]


    // 공개여부 선택
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

    // 생성 요청 제출
    const handleStudyCreateSubmit = () => {

        setStudyData({
            ...studyData,
            studyStartDate: dateToString(startDate),
            studyEndDate: dateToString(endDate)
        })

        let formData = new FormData();
        formData.append('studyImg', studyImg)
        formData.append('studyData', new Blob([JSON.stringify(studyData)], {
            type: "application/json"
        }))

        apiClient.post('study/create',
            formData,
            {
                header: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                console.log(studyData, studyImg);
                console.log(res);
            }).catch((err) => {
                // console.log(JSON.stringify(studyData))
                console.log(err);
                console.log(studyData, studyImg);
            })
        console.log(studyData)
    }

    const handleStudyImgUpload = (e) => {
        const formData = new FormData();
        const file = e.target.files[0];

        formData.append('file', file)
        setStudyImg(formData)
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setStudyImgView(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
        });
    }

    return (
        <div>
            <div >
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

                <div>
                    <div>스터디 기간</div>
                    <div>
                        시작일
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div>
                        종료일
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


                <div>
                    <div>스터디 요일/시간</div>
                    요일
                    <select name="" id="">
                        <option value="-1">요일</option>
                    </select>
                    시작시간
                    <select name="" id="">
                        <option value="-1">요일</option>
                    </select>
                    <select name="" id="">
                        <option value="-1">요일</option>
                    </select>
                    종료시간
                    <select name="" id="">
                        <option value="-1">요일</option>
                    </select>
                    <select name="" id="">
                        <option value="-1">요일</option>
                    </select>
                    <input type="text" name="studyDay" value={studySchedule} onChange={handleChange} />
                </div>
                {/* 스터디 이미지 */}

                <div>
                    <div>스터디 대표이미지</div>
                    <input type="file" name="studyImg" onChange={handleStudyImgUpload} />
                </div>
                스터디 이미지
                <div style={{ width: 100, height: 100 }}>
                    {studyImgView && <img src={studyImgView} alt="" width={100} height={100} />}
                </div>
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
        </div >
    );

}

export default StudyCreate;