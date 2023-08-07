import React from 'react'
import style from './StudyDetailHeader.module.css'
import { Link } from 'react-router-dom'

const StudyDetailHeader = ({ viewType, studyData, isMember, isCandidate, studyId }) => {
    //viewType : 0 메인, 1: 공지, 2: 게시판

    return (
        <>
            <div className={style.container}>
                {/* 스터디 대표이미지 들어감 */}
                <div className={style.content}>
                    스터디 이미지 들어갈 자리
                </div>

                {viewType === 0 ?
                    // const [studyData, setStudyData] = useState({
                    //     category: 1,
                    //     studyName: "스터디이름",
                    //     studyDescription: "스터디설명",
                    //     studyStartDate: "23/07/27",
                    //     studyEndDate: "23/08/01",
                    //     studySchedule: [{ studyDay: '월', studyStartTime: '', studyEndTime: '' },
                    //     { studyDay: '화', studyStartTime: '', studyEndTime: '' },
                    //     { studyDay: '수', studyStartTime: '', studyEndTime: '' }],
                    //     // studyImg,
                    //     totalMember: 5,
                    //     // studyDay,
                    //     // studyStartTime,
                    //     // studyEndTime,
                    //     studyDeposit: 1000,
                    //     disclosure: true,
                    //     studyPassword: "1234"
                    // });

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


                        <div>여기는 버튼</div>
                    </div> :
                    // 공지사항, 게시판의 경우
                    <div className={style.content}>
                        <h3>
                            스터디 이름
                        </h3>
                        {viewType === 1 ?
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
        </>
    )
}
export default StudyDetailHeader