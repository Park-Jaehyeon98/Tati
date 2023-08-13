import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import style from './StudyDetail.module.css'
import { useSelector } from 'react-redux';

const StudyDetailTest = () => {
    const params = useParams();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => { return state.user })
    const user = useSelector(state => state.user.user);
    const [viewType, setViewType] = useState(0);

    const [studyData, setStudyData] = useState({
        categoryId: 1,
        studyName: "스터디이름",
        studyDescription: "스터디 설명이 들어갑니다. 스터디 설명이 들어갑니다. 스터디 설명이 들어갑니다. 스터디 설명이 들어갑니다.  ",
        studyStartDate: "23/07/27",
        studyEndDate: "23/08/01",
        studyHost: "",
        studySchedule: [{ studyDay: 0, studyStartTime: '12:00', studyEndTime: '12:00' },
        { studyDay: 1, studyStartTime: '12:00', studyEndTime: '12:00' },
        { studyDay: 2, studyStartTime: '12:00', studyEndTime: '12:00' }],
        img: "",
        totalMember: 5,
        studyDeposit: 1000,
        disclosure: true,
        studyPassword: "1234"
    });

    const studyId = params.studyId;

    // viewType
    const viewTypeURL = ['', 'Notice', 'Board']
    const viewTypeText = ['스터디 메인', '스터디 공지사항', '스터디 게시판']


    const handleViewTypeBtnClick = (e) => {
        setViewType((prev) => { return e.target.value })
        console.log(viewType)
        navigate(viewTypeURL[e.target.value])
    }


    // {
    //     "studyId": 24,
    //     "img": "https://tatibucket.s3.ap-northeast-2.amazonaws.com/41403945-6e43-4a8f-a670-e0dc15d070a6_%EC%BA%A1%EC%B2%98%20%281%29.PNG",
    //     "studyName": "제목이 여기임!",
    //     "studyDescription": "설명은 여기",
    //     "totalMember": 0,
    //     "disclosure": true,
    //     "studyHost": "1234",
    //     "studyDeposit": 1000,
    //     "studyPassword": 1234,
    //     "studyStartDate": "2023-08-07",
    //     "studyEndDate": "2023-08-07",
    //     "categoryId": 1
    // }

    // 처음 렌더링시 스터디 상세정보를 받아옴
    useEffect(() => {
        apiClient.get(`study/${studyId}/${user.memberId}`)
            .then(res => {
                // console.log(res.data);
                setStudyData(res.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }, []);

    const {
        categoryId,
        studyName,
        studyHost,
        studyDescription,
        studyStartDate,
        studyEndDate,
        studySchedule,
        img,
        totalMember,
        studyDeposit,
        disclosure,
        studyPassword
    } = studyData

    const hanldeViewTypeBtnClick = (e) => {
        console.log()
    }

    return (
        <div>
            {/* 헤더에 필요한 내용  : 가입여부, 신청여부,< 방장여부, 스터디 이미지, 스터디 요일, 비밀글여부; 스터디데이터>  */}
            <div className={style.container}>
                {/* 스터디 대표이미지 들어감 */}
                <div className={style.content}>
                    <img src={img} alt={`${studyData.studyName}의 대표이미지`} width={100} height={100} />
                </div>

                {viewType === '0' ?
                    // 스터디 메인의 경우
                    <div className={style.mainView}>
                        <h3>{studyData.studyName}</h3>
                        <div>
                            {/* 스터디 요일 */}
                            {studyData.studySchedule &&
                                studyData.studySchedule.map(({ studyDay }) => {
                                    return <span key={studyDay} className={style.smallBox}>{studyDay}</span>
                                })}
                            {/* 스터디 기간 */}
                            <span>{studyData.studyStartDate} ~ {studyData.studyEndDate}</span>
                            <span>{studyData.category}</span>
                        </div>

                        {/* 가입안했을 경우 */}
                        <button>가입 신청</button>
                        {/* 가입했을 경우 -> 버튼 안보이게*/}
                        <></>
                        {/* 방장의 경우 */}
                        {userInfo.memberNickName === studyHost &&
                            <button>스터디 정보 수정</button>
                        }

                    </div> :
                    // 공지사항, 게시판의 경우
                    <div className={style.content}>
                        <h3>
                            {studyData.studyName}
                        </h3>
                        {viewType === '1' ?
                            <div>
                                <div>
                                    공지사항
                                </div>
                                <div>
                                    스터디 공지사항을 이곳에서 확인해보세요. <br />
                                    중요 공지와 스터디 규칙을 대표로 설정하세요.
                                </div>
                            </div> :
                            <div>
                                <div>
                                    자유게시판
                                </div>
                                <div>
                                    스터디원들끼리 소통하는 공간입니다.<br />
                                    이곳에 작성된 글은 스터디 멤버만 확인할 수 있습니다.
                                </div>
                            </div>}
                    </div>
                }
                <div className={style.content}>
                    화상 스터디 참여하기
                </div>

            </div>
            <div className={style.btnBox}>
                {/* 메인, 공지사항, 게시판 이동 */}
                {[0, 1, 2].map((index) => {
                    return <button onClick={handleViewTypeBtnClick} value={index} className={style.btn} key={index}>{viewTypeText[index]} </button>
                })}
            </div>
            <Outlet context={studyData} />
        </div>
    )
}

export default StudyDetailTest