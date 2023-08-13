import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

import style from './StudyModify.module.css';
import { apiClient } from '../../api/apiClient';

const StudyModify = () => {
    const navigate = useNavigate();

    const params = useParams();
    const { studyData, refreshDetail } = useOutletContext();
    const studyId = params.studyId;

    const [studyModifyData, setStudyModifyData] = useState({
        categoryId: studyData.categoryId, //스터디 카테고리
        studyName: studyData.studyName, //스터디 이름
        studyDescription: studyData.studyDescription, //스터디 설명
        // totalMember: "", //스터디 멤버 수x`
        disclosure: studyData.disclosure, // 공개 여부
        studyPassword: studyData.studyPassword // 패스워드
    });

    // 스터디 이미지
    const [studyImg, setStudyImg] = useState(null);
    // 스터디 이미지 미리보기
    const [studyImgView, setStudyImgView] = useState(null);

    const { categoryId,
        studyName,
        studyDescription,
        // totalMember,
        disclosure,
        studyPassword,
    } = studyModifyData

    // Modify Form input 변경시
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudyModifyData((studyModifyData) => {
            return {
                ...studyModifyData,
                [name]: value,
            }
        });
    };

    // 카테고리 선택
    const handleCategoryIdClick = (value) => {
        setStudyModifyData((studyModifyData) => {
            return {
                ...studyModifyData,
                categoryId: value + 1
            }
        })
    }
    const categoryIdArray = ["자격증", "취업", "학교", "공시", "기타"]


    // 공개여부 선택
    const handleIsDisclosureClick = (value) => {
        value ? setStudyModifyData((studyModifyData) => {
            return {
                ...studyModifyData,
                disclosure: value,
                studyPassword: null
            }
        }) : setStudyModifyData((studyModifyData) => {
            return {
                ...studyModifyData,
                disclosure: value,
            }
        })
    }

    // 이미지 업로드 -> 파일, 미리보기 변경
    const handleStudyImgUpload = (e) => {
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



    // Modify Put axios
    const handleStudyModifySubmit = () => {
        const studyModifyReqDto = {
            ...studyModifyData,
        }
        let formData = new FormData();
        formData.append('studyImg', studyImg)
        formData.append('studyModifyReqDto', new Blob([JSON.stringify(studyModifyData)], {
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
                refreshDetail()
                navigate(`/Study/${studyId}`)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // 뒤로가기 버튼 -> detail Main으로 돌아감
    const handleBackButtonClick = () => {
        navigate(`/Study/${studyId}`);
    }

    // 삭제 버튼
    const handleDeleteBtnClick = () => {
        const memberId = localStorage.getItem("memberId")
        apiClient.delete(`study/${studyId}/delete/${memberId}`)
            .then((res) => {
                console.log(res.data)
                navigate('/Study')
            })
            .catch((err) => { console.log(err.data) })
    }


    return (
        <div className='box'>
            <h3>스터디 정보 수정하기</h3>
            <button onClick={handleDeleteBtnClick}>스터디삭제버튼</button>
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

                {/* <div>
                    <span>스터디 멤버수</span>
                    <input type="number" name="totalMember" value={totalMember} max={8} onChange={handleChange} />
                    <span>2명 ~ 8명</span>
                </div> */}

                <div>
                    <button onClick={handleStudyModifySubmit}>스터디 수정</button>
                    <button onClick={handleBackButtonClick}>취소하기</button>
                </div>
            </div>
        </div>

    )
}

export default StudyModify