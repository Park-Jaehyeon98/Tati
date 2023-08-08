import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
import NoticeListItem from '../../Components/Notice/NoticeListItem';
import { Link } from 'react-router-dom';
import style from './NoticeList.module.css';

const NoticeList = () => {
    // 여기서 요청 보냄
    const [boardList, setBoardList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const firstPage = currentPage - (currentPage % 5) + 1


    // const subURL = 'notice'
    // const config = { params: { pageNum: currentPage } }

    // useEffect(() => {
    //     apiClient.get(subURL, config)
    //         .then((res) => {
    //             // console.log(res)
    //             setBoardList(res.data.content)
    //             setTotalPages(res.data.sort.totalPages)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // }, [])

    // 더미데이터용
    useEffect(() => {
        setBoardList([{ boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 },])
    }, [])


    return (
        <div>
            <h3>공지사항</h3>
            {/* 공지사항 리스트 */}
            <div>
                {!(boardList.length === 0) ||
                    boardList.map((boardItemInfo, index) =>
                        <Link className={style.Link} key={index} to={`${boardItemInfo.boardId}`}>
                            <NoticeListItem boardItemInfo={boardItemInfo} />
                        </Link>)
                }
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
        </div>

    )
}

export default NoticeList