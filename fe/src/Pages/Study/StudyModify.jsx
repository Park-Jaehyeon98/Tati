import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import style from './StudyModify.module.css';
import StudyDeleteButton from '../../Components/Study/StudyDeleteButton';
import { apiClient } from '../../api/apiClient';

const StudyModify = () => {
    const navigate = useNavigate();

    const params = useParams();
    const studyId = params.studyId;

    const [studyData, setStudyData] = useState({
        categoryId: 1, //스터디 카테고리
        studyName: "스터디", //스터디 이름
        studyDescription: "스터디설명", //스터디 설명
        studyDay: "", //스터디 요일, 시간
        totalMember: "", //스터디 멤버 수x`
        disclosure: true, // 공개 여부
        studyPassword: null // 패스워드
    });
    const [studyImg, setStudyImg] = useState(null); //스터디이미지
    const [studyImgView, setStudyImgView] = useState(null); // 스터디이미지 보기


    useEffect(() => {
        apiClient.get(`study/${studyId}`)
            .then((res) => {
                console.log(res.data);
                setStudyData(res.data);
            })
    }, []);

    const { categoryId,
        studyName,
        studyDescription,
        totalMember,
        disclosure,
        studyPassword,
        // studyImg, 
    } = studyData

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudyData((studyData) => {
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



    // // 생성 요청 제출
    // const handleStudyCreateSubmit = () => {
    //     const studyReqDto = {
    //         ...studyData,
    //         studySchedule: studySchedule,
    //         studyStartDate: dateToString(startDate),
    //         studyEndDate: dateToString(endDate),
    //     }
    //     let formData = new FormData();
    //     formData.append('studyImg', studyImg)

    //     // 키값 수정 필요
    //     formData.append('studyReqDto', new Blob([JSON.stringify(studyReqDto)], {
    //         type: "application/json"
    //     }))

    //     apiClient.post('study/create',
    //         formData,
    //         {
    //             header: {
    //                 'Content-Type': 'multipart/form-data',
    //             }
    //         })
    //         .then((res) => {
    //             console.log(studyReqDto, studyImg);
    //             console.log(res);
    //         }).catch((err) => {
    //             // console.log(JSON.stringify(studyData))
    //             console.log(err);
    //             console.log(studyReqDto, studyImg);
    //         })
    // }

    // axios 고쳐야함
    const handleStudyModifySubmit = () => {
        const studyReqDto = {
            ...studyData,
        }
        let formData = new FormData();
        formData.append('studyImg', studyImg)
        formData.append('studyReqDto', new Blob([JSON.stringify(studyReqDto)], {
            type: "application/json"
        }))

        apiClient.put(`study/${studyId}/modify`, formData,
            {
                header: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                console.log(res);
                setStudyData(res.data);
            })
            .catch((err) => {
                console.log(err);
                setStudyData(err.data);
            })
    }

    const handleBackButtonClick = () => {
        navigate(`/Study/${studyId}`);
    }


    return (
        <div className='box'>
            <h3>스터디 정보 수정하기</h3>
            <StudyDeleteButton studyId={studyId} />
            <div>

                <div>
                    <div>스터디 대표이미지</div>
                    <input type="file" name="studyImg" onChange={handleStudyImgUpload} />
                </div>
                스터디 이미지
                <div style={{ width: 100, height: 100 }}>
                    {studyImgView && <img src={studyImgView} alt="" width={100} height={100} />}
                </div>
                <div>
                    <div>카테고리</div>
                    {categoryIdArray.map((categoryIdItem, index) =>
                        <button key={categoryIdItem} className={index === categoryId - 1 ? style.selected : style.noSelected} onClick={() => handleCategoryIdClick(index)}>{categoryIdItem}</button>
                    )}
                </div>

                <div>
                    <span>공개 여부</span>
                    <button name="disclosure" className={disclosure ? style.selected : style.noSelected} value={disclosure} onClick={() => handleIsDisclosureClick(true)}> 공개</button>
                    <button name="disclosure" className={!disclosure ? style.selected : style.noSelected} value={disclosure} onClick={() => handleIsDisclosureClick(false)}> 비공개</button>
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

                <div>
                    <span>스터디 멤버수</span>
                    <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                    <span>2명 ~ 8명</span>
                </div>

                <div>
                    <button onClick={handleStudyModifySubmit}>스터디 수정</button>
                    <button onClick={handleBackButtonClick}>취소하기</button>
                </div>
            </div>
        </div>

    )
}

export default StudyModify