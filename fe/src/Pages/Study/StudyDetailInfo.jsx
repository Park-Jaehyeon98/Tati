import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import style from './StudyDetailInfo.module.css'
import { useOutletContext, useParams } from 'react-router-dom'
import { apiClient } from '../../api/apiClient';



const StudyDetailInfo = () => {
    
    const user = useSelector(state => state.user.user);

    const params = useParams();
    const studyId = params.studyId;


    const {
        categoryId,
        studyName,
        studyDescription,
        studyStartDate,
        studyEndDate,
        studySchedule,
        totalDeposit,
        totalPenalty,
        studyMemberResDtoList,
        applicantList,
        totalMember,
        studyDeposit,
        disclosure,
        studyHost,
        studyNoticeDetailResDto
    } = useOutletContext();
    const dayList = ["월", "화", "수", "목", "금", "토", "일",]

    const config = {}
    const [studyDetailData, setStudyDetailData] = useState({
        
            studyId : 0,
            img: '',
            studyName: '',
            studyDescription : '',
            totalMember : 0,
            disclosure : 0,
            studyHost: '',
            studyDeposit : 0,
            studyPassword: '',
            studyStartDate : '',
            studyEndDate : '',
            categoryId : 0,
            studyMemberYn : false,
            totalPenalty : 0,
            totalDeposit : 0,
            studySchedule: [
                {
                    studyDay : 0,
                    studyStartTime: '',
                    studyEndTime: ''
                } 
            ] ,
            applicantList: [
                {
                    memberId : 0,
                    memberNickName : '',
                    totalScore : 0,
                    totalStudyTime : 0
                }
            ],
            studyMemberResDtoList: [
                {
                    memberNickName: '',
                    totalScore: 0,
                    createdDate : '',
                    totalStudyTime : 0
                }
            ],
            studyNoticeDetailResDto: {
                boardId: 0,
                boardTitle: '',
                memberId: 0,
                memberNickname: '',
                createdDate : '',
                mainNoticeYn: true
              }
    });
    useEffect(() => {
        apiClient.get(`study/${studyId}/${user.memberId}`)
        // apiClient.get(`study/${studyId}/1`)
            .then((res) => {
                console.log("############################"+res.data.studyName);
                console.log(JSON.stringify(res.data)); 
                setStudyDetailData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [studyId, user.memberId]);

    return (
        <div>
            <div>

                스터디 소개
                
                <div className={style.box}>
                    {studyDescription}
                </div>
                
                공지사항x
                
                <div className={style.box}>
                {
                        (studyNoticeDetailResDto!=null) ?
                          <div>제목 : {studyNoticeDetailResDto.boardTitle} // 작성자 : {studyNoticeDetailResDto.memberNickname} // 작성일 : {studyNoticeDetailResDto.createdDate}</div>
                        : <div>공지사항이 등록되지 않았습니다.</div>

                    }
                    
                </div>
                
                <div className={style.box}>
                    {/* 보증금 현황은 멤버만 */}
                    스터디 보증금 :  {totalDeposit} 원,
                    스터디 총 벌금 : { totalPenalty } 원
                </div>
                
                스터디 일정
                
                <div className={style.box}>
                    {
                        (studySchedule!=null) && studySchedule.map(({ studyDay, studyStartTime, studyEndTime }) => {
                            return <div>{dayList[studyDay]} 요일   {studyStartTime} ~  {studyEndTime}</div>
                        })

                    }
                </div>
                스터디 멤버
                <div className={style.box}>
                    여기는 스터디 멤버
                    {
                        (studyMemberResDtoList!=null) && studyMemberResDtoList.map(({ memberNickName, totalScore, createdDate, totalStudyTime }) => {
                            return <div> 닉네임 : {memberNickName}   // 열정 지수 : {totalScore}점 //  가입일 : {createdDate} // 총 공부시간 : {totalStudyTime}</div>
                        })

                    }
                </div>
                {
                    user.memberNickName === studyHost &&

                <div className={style.box}>
                    여기는 신청 멤버
                    {
                        (applicantList!=null) && applicantList.map(({ memberNickName, totalScore, createdDate, totalStudyTime }) => {
                            return <div> 닉네임 : {memberNickName}   // 열정 지수 : {totalScore}점 //  가입일 : {createdDate} // 총 공부 시간 : {totalStudyTime}</div>
                        })

                    }
                </div>
                }


            </div>
        </div>
    )
}
export default StudyDetailInfo