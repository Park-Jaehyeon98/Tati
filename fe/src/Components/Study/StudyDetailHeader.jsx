import React, { useState } from 'react'
import style from './StudyDetailHeader.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setStudyViewType } from '../../redux/reducers/studyViewTypeSlice';

const StudyDetailHeader = ({ studyViewType, studyData, isMember, isCandidate, studyId, img }) => {
    // studyViewType : 0 메인, 1: 공지, 2: 게시판
    // studyViewType 0, 1, 2 : 메인, 공지, 스터디게시판
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const viewTypeURL = ['', 'Notice', 'Board']
    const viewTypeText = ['스터디 메인', '스터디 공지사항', '스터디 게시판']
    const handleNavBtnClick = (e) => {

        dispatch(setStudyViewType(e.tartget.value))
        console.log(studyViewType)
    }


    return (
        <>
            <div className={style.container}>
                {/* 스터디 대표이미지 들어감 */}
                <div className={style.content}>
                    <img src={img} alt={`${studyData.studyName}의 대표이미지`} width={100} height={100} />
                </div>

                {studyViewType === 0 ?
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


                        <button>가입 신청</button>
                        <button>가입 신청</button>
                        <button>가입 신청</button>
                    </div> :
                    // 공지사항, 게시판의 경우
                    <div className={style.content}>
                        <h3>
                            {studyData.studyName}
                        </h3>
                        {studyViewType === '1' ?
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
                {[0, 1, 2].map((index, value) => {
                    return <button onClick={handleNavBtnClick} value={value} className={style.btn} key={index}>{viewTypeText[index]} </button>
                    // <Link key={index} to={viewTypeURL[index]}>

                    // </Link>
                })}
            </div>
        </>
    )
}
export default StudyDetailHeader