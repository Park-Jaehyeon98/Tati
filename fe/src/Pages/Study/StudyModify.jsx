import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import StudyDeleteButton from '../../Components/Study/StudyDeleteButton';
import { apiClient } from '../../api/apiClient';

const StudyModify = () => {
    const navigate = useNavigate();

    const params = useParams();
    const studyId = params.studyId;

    const [studyData, setStudyData] = useState({
        categoryId: 0, //스터디 카테고리
        studyName: "스터디", //스터디 이름
        studyDescription: "스터디설명", //스터디 설명
        studyDay: "", //스터디 요일, 시간
        totalMember: "", //스터디 멤버 수x`
        // studyImg: "", //스터디 대표 이미지
        disclosure: true, // 공개 여부
        studyPassword: null // 패스워드
    });

    useEffect(() => {
        // axios.get(`http://192.168.31.58:8080/study/${studyId}`
        // )
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
        setStudyData({
            ...studyData,
            [name]: value,
        });
    };

    const handleCategoryClick = (value) => {
        setStudyData({
            ...studyData,
            categoryId: value
        })
    }
    const categoryArray = ["자격증", "취업", "학교", "공시", "기타"]

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


    const handleStudyModifySubmit = () => {
        // 

        // axios({
        //     method: 'put',
        //     url: `http://192.168.31.58:8080/study/${studyId}/modify`,
        //     header: {},
        //     data: studyData
        // })
        // 모듈화
        apiClient.put(`study/${studyId}/modify`, studyData)
            .then((res) => {
                console.log(res);
                setStudyData(res.data);
            })
            .catch((err) => {

            })
    }

    const handleBackButtonClick = () => {
        navigate('');
    }


    return (
        <div className='box'>
            <h3>스터디 수정하기</h3>
            <StudyDeleteButton studyId={studyId} />
            <div>
                <div>
                    <span>카테고리</span>
                    {categoryArray.map((categoryItem, index) =>
                        <button key={categoryItem} className={index === categoryId ? "selected" : "noSelected"} onClick={() => handleCategoryClick(index)}>{categoryItem}</button>
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