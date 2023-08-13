import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
import NoticeListItem from '../../Components/Notice/NoticeListItem';
import { Link, useNavigate } from 'react-router-dom';
import style from './NoticeList.module.css';
import { useSelector } from 'react-redux';

const NoticeList = () => {
    // 여기서 요청 보냄
    const navigate = useNavigate();
    const user = useSelector((state) => { return state.user })
    const [boardList, setBoardList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const firstPage = currentPage - (currentPage % 5) + 1


    const subURL = 'notice'
    const config = { params: { pageNum: currentPage } }

    useEffect(() => {
        board()
        
    }, [])

    const board = ()=>{
        apiClient.get(subURL, config)
            .then((res) => {
                // console.log(res)
                setBoardList(res.data.content)
                setTotalPages(res.data.sort.totalPages)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // 더미데이터용
    // useEffect(() => {
    //     setBoardList([{ boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 },])
    // }, [])

    const handleCreateBtnClick = () => {
        navigate('Create')
    }

    return (
        <div>
            
            <h3>공지사항</h3>

            {/* 공지사항 리스트 */}
            <div>
                {!(boardList.length === 0) &&
                    boardList.map((boardItemInfo, index) =>
                        <>
                            <hr />
                            <Link className={style.Link} key={index} to={`${boardItemInfo.boardId}`}>
                                <NoticeListItem boardItemInfo={boardItemInfo} />
                            </Link>
                            <hr />
                        </>
                    )
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
            {/* 새 공지 작성하기 관리자만 */}
            {user && (user.memberNickName === 'admin') &&
                <button onClick={handleCreateBtnClick}>
                    새 글 작성
                </button>
            }

        </div>
    )
}

export default NoticeList