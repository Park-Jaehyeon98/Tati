import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
// import FaqListItem from '../../Components/Faq/FaqListItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import axios from 'axios';
import style from './FaqList.module.css'

// 리덕스 저장
import { useDispatch } from 'react-redux';
import { addFaq, deleteFaq, updateFaq, resetFaq } from "../../redux/reducers/faqSlice";


export default function FaqList() {

    // 여기서 요청 보낸 후 컴포넌트로 뿌려야함. Detail, Modify 둘다
    const [boardList, setBoardList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 리덕스 펄시스트 유저정보를 불러옴
    const user = useSelector(state => state.user.user);
    const faq = useSelector(state => state.user.faq);

    const [currentPage, setCurrentPage] = useState(0);
    // const firstPage = currentPage - (currentPage % 10) + 1


    const subURL = 'faq'
    const config = { params: { pageNum: currentPage } }


    useEffect(() => {
        call()
    }, [currentPage])


    const call = () => {
        apiClient.get(subURL, {
            params: { page: currentPage, size: 9 }
        }
        )
            .then((res) => {
                console.log(res)
                dispatch(resetFaq())
                res.data.content.forEach((data) => {
                    dispatch(addFaq(data));
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }


    // 생성버튼 클릭
    const handleCreateBtnClick = () => {
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


    // faq리스트 아이템===========================================================
    const FaqListItem = ({ boardId, boardContent, boardTitle }) => {

        const memberNickName = "관리자"

        const [isShow, setIsShow] = useState(false);

        // 제목 누르면 내용 펼쳐짐
        const handleTitleClick = () => {
            setIsShow((!isShow))
        }

        // 수정버튼 클릭
        const handleModifyBtnClick = () => {
            console.log(boardId)
            navigate(`FaqModify`, { state: { boardId, boardTitle, boardContent } });
        }


        // 삭제버튼 클릭
        const handleDeleteBtnClick = () => {
            console.log('faq 삭제======================');
            console.log(boardId);
            console.log(user.memberId);
            console.log('faq 삭제======================');

            // axios를 사용하여 API 호출
            axios.delete(`${process.env.REACT_APP_URL}/faq/${boardId}/${1}`, {})
                .then((res) => {
                    console.log(res);
                    dispatch(deleteFaq(boardId));
                    call();
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return (
            <div>
                <div className={style.title} onClick={handleTitleClick}>
                    Q : {boardTitle}
                </div >
                {!isShow ||
                    <div className={style.FaqListItem_A}>
                        A : {boardContent}
                        {!(memberNickName === "admin") ||
                        <div className={style.FaqListItem_btn}>
                            <Button onClick={() => handleModifyBtnClick(boardId)} className={style.FaqListItem_btn_update}>수정버튼</Button>
                            <Button onClick={handleDeleteBtnClick}>삭제버튼</Button>
                        </div>
                        }

                    </div>
                }
                <hr />

            </div>
        )
    }



    return (
        <div>

            <div className={style.FAQ_header}>
                <h3>자주하는 질문</h3>
                <div className={style.post_create_btn}>
                    {!(user.memberNickName === 'admin') ||

                    <Button
                        onClick={handleCreateBtnClick}
                    >
                        새 글 작성
                    </Button>
                    }
                </div>
            </div>

            {/* 여기에는 faq 리스트 아코디언으로 구현 */}
            <div style={{
                overflow: 'auto',
                maxHeight: 'calc(85vh - 100px)',
                border: '1px solid black',
                padding: '20px',
                borderRadius: '8px',
                height: '500px',
                marginLeft: '10px',
                marginBottom: '20px'
            }}>
                {faq.map((faq, index) => (
                    <FaqListItem
                        key={index}
                        boardId={faq.boardId}
                        boardContent={faq.boardContent}
                        boardTitle={faq.boardTitle}
                    />
                ))}
            </div>

            <div className={style.Pagination}>
                <Button onClick={() => handlePrevPageClick(currentPage)} disabled={currentPage === 0}>이전</Button>
                {currentPage + 1}
                <Button onClick={handleNextPageClick} disabled={faq.length < 10}>다음</Button>
            </div>

        </div>
    )
}
