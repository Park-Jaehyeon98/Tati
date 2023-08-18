import React, { useEffect, useState } from 'react';
import style from './StudyBoardDetail.module.css';

import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/apiClient';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

const StudyBoardDetail = () => {
    const params = useParams();
    const boardId = params.boardId;
    const navigate = useNavigate();

    const { memberId, memberNickName } = useSelector((state) => { return state.user.user })
    // Outlet context 로 props 가져오기
    const { studyId, boardType, studyHost, refreshDetail } = useOutletContext();
    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',

        boardType,
        studyId,
        // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ
        createdDate: '',
        boardHit: 0,

        memberNickname: '',
        memberId: 0,

        boardFile: null,
        boardFileName: null
    });

    const [commentContent, setCommentContent] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [refreshBoardDetail, setRefreshBoardDetail] = useState(false);



    const config = {}
    useEffect(() => {
        const subURL = boardType === 1 ? `study/notice/${boardId}` : `study/board/${boardId}`
        apiClient.get(subURL)
            .then((res) => {
                console.log("멤버아이디", memberId)
                console.log("호스트", studyHost)
                console.log(res.data)
                setBoardData(() => { return res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // 댓글리스트 받아옴
    useEffect(() => {
        apiClient.get(`study/board/${boardId}/comment`,
            {
                params: {
                    page: 0
                }
            })
            .then((res) => {
                console.log(res)
                setCommentList(() => { return res.data.content })
            })
            .catch((err) => {
                console.log(err)
            });
    }, [refreshBoardDetail, boardId])


    // 대표글 설정 버튼
    const handleRepBtnClick = () => {
        // console.log("대표글axios적용할것")
        apiClient.post('study/notice/main', { boardId, memberId }, config)
            .then((res) => {
                console.log(res.data)
                refreshDetail()
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
        boardType === 2 ?
            apiClient.delete(`study/board/${boardId}/${memberId}`)
                .then((res) => {
                    console.log(res)
                    navigate(`/Study/${studyId}/Board/`)
                })
                .catch((err) => {
                    console.log(err)
                })
            : apiClient.delete(`study/notice/${boardId}/${memberId}`)
                .then((res) => {
                    console.log(res)
                    navigate(`/Study/${studyId}/Notice/`)
                })
                .catch((err) => {
                    console.log(err)
                })

    }
    // 수정버튼
    const handleModifyBtnClick = () => {
        // console.log("대표글axios적용할것")
        navigate('Modify')
        // navigate(`Study/${studyId}/Notice/${boardId}/Modify`)
    }

    const handleFileDownlad = () => {

        if (boardData.boardFile) {
            const subURL = '/study/board/file/download'
            const config = {
                params: {
                    boardFile: decodeURI(boardData.boardFile)
                },
                charset: 'UTF-8',
                responseType: 'blob',
            }
            //
            apiClient.get(subURL, config)
                .then((res) => {
                    console.log(res)
                    const blob = new Blob([res.data], { type: res.headers['content-type'] })
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.target = '_self'
                    link.setAttribute("download", decodeURI(boardData.boardFileName));
                    link.click()
                    // const url = window.URL.createObjectURL(res);
                    // const a = document.createElement('a');
                    // a.href = url;
                    // a.download = "파일명";
                    // document.body.appendChild(a);
                    // a.click();
                    // setTimeout((_) => {
                    //     window.URL.revokeObjectURL(url);
                    // }, 60000);
                    // a.remove();
                    // setOpen(false);
                })
                .catch((err) => {
                    console.error('err: ', err);
                });
        }
    }





    // 댓글창 입력이벤트
    const handleCommentContentChange = (e) => {
        setCommentContent((prev) => { return e.target.value })
    }


    // 댓글 작성 버튼 클릭
    const handleCommentCreate = () => {
        const data = {
            commentContent,
            memberId,
            boardId
        }
        apiClient.post('study/board/comment', data)
            .then((res) => {
                setRefreshBoardDetail((prev) => { return !prev });
                setCommentContent(() => { return '' });
            })
            .catch((err) => {
                console.log(err)
            });
    }
    // 댓글 작성 엔터
    const handleCommentCreateEnter = (e) => {
        if (e.key === 'Enter') {
            handleCommentCreate();
        }
    }

    // 댓글 삭제버튼
    const handleCommentDeleteClick = (e) => {
        apiClient.delete(`study/board/comment/${e.target.value}/${memberId}`)
            .then((res) => {
                console.log(res)
                setRefreshBoardDetail((prev) => { return !prev });
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
                    <div className={style.titleContent}>
                        {boardData.boardTitle}
                    </div>
                    <div className={style.subBox}>
                        {/* 작성일 */}
                        <div>작성일 {boardData.createdDate}</div>
                        {/* 조회수 */}
                        <div>조회수 {boardData.boardHit} 회</div>
                    </div>
                </div>
                <hr />

                {/* 게시글 목록으로 가기 버튼 렌더링 */}
                <div className={style.buttonBox}>
                    <Button onClick={handleBackBtnClick} className={`${style.btn}`}>
                        목록으로 가기
                    </Button>
                    {/* 대표글 설정 조건부 렌더링 */}
                    {
                        boardType === 1 && studyHost === memberNickName &&
                        <Button onClick={handleRepBtnClick} className={`${style.btn}`}>
                            대표글로 설정
                        </Button>
                    }
                    {/* 글의 작성자(memberId) 와 userId가 같아야만 삭제, 수정버튼 활성화 */}
                    {boardData.memberId === memberId &&
                        <>
                            {/* 삭제 */}

                            <Button onClick={handleDeleteBtnClick} className={`${style.btn}`}>
                                삭제
                            </Button>
                            {/* 삭제 */}

                            <Button onClick={handleModifyBtnClick} className={`${style.btn}`}>
                                수정
                            </Button>
                        </>
                    }
                </div>
            </div>

            {/* 게시글 내용 */}
            <div className={style.contentBox}>
                {boardData.boardFile &&
                    <div className={style.boardFileArea}>
                        {/* 이미지일 경우 이미지 렌더링 */}
                        <img className={style.boardImg} src={boardData.boardFile} alt=''></img>
                        {/* 파일 다운로드 기능 */}
                        <div className={style.fileBox}>
                            {decodeURI(boardData.boardFileName)} <button onClick={handleFileDownlad}> 첨부파일 다운로드 </button>
                        </div>

                    </div>
                }
                <div>{boardData.boardContent}</div>
            </div>
            <hr />
            {/* 댓글창 */}
            {
                boardType === 2 &&
                <div className={style.commentContainer}>
                    <div>댓글 목록</div>
                    <div className={style.commentList}>
                        {commentList.length === 0 ?
                            <></>
                            : commentList.map((commentItem, index) => {
                                return <div className={style.commentItem} key={index}>
                                    <div>{commentItem.memberNickName} :</div>
                                    <div style={{ fontSize: '0.8rem' }}>{commentItem.commentContent}</div>
                                    <div>{commentItem.createdDate}</div>

                                    <div>
                                        {/* 삭제버튼 댓글 작성자일경우만 보이게 */}
                                        {commentItem.memberNickName === memberNickName &&
                                            <button value={commentItem.commentId}
                                                onClick={handleCommentDeleteClick}>
                                                X
                                            </button>}</div>
                                </div>
                            })
                        }
                    </div>
                    {/* <StudyBoardCommentList /> */}

                    <div className={style.commentInputField}>
                        <div>새 댓글</div>
                        <input onKeyDown={handleCommentCreateEnter} type="text" value={commentContent} onChange={handleCommentContentChange} />
                        <div style={{ textAlign: 'right' }}><Button onClick={handleCommentCreate}>댓글 달기</Button></div>
                    </div>
                </div>
            }
        </div >
    )
}

export default StudyBoardDetail
