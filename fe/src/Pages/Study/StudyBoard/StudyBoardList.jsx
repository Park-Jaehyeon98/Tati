import React, { useEffect, useState } from 'react'
import style from './StudyBoardList.module.css'
import StudyBoardListItem from '../../../Components/Study/StudyBoard/StudyBoardListItem'

import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { apiClient } from '../../../api/apiClient'


const StudyBoardList = () => {
    const navigate = useNavigate();
    const { studyId, boardType } = useOutletContext();


    const [boardList, setBoardList] = useState([]);
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const firstPage = currentPage - (currentPage % 5) + 1

    const memberId = 1;

    useEffect(() => {
        const subURL = boardType === 1 ? `study/${studyId}/notice/` : `study/${studyId}/board/`
        // apiClient.get(`/study/${studyId}/board/`, { params: { pageNum: pageNum, memberId: memberId } })
        apiClient.get(subURL,)
            .then((res) => {
                console.log(res)
                setBoardList(res.data.content);
            })
            .catch((err) => { console.log(err) })
        // setBoardList([{ boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 },])
    }, []);


    return (
        <div>
            {/* 게시판 컨테이너 */}
            <div className={style.container}>
                <div className={style.boardFrame}>
                    <div className={style.cell}>번호</div>
                    <div className={style.cell}>제목</div>
                    <div className={style.cell}>작성자</div>
                    <div className={style.cell}>작성일</div>
                    <div className={style.cell}>조회수</div>
                </div>
                <div className={style.boardContent}>
                    {boardList.length === 0 ?
                        <h3>글이 없습니다..</h3 >
                        : boardList.map((boardData) => {
                            console.log(studyId)
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
            <button
                key={'<'}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                {"<"}
            </button>
            {Array.from({ length: 5 }, (_, i) =>
                currentPage % 5 === 0 ?
                    (firstPage - 5 + i) <= totalPages &&
                    <button
                        key={firstPage - 5 + i}
                        onClick={() => setCurrentPage(firstPage - 5 + i)}
                        disabled={firstPage - 5 + i === currentPage}
                    >
                        {firstPage - 5 + i}
                    </button>
                    :
                    (firstPage + i) <= totalPages && <button
                        key={firstPage + i}
                        onClick={() => setCurrentPage(firstPage + i)}
                        disabled={firstPage + i === currentPage}
                    >
                        {firstPage + i}
                    </button>)}
            <button
                key={'>'}
                onClick={() => {
                    setCurrentPage(currentPage + 1)
                }}
                disabled={currentPage === totalPages || !totalPages}
            >
                {">"}
            </button>
            {/* 스터디 생성 버튼 */}
            <div>
                <Link to='./Create'>
                    <button>새 게시물 만들기</button>
                </Link>
            </div>
            {/* 페이지네이션 */}
            <div>
                페이지네이션
            </div>
        </div >
    )
}

export default StudyBoardList