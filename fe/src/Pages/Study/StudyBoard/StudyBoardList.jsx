import React, { useEffect, useState } from 'react'
import style from './StudyBoardList.module.css'
import StudyBoardListItem from '../../../Components/Study/StudyBoard/StudyBoardListItem'
import Loading from '../../../Loading/Loading'

import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { apiClient } from '../../../api/apiClient'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core';

const StudyBoardList = () => {
    const [loadingError, setLoadingError] = useState(true);
    const { studyId, boardType } = useOutletContext();
    const user = useSelector((state) => { return state.user.user })


    const [boardList, setBoardList] = useState([]);
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const firstPage = currentPage - (currentPage % 5) + 1

    const memberId = user.memberId;

    useEffect(() => {
        const subURL = boardType === 1 ? `study/${studyId}/notice/` : `study/${studyId}/board/`
        apiClient.get(subURL,)
            .then((res) => {
                console.log(res)
                setBoardList(res.data.content);
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                setLoadingError(() => { return false })
            })
    }, []);


    return (
        <div>
            {/* 로딩 모달 */}
            {loadingError && (
                <div className={`${style.modal}`}>
                    <Loading />
                </div>
            )}
            {/* 게시판 컨테이너 */}
            <div className={style.container}>
                <div className={style.boardFrame}>
                    <div className={style.cell}>번호</div>
                    <div className={style.cell}>제목</div>
                    <div className={style.cell}>작성자</div>
                    <div className={style.cell}>작성일</div>
                    <div className={style.cell}>조회수</div>
                </div>
                <hr />
                <div className={style.boardContent}>
                    {boardList.length === 0 ?
                        <h3>글이 없습니다..</h3 >
                        : boardList.map((boardData) => {
                            return (
                                <div key={boardData.boardId} >
                                    <StudyBoardListItem boardData={boardData} studyId={studyId} boardType={boardType} />
                                    <hr />
                                </div>)
                        })
                    }
                </div>

            </div>
            {/* 페이지네이션 */}
            <div className={style.pagenataion}>
                <Button
                    key={'<'}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </Button>
                {Array.from({ length: 5 }, (_, i) =>
                    currentPage % 5 === 0 ?
                        (firstPage - 5 + i) <= totalPages &&
                        <Button
                            key={firstPage - 5 + i}
                            onClick={() => setCurrentPage(firstPage - 5 + i)}
                            disabled={firstPage - 5 + i === currentPage}
                        >
                            {firstPage - 5 + i}
                        </Button>
                        :
                        (firstPage + i) <= totalPages && <Button
                            key={firstPage + i}
                            onClick={() => setCurrentPage(firstPage + i)}
                            disabled={firstPage + i === currentPage}
                        >
                            {firstPage + i}
                        </Button>)}
                <Button
                    key={'>'}
                    onClick={() => {
                        setCurrentPage(currentPage + 1)
                    }}
                    disabled={currentPage === totalPages || !totalPages}
                >
                    {">"}
                </Button>
            </div>
            {/* 스터디 생성 버튼 */}
            <div className={style.createBtnBox}>
                <Link to='./Create'>
                    <Button>새 게시물 만들기</Button>
                </Link>
            </div>
        </div >
    )
}

export default StudyBoardList