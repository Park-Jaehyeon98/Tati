import React from 'react'
import style from './StudyDetailInfo.module.css'
import { useOutletContext } from 'react-router-dom'

const StudyDetailInfo = () => {
    const {
        category,
        studyName,
        studyDescription,
        studyStartDate,
        studyEndDate,
        studySchedule,
        // studyImg,
        totalMember,
        // studyDay,
        // studyStartTime,
        // studyEndTime,
        studyDeposit,
        disclosure,
    } = useOutletContext();
    return (
        <div>
            <div>

                스터디 소개
                <div className={style.box}>
                    {studyDescription}
                </div>
                공지사항
                <div className={style.box}>
                    여기는 대표글
                </div>
                {/* 보증금 현황은 멤버만 */}
                스터디 보증금 현황
                <div className={style.box}>
                    여기는 보증금 현황
                </div>
                스터디 일정
                <div className={style.box}>
                    {
                        // 일정 표시
                        studySchedule.map(({ studyDay, studyStartTime, studyEndTime }) => {
                            return <div></div>
                        })
                    }
                </div>
                스터디 멤버
                <div className={style.box}>
                    여기는 스터디 멤버
                </div>
            </div>
        </div>
    )
}

export default StudyDetailInfo