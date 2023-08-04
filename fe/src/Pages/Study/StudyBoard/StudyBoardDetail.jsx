import React, { useEffect, useState } from 'react'
import style from './StudyBoardDetail.module.css'
import StudyBoardCommentList from '../../../Components/Study/StudyBoard/StudyBoardCommentList';

import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/apiClient';

const StudyBoardDetail = () => {
    const params = useParams();
    const boardId = params.boardId;
    const navigate = useNavigate();

    // Outlet context 로 props 가져오기
    const { studyId, boardType } = useOutletContext();

    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',

        boardType,
        studyId,
        // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ
        createdDate: '',
        boardHit: 0,

        memberNickname: '',
        memberId: 0
    });


    const config = {}
    useEffect(() => {
        apiClient.get(`study/board/${boardId}`)
            .then((res) => {
                setBoardData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // 테스트용
    useEffect(() => {
        setBoardData({
            boardTitle: '여기는 제목',
            boardContent: '여기는 내용',

            boardType,
            studyId,
            createdDate: '23/07/24',
            boardHit: 1,
            memberNickname: '철수',
            memberId: 1
        })
    }, [])

    const handleRepBtnClick = () => {
        console.log("대표글axios적용할것")
        // apiClient.post('url', { boardId }, config)
        //     .then((res) => { })
        //     .catch((err) => { })
    }

    const handleBackBtnClick = () => {
        boardType === 2 ? navigate(`/Study/${studyId}/Board/`) : navigate(`/Study/${studyId}/Notice/`)
    }


    return (
        <div className={style.container}>
            {/* 게시글 윗부분 6:2:2*/}
            <div className={style.titleBox}>
                <div>
                    {/* 제목 */}
                    <div>{boardData.boardTitle}</div>
                    <div className={style.subBox}>
                        {/* 작성일 */}
                        <div>작성일 {boardData.createdDate}</div>
                        {/* 조회수 */}
                        <div>조회수 {boardData.boardHit} 회</div>
                    </div>
                </div>
                {/* 대표글 설정 조건부 렌더링 */}
                <div>
                    {boardType === 1 ?
                        <div onClick={handleRepBtnClick} className={`${style.btn} ${style.gray}`}>
                            대표글로 설정
                        </div> :
                        <></>
                    }
                </div>
                {/* 게시글 목록으로 가기 버튼 렌더링 */}
                <div>
                    <div onClick={handleBackBtnClick} className={`${style.btn} ${style.blue}`}>
                        목록으로 가기
                    </div>
                </div>
            </div>

            {/* 게시글 내용 */}
            <div className={style.contentBox}>
                게시글 내용~
            </div>
            {
                boardType === 2 ?
                    <div>
                        댓글창
                    </div>
                    : <></>
            }
        </div >
    )
}

export default StudyBoardDetail