import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './StudyDetailInfo.module.css'
import { useOutletContext, useParams } from 'react-router-dom'
import { apiClient } from '../../api/apiClient';



const StudyDetailInfo = () => {

    const user = useSelector(state => state.user.user);

    const params = useParams();
    const studyId = params.studyId;

    const { studyData, refreshDetail } = useOutletContext();

    const dayList = ["월", "화", "수", "목", "금", "토", "일",]

    // 스터디장 - 신청 승인
    const approval = (memberId) => {
        const subUrl = `/study/applicant/approval`

        const approvalData = {
            studyId,
            memberId
        };

        apiClient.post(subUrl, approvalData)
            .then((res) => {
                console.log(res);
                refreshDetail();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // 스터디장 - 신청 거절
    const disapproval = (memberId) => {
        const subURL = `/study/applicant/${studyId}/refuse/${memberId}`

        apiClient.delete(subURL)
            .then((res) => {
                console.log(res)
                refreshDetail();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // 스터디 탈퇴버튼
    const handleStudySecessionBtnClick = () => {
        const subURL = `study/member/${user.memberId}/secession/${studyId}`
        apiClient.delete(subURL)
            .then((res) => {
                console.log(res)
                refreshDetail()
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const now = new Date()
    const nowDay = now.getDay() === 0 ? now.getDay() + 6 : now.getDay() - 1;
    // 오늘 스터디 있는지 확인

    const [approvalData, setapprovalData] = useState({
        studyId: '',
        memberId: 0
    });

    return (
        <div className={style.container}>
            <div className={style.contentBox}>
                {/* 스터디 소개 */}
                <div className={style.boxTitle}>
                    <span className={style.highlight}>
                        <img className={style.icons} src="../Assets/studyIcon.png" alt="" />
                        스터디 소개
                    </span>
                </div>
                <div className={style.box}>
                    {studyData.studyDescription}
                </div>


                {/* 대표 공지사항 */}
                <div className={style.boxTitle}>
                    <span className={style.highlight}>
                        <img className={style.icons} src="../Assets/checkIcon.png" alt="" />
                        공지사항
                    </span>
                </div>
                <div className={style.box}>
                    {
                        (studyData.studyNoticeDetailResDto != null) ?
                            <>
                                <div>{studyData.studyNoticeDetailResDto.boardTitle}</div>
                                <div>작성자 : {studyData.studyNoticeDetailResDto.memberNickname}</div>
                                <div>작성일 : {studyData.studyNoticeDetailResDto.createdDate}</div>
                                <div>내용 : {studyData.studyNoticeDetailResDto.boardContent}</div>
                            </>
                            : <h3>공지사항이 등록되지 않았습니다.</h3>
                    }
                </div>

                {/* 보증금 현황 */}
                <div className={style.boxTitle}>
                    <span className={style.highlight}>
                        <img className={style.icons} src="../Assets/coinIcon.png" alt="" />
                        스터디 보증금
                    </span>
                </div>
                <div className={`${style.box} ${style.penaltyBox}`}>
                    {/* 보증금 현황은 멤버만 */}
                    <div className={style.penaltyBoxItem}>
                        <div className={style.penaltyBoxItemTitle}>전체 보증금</div>
                        {studyData.totalDeposit} 원
                    </div>
                    <div className={style.penaltyBoxItem}>
                        <div className={style.penaltyBoxItemTitle}>모인 벌금</div>
                        {studyData.totalPenalty} 원
                    </div>
                </div>

                {/* 스터디 일정 */}
                <div className={style.boxTitle}>
                    <span className={style.highlight}>
                        <img className={style.icons} src="../Assets/calenderIcon.png" alt="" />
                        스터디 일정
                    </span>
                </div>
                <div className={`${style.box}`}>
                    <div className={style.scheduleBox}>
                        {
                            (studyData.studySchedule != null) &&
                            dayList.map((value, index) => {
                                return <div className={`${style.scheduleItem} ${nowDay === index && style.isTodayText}`}>
                                    {value}
                                    <div className={`${style.scheduleItemBox} ${nowDay === index && style.isToday}`} >
                                        {
                                            studyData.studySchedule.map((scheduleItem) =>
                                                Number(scheduleItem.studyDay) === index &&
                                                <>{scheduleItem.studyStartTime} ~ {scheduleItem.studyEndTime} </>
                                            )
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

                {/* 스터디 맴버 현황 */}
                <div className={style.boxTitle}>
                    <span className={style.highlight}>
                        <img className={style.icons} src="../Assets/memberIcon.png" alt="" />
                        스터디 멤버
                    </span>
                </div>
                <div className={style.box}>
                    여기는 스터디 멤버
                    {
                        (studyData.studyMemberResDtoList != null) && studyData.studyMemberResDtoList.map(({ memberNickName, totalScore, createdDate, totalStudyTime }) => {
                            return <div>
                                닉네임 : {memberNickName}   /
                                열정 지수 : {totalScore}점 /
                                가입일 : {createdDate} /
                                총 공부시간 : {totalStudyTime}
                                {memberNickName === user.memberNickName &&
                                    <button className={style.smallBtn} onClick={handleStudySecessionBtnClick}>스터디 탈퇴</button>
                                }
                            </div>
                        })

                    }
                </div>
                {
                    user.memberNickName === studyData.studyHost &&
                    <>
                        {/* 스터디 신청 현황 */}
                        <div className={style.boxTitle}>
                            <span className={style.highlight}>
                                <img className={style.icons} src="../Assets/applicantIcon.png" alt="" />
                                가입 신청 현황
                            </span>
                        </div>
                        <div className={style.box}>
                            여기는 신청 멤버
                            {
                                (studyData.applicantList != null) && studyData.applicantList.map(({ memberId, memberNickName, totalScore, createdDate, totalStudyTime }) => {
                                    return <div key={memberId}> 닉네임 : {memberNickName}
                                        / 열정 지수 : {totalScore}점
                                        /  가입일 : {createdDate}
                                        / 총 공부 시간 : {totalStudyTime}
                                        / <button className={style.smallBtn} onClick={() => approval(memberId)}>승인</button>
                                        <button className={style.smallBtn} onClick={() => disapproval(memberId)}>거절</button>
                                    </div>
                                })

                            }
                        </div>
                    </>
                }


            </div>
        </div >
    )
}
export default StudyDetailInfo