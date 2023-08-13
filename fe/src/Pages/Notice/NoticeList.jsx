import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
import NoticeListItem from '../../Components/Notice/NoticeListItem';
import { Link, useNavigate } from 'react-router-dom';
import style from './NoticeList.module.css';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';


const NoticeList = () => {
    // 여기서 요청 보냄
    const navigate = useNavigate();
    const user = useSelector((state) => { return state.user.user })
    const [boardList, setBoardList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    // const firstPage = currentPage - (currentPage % 5) + 1


    const subURL = 'notice'
    const config = { params: { page: currentPage, size: 7 } }


    useEffect(() => {
        call()
    }, [currentPage])


    const call = () => {
        apiClient.get(subURL, config)
            .then((res) => {
                console.log(res)
                setBoardList(res.data.content)
            })
            .catch((err) => {
                console.log(err)
            });
    }


    const handleCreateBtnClick = () => {
        console.log(user)
        navigate('Create')
    }

    const handleNextPageClick = () => {
        console.log(currentPage)
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPageClick = () => {
        // if (currentPage > 0) {
        setCurrentPage(prevPage => prevPage - 1);
        // }
    };

    return (
        <div className={style.NoticeList}>

            <div className={style.Notice_header}>
                <h3>공지사항</h3>
                <div className={style.post_create_btn}>
                    {/* 새 공지 작성하기 관리자만 */}
                    {/* {!(user.memberNickName === 'admin') || */}
                    <Button onClick={handleCreateBtnClick}>
                        새 글 작성
                    </Button>
                    {/* } */}
                </div>
            </div>


            {/* 공지사항 리스트 */}
            <div style={{
                overflow: 'auto',
                // maxHeight: 'calc(85vh - 100px)',
                border: '1px solid black',
                padding: '20px',
                borderRadius: '8px',
                height: '500px',
                marginLeft: '10px',
                marginBottom: '20px',
            }}>
                {!(boardList.length === 0) &&
                    boardList.map((boardItemInfo, index) =>
                        <>

                            <Link className={style.Link} key={index} to={`${boardItemInfo.boardId}`}>
                                <NoticeListItem boardItemInfo={boardItemInfo} />
                            </Link>
                            <hr />
                        </>
                    )
                }
            </div>




            {/* 페이지네이션 */}

            <div className={style.Pagination}>
                <Button onClick={() => handlePrevPageClick(currentPage)} disabled={currentPage === 0}>이전</Button>
                {currentPage + 1}
                <Button onClick={handleNextPageClick} disabled={boardList.length < 7}>다음</Button>
            </div>

        </div>
    )
}

export default NoticeList