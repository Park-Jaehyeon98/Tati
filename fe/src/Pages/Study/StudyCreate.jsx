import React, { useState } from "react";
import { Link } from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './StudyCreate.module.css';
import { apiClient } from "../../api/apiClient";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tooltip from "../../Components/Common/Tooltip";

const StudyCreate = () => {
    // date -> stirng 함수
    const dateToString = (date) => {
        return date.getFullYear() + "-"
            + (date.getMonth() >= 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + "-"
            + (date.getDate() >= 9 ? date.getDate() : ('0' + date.getDate()));
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
    const user = useSelector(state => state.user.user);

    const [studyData, setStudyData] = useState({
        categoryId: 1, //스터디 카테고리
        studyName: "", //스터디 이름
        studyDescription: "", //스터디 설명
        totalMember: 2, //스터디 멤버 수
        disclosure: true, // 공개 여부
        studyPassword: null, // 패스워드
        studyHost: user.memberId, // memberNickName으로 들어갈것 
        studyStartDate: todayString, //스터디 시작일
        studyEndDate: todayString, //스터디 종료일
        studyDeposit: 1500,
    });
    const [studyImg, setStudyImg] = useState(null); //스터디이미지
    const [studyImgView, setStudyImgView] = useState(null); // 스터디이미지 보기

    const { categoryId,
        studyName,
        studyDescription,
        totalMember,
        disclosure,
        studyPassword,
        studyDeposit } = studyData

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
                studyPassword: ''
            }
        })
    }


    // 시퀀스 생성
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    const dayList = ["일", "월", "화", "수", "목", "금", "토"]
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
    // 일정 아이템을 형식에 맞게 변환
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
        // 시작시간과 종료시간이 유효하지 않을때
        if (Number(studyStartHour) > Number(studyEndHour) || (studyStartHour === studyEndHour && Number(studyStartMin) >= Number(studyEndMin))) {
            alert('스터디 일정을 확인해주세요. 시작시간과 종료시간이 유효하지 않습니다.')
        }
        else {
            setStudySchedule((studySchedule) => {
                const newStudySchedule = studySchedule.filter((item) => { return item.studyDay !== studyScheduleItem.studyDay })
                return [...newStudySchedule, scheduletoData(studyScheduleItem)].sort(
                    (a, b) => {
                        return Number(a.studyDay) - Number(b.studyDay)
                    })
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
        const fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
        const maxSize = 5 * 1024 * 1024;
        let fileSize;

        const imgFile = e.target.value;

        // 이미지 업로드 유효성검사 
        if (imgFile !== "" && imgFile != null) {
            fileSize = e.target.files[0].size;

            if (!imgFile.match(fileForm)) {
                alert("이미지 파일만 업로드 가능");
                return;
            } else if (fileSize === maxSize) {
                alert("파일 사이즈는 5MB까지 가능");
                return;
            }
        }
        const file = e.target.files[0];

        setStudyImg(() => { return file })

        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setStudyImgView(() => { return reader.result || null }); // 파일의 컨텐츠
                resolve();
            };
        });
    }


    const navigate = useNavigate();

    const isValidSubmit = () => {
        const wordTrim = /(\s*)/g;
        const nameLength = studyName.replace(wordTrim, "").length
        // 스터디이름 설정
        if (nameLength < 3 || nameLength > 20) {
            alert('스터디 이름은 공백을 제외한 3 ~ 20자로 설정해주세요')
            return false
        }
        // 스터디 정원 설정
        else if (totalMember < 2 || totalMember > 8) {
            alert('스터디 정원은 2 ~ 8명으로 설정해주세요')
            return false
        }
        // 스터디 비밀번호 설정 
        else if (!disclosure && (studyPassword.length === 0)) {
            alert('비공개 스터디의 비밀번호를 설정해주세요')
            return false
        }
        else if (Number(studyPassword) < 0) {
            alert('비밀번호는 -를 제외한 숫자로 입력해주세요')
            return false
        }
        // 스터디 일정 확인
        else if (studySchedule.length === 0) {
            alert('스터디 일정을 추가해주세요')
            return false
        }
        else if (Number(studyDeposit) < 1500 || Number(studyDeposit) > 60000 || studyDeposit % 3 !== 0) {
            alert('보증금은 1500원 ~ 60000원 범위로 3의 배수로 입력해주세요')
            return false
        }
        return true
    }

    // 생성 요청 제출
    const handleStudyCreateSubmit = () => {
        if (isValidSubmit()) {
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
            // for (const [key, value] of formData.entries()) {
            //     console.log(key, typeof value);
            // }
            // console.log(studyReqDto)


            apiClient.post('study/create',
                formData,
                {
                    header: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
                .then((res) => {
                    console.log(res);
                    console.log(studyReqDto, studyImg);
                    navigate(`../${res.data.studyId}`)

                }).catch((err) => {
                    console.log(err);
                    console.log(studyReqDto, studyImg);
                })
        }
    }
    // 보증금 인풋에서 엔터 시 생성요청
    const handleStudyCreateEnter = (e) => {
        if (e.key === 'Enter') {
            handleStudyCreateSubmit();
        }
    }


    return (

        <div className={style.container}>

            <div className={style.disclosureContainer}>
                <h3>스터디 생성</h3>
            </div>

            <div>
                <div className={style.disclosureContainer}>
                    <div className={style.disclosure}>카테고리</div>
                    <div className={style.buttons}>
                        {categoryIdArray.map((categoryIdItem, index) =>

                            <button key={categoryIdItem} className={index === categoryId - 1 ? style.selected : style.noSelected}
                                onClick={() => handleCategoryIdClick(index)}>{categoryIdItem}</button>

                        )}
                    </div>
                </div>

                <div className={style.disclosureContainer}>
                    <div className={style.disclosure}>공개 여부</div>
                    <div className={style.buttons}>
                        <button name="disclosure" className={disclosure ? style.selected : style.noSelected} value={disclosure} onClick={() => handleIsDisclosureClick(true)}> 공개</button>
                        <Tooltip message={`비공개 스터디로 설정할 경우 비밀번호를 입력해야 스터디에 참여할 수 있어요.`}>
                            <button name="disclosure" className={!disclosure ? style.selected : style.noSelected} value={disclosure} onClick={() => handleIsDisclosureClick(false)}> 비공개</button>
                        </Tooltip>
                    </div>

                </div>

                <div>
                    {!disclosure &&
                        <div className={`${style.inputField} ${style.disclosureContainer}`}>
                            <div className={style.disclosure}>패스워드</div>
                            <Tooltip message={'비밀번호를 숫자로 입력해주세요.'}>
                                <input
                                    style={{ width: 660 }}
                                    type="number"
                                    name="studyPassword"
                                    value={studyPassword}
                                    onChange={handleChange}
                                    onWheel={(e) => e.target.blur()} />
                            </Tooltip>
                        </div>
                    }
                </div>


                <div className={`${style.inputField} ${style.disclosureContainer}`}>
                    <div className={style.disclosure}>스터디 이름</div>
                    <Tooltip message={'스터디 이름은 공백을 제외한 3 ~ 20자로 설정해주세요.'}>
                        <input style={{ width: 660 }} type="text" name="studyName" value={studyName} onChange={handleChange} />
                    </Tooltip>
                </div>

                <div className={`${style.inputField} ${style.disclosureContainer}`}>
                    <div className={style.disclosure}>스터디 설명</div>
                    <Tooltip message={`스터디 설명을 적어주세요. 
                    \n스터디 메인화면에서 스터디를 소개할 때 사용됩니다.`}>
                        <textarea style={{ width: 660, height: 100 }} type="text" name="studyDescription" value={studyDescription} onChange={handleChange} />
                    </Tooltip>
                </div>

                <div className={style.disclosureContainer}>
                    <div className={style.disclosure}>스터디 기간</div>
                    <div >
                        시작일
                        <DatePicker className={style.inputFieldDatePicker}
                            selected={startDate}
                            onChange={(date) => { date > today && setStartDate(date) }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div>
                        종료일
                        <DatePicker className={style.inputFieldDatePicker}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>
                </div>


                <div className={`${style.memberContainer} ${style.disclosureContainer}`}>
                    <div className={style.disclosure}>스터디 멤버수</div>
                    <Tooltip message={'스터디 인원은 2인 ~ 8인으로 구성됩니다.'}>
                        <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                    </Tooltip>
                </div>


                <div className={style.disclosure}>
                    스터디 요일/시간
                </div>

                <div className={`${style.scheduleContainer} ${style.disclosureContainer}`}>
                    <Tooltip message={`스터디를 진행할 요일과 시간을 선택하고 추가해주세요. 
                    \n 스터디 기간 동안 설정한 요일과 시간에 매주 진행되고,
                    \n 변경할 수 없으니 신중히 정하는 것을 추천드립니다.`}>
                        <div>
                            요일
                            <select className={style.txtDay} name="studyDay" id="studyDay" onChange={handleStudyScheduleItemChange} value={studyDay}>
                                {dayList.map((value, index) => {
                                    return < option key={index} value={index}> {value}</option>
                                })}
                            </select>
                            <div></div>

                            시작시간
                            <select className={style.txt} name="studyStartHour" id="studyStartHour" onChange={handleStudyScheduleItemChange} value={studyStartHour}>
                                {hourList.map((value, index) => {
                                    return < option value={value}> {value}</option>
                                })}
                            </select>
                            시

                            <select className={style.txt} name="studyStartMin" id="studyStartMin" onChange={handleStudyScheduleItemChange} value={studyStartMin}>
                                {minList.map((value, index) => {
                                    return < option value={value}> {value}</option>
                                })}
                            </select>
                            분

                            <div></div>

                            종료시간
                            <select className={style.txt} name="studyEndHour" id="studyEndHour" onChange={handleStudyScheduleItemChange} value={studyEndHour}>
                                {hourList.map((value, index) => {
                                    return < option value={value}> {value}</option>
                                })}
                            </select>
                            시

                            <select className={style.txt} name="studyEndMin" id="studyEndMin" onChange={handleStudyScheduleItemChange} value={studyEndMin}>
                                {minList.map((value, index) => {
                                    return < option value={value}> {value}</option>
                                })}
                            </select>
                            분
                        </div>
                    </Tooltip>

                    <div className={style.scheduleButtonContainer}>
                        <button onClick={handleAddScheduleBtnClick}>일정 추가</button>
                        <button onClick={handleScheduleResetClick}>일정 초기화</button>
                    </div>


                    <hr />
                    스터디 일정
                    <div className={`${style.disclosure} ${style.scheduleBox}`}>
                        {
                            studySchedule.map(({ studyDay, studyStartTime, studyEndTime }, index) => {
                                return <div className={style.scheduleItem} key={index} >{dayList[studyDay]} 요일  {studyStartTime} ~  {studyEndTime}</div>
                            })
                        }
                    </div>

                    <hr />

                </div>


                <div className={`${style.imageContainer} ${style.disclosureContainer} ${style.disclosure}`}>
                    스터디 대표 이미지
                    <label style={{ display: "inline" }} htmlFor="studyImg" className={`${style.customFileInput} ${style.centeredText}`}>
                        이미지 업로드
                        <input type="file" name="studyImg" id="studyImg" onChange={handleStudyImgUpload} style={{ display: 'none' }} />
                    </label>
                </div>

                <div className={`${style.imagePreview} ${style.disclosureContainer}`} style={{ width: 200, height: 200 }}>
                    {studyImgView && <img src={studyImgView} alt="" width={200} height={200} />}
                </div>


                <div className={`${style.memberContainer} ${style.disclosureContainer} ${style.disclosure}`}>
                    <div>스터디 보증금</div>
                    <Tooltip message={`스터디 보증금은 벌금 3회분의 금액입니다. 
                    \n 스터디 가입 시 보증금만큼 회원님의 포인트를 차감하고,
                    \n 스터디가 종료되면 벌금 정산 후 돌려드릴거에요.
                    \n 1500원 ~ 60000원 사이의 3의 배수 금액으로 설정해주세요.`}>
                        <input
                            type="number"
                            name="studyDeposit"
                            value={studyDeposit}
                            onChange={handleChange}
                            onKeyDown={handleStudyCreateEnter}
                            onWheel={(e) => e.target.blur()}
                        />
                    </Tooltip>
                </div>


                <div className={`${style.buttonContainer} ${style.disclosureContainer} ${style.disclosure}`}>
                    <button className={style.submitButton} onClick={handleStudyCreateSubmit}>스터디 생성</button>
                    <Link to='/Study'>
                        <button className={style.cancelButton}>취소하기</button>
                    </Link>
                </div>


            </div>
        </div >
    );
}

export default StudyCreate;