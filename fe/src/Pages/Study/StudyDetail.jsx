import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import style from './StudyDetail.module.css'
import { useSelector } from 'react-redux';

const StudyDetailTest = () => {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.user);

    const [refresh, setRefresh] = useState(true);
    const [viewType, setViewType] = useState(0);
    const [studyData, setStudyData] = useState({
        studyId: 0,
        img: '',
        studyName: '',
        studyDescription: '',
        totalMember: 0,
        disclosure: 0,
        studyHost: '',
        studyDeposit: 0,
        studyPassword: '',
        studyStartDate: '',
        studyEndDate: '',
        categoryId: 0,
        studyMemberYn: false,
        totalPenalty: 0,
        totalDeposit: 0,
        studySchedule: [
            {
                studyDay: 0,
                studyStartTime: '',
                studyEndTime: ''
            }
        ],
        applicantList: [
            {
                memberId: 0,
                memberNickName: '',
                totalScore: 0,
                totalStudyTime: 0
            }
        ],
        studyMemberResDtoList: [
            {
                memberNickName: '',
                totalScore: 0,
                createdDate: '',
                totalStudyTime: 0
            }
        ],
        studyNoticeDetailResDto: {
            boardId: 0,
            boardTitle: '',
            memberId: 0,
            memberNickname: '',
            createdDate: '',
            mainNoticeYn: true
        }
    });


    const studyId = params.studyId;

    // viewType
    const viewTypeURL = ['', 'Notice', 'Board']
    const viewTypeText = ['스터디 메인', '스터디 공지사항', '스터디 게시판']
    const dayList = ["월", "화", "수", "목", "금", "토", "일",]

    // viewType 변경시 그에 따른 viewType으로 이동
    const handleViewTypeBtnClick = (e) => {
        setViewType((prev) => { return e.target.value })
        navigate(viewTypeURL[e.target.value])
    }

    // 처음 렌더링시 스터디 상세정보를 받아옴
    useEffect(() => {
        apiClient.get(`study/${studyId}/${user.memberId}`)
            .then(res => {
                // console.log(res.data);
                console.log(res.data)
                setStudyData(res.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }, [studyId, user.memberId, refresh]);

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

    // 스터디 수정으로 이동
    const handleModifyBtnClick = () => {
        navigate('Modify')
    }

    // 신청버튼 클릭 시 
    const handleApplyBtnClick = () => {
        apiClient.post('study/applicant', { memberId: user.memberId, studyId })
            .then((res) => {
                console.log(res)
                setRefresh((prev) => { return !prev })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // 디테일 페이지 재 렌더링
    const refreshDetail = () => {
        setRefresh((prev) => { return !prev })
    }

    // 스터디 입장 버튼 클릭
    const handleEnterBtnClick = () => {
        navigate("/VideoRoom", { state: { memberId: user.memberId, studyId: studyId } });
    }
    // 현재 시간과 스터디 시간을 비교해 입장 가능 시간일 경우 true 반환
    const now = new Date()
    const isStudyTime = () => {
        const now = new Date()
        const nowDay = now.getDay() === 0 ? now.getDay() + 6 : now.getDay() - 1;
        // 오늘 스터디 있는지 확인
        const todayStudy = studySchedule.filter((scheduleItem) => scheduleItem.studyDay == nowDay)

        if (todayStudy) {
            // if(todayStudy[0][studyStartTime] )
            return true
        }
        // 요일이 같은지 확인 
        // 요일이 같다면 -> date객체를 2개 만들어서 now와 비교
        return false
    }

    return (
        <div className={style.container}>
            {/* 헤더에 필요한 내용  : 가입여부, 신청여부,< 방장여부, 스터디 이미지, 스터디 요일, 비밀글여부; 스터디데이터>  */}
            <div className={style.titleBox}>
                {/* 스터디 대표이미지 들어감 */}
                <div className={style.content}>
                    {
                        img ? <img src={img} alt={`${studyData.studyName}의 대표이미지`} className={style.titleImg} />
                            : <div className={style.titleImg}></div>
                    }
                </div>

                {/* 스터디 이름이 들어가는 2번째 섹션 */}
                <div className={style.mainView}>
                    <h2>
                        {studyData.studyName}
                        {/* 비밀글 일 경우 옆에 자물쇠 이미지 */}
                        {
                            studyData.disclosure ||
                            <img className={style.icon} src="../Assets/disclosureIcon.png" alt="비공개" />
                        }
                    </h2>
                    {viewType === "2" ?
                        // 스터디 게시판일 때

                        <div>
                            <div>
                                자유게시판
                            </div>
                            <div className={style.titleDescription}>
                                스터디원들끼리 소통하는 공간입니다.<br />
                                이곳에 작성된 글은 스터디 멤버만 확인할 수 있습니다.
                            </div>
                        </div> :
                        viewType === "1" ?
                            // 공지사항일 때

                            <div>
                                <div>
                                    공지사항
                                </div>
                                <div className={style.titleDescription}>
                                    스터디 공지사항을 이곳에서 확인해보세요. <br />
                                    중요 공지와 스터디 규칙을 대표로 설정하세요.
                                </div>
                            </div> :

                            // viewType 0 ; 메인페이지일 때

                            <div>

                                {/* 스터디 요일 */}
                                {studyData.studySchedule &&
                                    studyData.studySchedule.map(({ studyDay }) => {
                                        return <span key={studyDay} className={style.smallBox}>{dayList[studyDay]}</span>
                                    })}

                                {/* 스터디 기간 */}
                                <span>{studyData.studyStartDate} - {studyData.studyEndDate}</span>
                                <span className={style.dDay}>D - {Number(studyData.studyEndDate.substring(8, 10)) - now.getDate()}</span>

                                {/* 카테고리 */}
                                <span>{studyData.categoryId}</span>



                                <div>
                                    {/* 가입안했을 경우 */}
                                    {studyData.studyMemberYn || <button className={`${style.smallBtn} ${style.isSelected}`} onClick={handleApplyBtnClick}>가입 신청</button>}

                                    {/* 방장의 경우 */}
                                    {user && user.memberNickName === studyHost &&
                                        <button className={style.smallBtn} onClick={handleModifyBtnClick}>스터디 정보 수정</button>
                                    }
                                </div>
                            </div>
                    }
                </div>
                <div className={style.content}>
                    {
                        !isStudyTime ?
                            <button className={style.camBtn} onClick={handleEnterBtnClick}>스터디룸 입장</button> :
                            <button className={`${style.camBtn} ${style.noStudytime}`}>스터디 시간이 아닙니다</button>
                    }

                </div>

            </div>
            <div className={style.btnBox}>
                {/* 메인, 공지사항, 게시판 이동 */}
                {[0, 1, 2].map((index, value) => {
                    return <div className={style.btns}>
                        <button onClick={handleViewTypeBtnClick} value={index} key={index} className={`${style.btn} ${index == viewType && style.isSelected}`}>{viewTypeText[index]} </button>
                    </div>
                })}
            </div>
            <Outlet context={{ studyData, refreshDetail }} />
        </div>
    )
}

export default StudyDetailTest