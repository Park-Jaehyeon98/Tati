import React, { useEffect, useState } from 'react'
import style from './StudyBoardDetail.module.css'
import StudyBoardCommentList from '../../../Components/Study/StudyBoard/StudyBoardCommentList';

import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/apiClient';
import { useSelector } from 'react-redux';

const StudyBoardDetail = () => {
    const params = useParams();
    const boardId = params.boardId;
    const navigate = useNavigate();
    const { userId } = useSelector((state) => { return state.user })
    // Outlet context 로 props 가져오기
    const { studyId, boardType } = useOutletContext();
    const isRep = true;

    const [boardData, setBoardData, memberId] = useState({
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

    const [commentContent, setCommentContent] = useState('');



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

    // 대표글 설정 버튼
    const handleRepBtnClick = () => {
        // console.log("대표글axios적용할것")
        apiClient.post('study/notice/main', { boardId, memberId }, config)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.data)
            })
    }
    // 뒤로가기 버튼
    const handleBackBtnClick = () => {
        boardType === 2 ? navigate(`/Study/${studyId}/Board/`) : navigate(`/Study/${studyId}/Notice/`)
    }
    // 삭제버튼
    const handleDeleteBtnClick = () => {
        // console.log("대표글axios적용할것")
        apiClient.post('study/notice/main', { boardId, memberId }, config)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.data)
            })
    }
    const handleModifyBtnClick = () => {
        // console.log("대표글axios적용할것")
        apiClient.post('study/notice/main', { boardId, memberId }, config)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.data)
            })
    }
    const handleCommentContentChange = (e) => {
        setCommentContent(e.target.Value)
    }
    // 엔터키 눌러도되게 할까..
    const handleCommentCreate = () => {
        apiClient.post('study/board/comment', { memberId, commentContent })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });
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
                    {
                        boardType === 1 &&
                        <div onClick={handleRepBtnClick} className={`${style.btn} ${style.gray}`}>
                            대표글로 설정
                        </div>
                    }
                </div>
                {/* 게시글 목록으로 가기 버튼 렌더링 */}
                <div>
                    <div onClick={handleBackBtnClick} className={`${style.btn} ${style.blue}`}>
                        목록으로 가기
                    </div>
                </div>
                <div></div>

                {/* 글의 작성자(memberId) 와 userId가 같아야만 삭제, 수정버튼 활성화 */}
                {memberId === userId &&
                    <>
                        {/* 삭제 */}

                        < div >
                            <div onClick={handleDeleteBtnClick} className={`${style.btn} ${style.blue}`}>
                                삭제
                            </div>
                        </div>
                        {/* 삭제 */}

                        <div>
                            <div onClick={handleModifyBtnClick} className={`${style.btn} ${style.blue}`}>
                                수정
                            </div>
                        </div>
                    </>
                }
            </div>

            {/* 게시글 내용 */}
            <div className={style.contentBox}>
                게시글 내용~
            </div>
            {
                boardType === 2 &&
                <div>
                    댓글창
                    <StudyBoardCommentList />
                    새 댓글
                    <input type="text" value={commentContent} onChange={handleCommentContentChange} />
                </div>
            }
        </div >
    )
}

export default StudyBoardDetail