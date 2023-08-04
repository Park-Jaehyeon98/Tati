import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
import NoticeListItem from '../../Components/Notice/NoticeListItem';
import { Link } from 'react-router-dom';
import style from './NoticeList.module.css';

const NoticeList = () => {
    // 여기서 요청 보냄
    const [boardList, setBoardList] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const subURL = 'notice'
    const config = { params: { pageNum: pageNum } }

    useEffect(() => {
        apiClient.get(subURL, config)
            .then((res) => {
                // console.log(res)
                setBoardList(res.data.content)
                setTotalPages(res.data.sort.totalPages)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])


    return (
        <div>
            <h3>공지사항</h3>
            {/* 공지사항 리스트 */}
            <div>
                {boardList.length === 0 ? <></> :
                    boardList.map((boardItemInfo, index) =>
                        <Link className={style.Link} key={index} to={`${boardItemInfo.boardId}`}>
                            <NoticeListItem boardItemInfo={boardItemInfo} />
                        </Link>
                    )}
            </div>
            {/* 페이지네이션 */}
            <div>
                페이지네이션이 들어갑니다
            </div>
        </div>

    )
}

export default NoticeList