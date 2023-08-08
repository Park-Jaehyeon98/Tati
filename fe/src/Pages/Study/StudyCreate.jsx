import React, { useState } from "react";
import { Link } from "react-router-dom";


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './StudyCreate.module.css';
import { apiClient } from "../../api/apiClient";


const StudyCreate = () => {
    // date -> stirng 함수
    const dateToString = (date) => {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    // 오늘 날짜 Date 객체 받아오고 State를 초기화
    const today = new Date();
    const todayString = dateToString(today);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    // 일정 아이템 1개 추가를 위한 input data
    const [studyScheduleItem, setStudyScheduleItem] = useState({
        studyDay: '0',
        studyStartHour: 0,
        studyStartMin: 0,
        studyEndHour: 0,
        studyEndMin: 0,
    });
    // 일정 list
    const [studySchedule, setStudySchedule] = useState([]);


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
    });
    const [studyImg, setStudyImg] = useState(null); //스터디이미지
    const [studyImgView, setStudyImgView] = useState(null); // 스터디이미지 보기


    const { categoryId,
        studyName,
        studyDescription,
        // studyStartDate,
        // studyEndDate,
        totalMember,
        studyDeposit,
        disclosure,
        studyPassword } = studyData

    // 기본 input text 필드 처리 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudyData((studData) => {
            return {
                ...studyData,
                [name]: value,
            }
        });
    };

    // 카테고리 선택
    const handleCategoryIdClick = (value) => {
        setStudyData((studyData) => {
            return {
                ...studyData,
                categoryId: value + 1
            }
        })
    }
    const categoryIdArray = ["자격증", "취업", "학교", "공시", "기타"]


    // 공개여부 선택
    const handleIsDisclosureClick = (value) => {
        value ? setStudyData((studyData) => {
            return {
                ...studyData,
                disclosure: value,
                studyPassword: null
            }
        }) : setStudyData((studyData) => {
            return {
                ...studyData,
                disclosure: value,
            }
        })
    }


    // 시퀀스 생성
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    const dayList = ["월", "화", "수", "목", "금", "토", "일",]
    const hourList = range(0, 24, 1)
    const minList = range(0, 45, 15)

    // 스터디 일정
    const handleStudyScheduleItemChange = (e) => {
        const { name, value } = e.target;
        setStudyScheduleItem((studyScheduleItem) => {
            return {
                ...studyScheduleItem,
                [name]: value
            }
        })
    }

    const scheduletoData = ({
        studyDay,
        studyStartHour,
        studyStartMin,
        studyEndHour,
        studyEndMin,
    }) => {
        return {
            studyDay: studyDay,
            studyStartTime: `${studyStartHour >= 10 ? studyStartHour.toString() : `0${studyStartHour.toString()}`}:${studyStartMin >= 10 ? studyStartMin.toString() : `0${studyStartMin.toString()}`}`,
            studyEndTime: `${studyEndHour >= 10 ? studyEndHour.toString() : `0${studyEndHour.toString()}`}:${studyEndMin >= 10 ? studyEndMin.toString() : `0${studyEndMin.toString()}`}`,
        }
    }

    // 일정 등록
    const handleAddScheduleBtnClick = () => {

        setStudySchedule((studySchedule) => {
            const newStudySchedule = studySchedule.filter((item) => { return item.studyDay !== studyScheduleItem.studyDay })
            return [...newStudySchedule, scheduletoData(studyScheduleItem)].sort((a, b) => { return Number(a.studyDay) - Number(b.studyDay) })
        })

        setStudyScheduleItem(() => {
            return {
                studyDay: '0',
                studyStartHour: 0,
                studyStartMin: 0,
                studyEndHour: 0,
                studyEndMin: 0,
            }
        })
    }
    // 일정 초기화
    const handleScheduleResetClick = () => {
        setStudySchedule(() => { return [] })
    }

    const {
        studyDay,
        studyStartHour,
        studyStartMin,
        studyEndHour,
        studyEndMin,
    } = studyScheduleItem

    // 이미지 업로드
    const handleStudyImgUpload = (e) => {
        const formData = new FormData();
        const file = e.target.files[0];

        formData.append('file', file)
        setStudyImg(() => { return formData })
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setStudyImgView(() => { return reader.result || null }); // 파일의 컨텐츠
                resolve();
            };
        });
    }


    // 생성 요청 제출
    const handleStudyCreateSubmit = () => {
        const studyReqDto = {
            ...studyData,
            studySchedule: studySchedule,
            studyStartDate: dateToString(startDate),
            studyEndDate: dateToString(endDate),
        }
        let formData = new FormData();
        formData.append('studyImg', studyImg)

        // 키값 수정 필요
        formData.append('studyReqDto', new Blob([JSON.stringify(studyReqDto)], {
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
                console.log(studyReqDto, studyImg);
                console.log(res);
            }).catch((err) => {
                // console.log(JSON.stringify(studyData))
                console.log(err);
                console.log(studyReqDto, studyImg);
            })
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
                            onChange={(date) => { date > today && setStartDate(date) }}
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
                    <div>스터디 요일/시간 <button onClick={handleScheduleResetClick}>일정 초기화</button></div>
                    요일
                    <select name="studyDay" id="studyDay" onChange={handleStudyScheduleItemChange} value={studyDay}>
                        {dayList.map((value, index) => {
                            return < option value={index}> {value}</option>
                        })}
                    </select>

                    시작시간
                    <select name="studyStartHour" id="studyStartHour" onChange={handleStudyScheduleItemChange} value={studyStartHour}>
                        {hourList.map((value) => {
                            return < option value={value}> {value}</option>
                        })}
                    </select>
                    시
                    <select name="studyStartMin" id="studyStartMin" onChange={handleStudyScheduleItemChange} value={studyStartMin}>
                        {minList.map((value, index) => {
                            return < option value={value}> {value}</option>
                        })}
                    </select>
                    분
                    종료시간
                    <select name="studyEndHour" id="studyEndHour" onChange={handleStudyScheduleItemChange} value={studyEndHour}>
                        {hourList.map((value) => {
                            return < option value={value}> {value}</option>
                        })}
                    </select>
                    시
                    <select name="studyEndMin" id="studyEndMin" onChange={handleStudyScheduleItemChange} value={studyEndMin}>
                        {minList.map((value, index) => {
                            return < option value={value}> {value}</option>
                        })}
                    </select>
                    분
                    <button onClick={handleAddScheduleBtnClick}> 일정 추가</button>
                    <hr />
                    스터디 일정
                    {
                        studySchedule.map(({ studyDay, studyStartTime, studyEndTime }) => {
                            return <div>{dayList[studyDay]} 요일   {studyStartTime} ~  {studyEndTime}</div>
                        })
                    }
                    <hr />

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