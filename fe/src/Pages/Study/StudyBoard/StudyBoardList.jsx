import React, { useEffect, useState } from 'react'
import styles from './StudyBoardList.module.css'
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
        // apiClient.get(`/study/${studyId}/board/`, { params: { pageNum: pageNum, memberId: memberId } })
        //     .then((res) => { console.log(res) })
        //     .cathc((err) => { console.log(err) })
        setBoardList([{ boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 },])
    }, pageNum);


    return (
        <div>
            {/* 게시판 컨테이너 */}
            <div className={styles.container}>
                <div className={styles.boardFrame}>
                    <div className={styles.cell}>번호</div>
                    <div className={styles.cell}>제목</div>
                    <div className={styles.cell}>작성자</div>
                    <div className={styles.cell}>작성일</div>
                    <div className={styles.cell}>조회수</div>
                </div>
                <div className={styles.boardContent}>
                    {boardList.length === 0 ?
                        <h3>글이 없습니다..</h3 >
                        : boardList.map((boardData) => {
                            console.log(studyId)
                            return <StudyBoardListItem key={boardData.boardId} boardData={boardData} studyId={studyId} />
                        })
                    }
                </div>
            </div>
            {/* 스터디 생성 버튼 */}
            <div>
                <Link to='./Create'>
                    <button>새 스터디 만들기</button>
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