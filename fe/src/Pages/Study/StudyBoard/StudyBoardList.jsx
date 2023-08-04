import React, { useEffect, useState } from 'react'
import style from './StudyBoardList.module.css'
import StudyBoardListItem from '../../../Components/Study/StudyBoard/StudyBoardListItem'

import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { apiClient } from '../../../api/apiClient'


const StudyBoardList = () => {
    const navigate = useNavigate();
    const { studyId, boardType } = useOutletContext();


    const [boardList, setBoardList] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const memberId = 1;

    useEffect(() => {
        const subURL = boardType === 1 ? `study/${studyId}/notice/` : `study/${studyId}/board/`
        // apiClient.get(`/study/${studyId}/board/`, { params: { pageNum: pageNum, memberId: memberId } })
        apiClient.get(subURL)
            .then((res) => {
                console.log(res)
                setBoardList(res.data)
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
                                <div>
                                    <StudyBoardListItem key={boardData.boardId} boardData={boardData} studyId={studyId} boardType={boardType} />
                                    <hr />
                                </div>)

                        })
                    }
                </div>
            </div>
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