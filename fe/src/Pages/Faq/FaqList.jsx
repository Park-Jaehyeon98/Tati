import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
import FaqListItem from '../../Components/Faq/FaqListItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import style from './FaqList.module.css'



const FaqList = () => {

    // 여기서 요청 보낸 후 컴포넌트로 뿌려야함. Detail, Modify 둘다
    const [boardList, setBoardList] = useState([]);

    const navigate = useNavigate();

    // 리덕스 펄시스트 유저정보를 불러옴
    const user = useSelector(state => state.user.user);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const firstPage = currentPage - (currentPage % 5) + 1


    const subURL = 'faq'
    const config = { params: { pageNum: currentPage } }



    useEffect(() => {
        call()
    }, [])


    const call = ()=>{
        apiClient.get(subURL, config)
        .then((res) => {
            console.log(res)
            setBoardList(res.data.content)
            setTotalPages(res.data.sort.totaPages)
        })
        .catch((err) => {
            console.log(err)
        });
    }

    // 생성버튼 클릭
    const handleCreateBtnClick = () => {
        navigate('Create')
    }

    // 더미데이터용
    useEffect(() => {
        setBoardList([
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 },
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 }, 
            { boardId: 1, boardTitle: "게시물제목", memberNickname: '철수', boardContent: '내용', createdDate: '23/05/11', boardHit: 111 },

        ])
    }, [])



    return (
        <div>

            <div className={style.FAQ_header}>
                <h3>자주하는 질문</h3>
                <div className={style.post_create_btn}>
                    {/* {!(user.memberNickName === 'admin') || */}
                        
                            <Button 
                            onClick={handleCreateBtnClick}
                            >
                                새 글 작성
                            </Button>
                        {/* } */}
                </div>
            </div>

            {/* 여기에는 faq 리스트 아코디언으로 구현 */}
            <div style={{ overflow: 'auto',
             maxHeight: 'calc(85vh - 100px)',
              border: '1px solid black',
              padding: '20px',
              borderRadius: '8px',
              height: '500px',
              marginLeft: '10px',
              marginBottom: '20px'
               }}>
                {boardList.length === 0 ||
                    boardList.map((boardItemInfo, index) =>
                        <div key={index}>
                            <FaqListItem boardItemInfo={boardItemInfo} />
                        </div>)}
            </div>
            {/* 페이지네이션 */}
            <div className={style.FaqList_btn}>
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
        </div>
    )
}

export default FaqList