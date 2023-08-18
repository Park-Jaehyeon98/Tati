import React, { useEffect, useState } from 'react';
import style from './FaqModify.module.css'
import { apiClient } from '../../api/apiClient';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';



const FaqModify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => { return state.user.user });

    const boardId = location.state.boardId;
    // const boardTitle = location.state.boardTitle;
    // const boardContent = location.state.boardContent;


    const [boardData, setBoardData] = useState({
        boardId: boardId, // 추가된 부분
        boardTitle: '',
        boardContent: ''
    });


    const { boardTitle, boardContent } = boardData;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value,
        });
    };


    const handlemodifyBtnClick = () => {

        console.log(boardId)

        const data = {
            boardId: boardId,
            boardTitle: boardTitle,
            boardContent: boardContent,
            memberId: 1
        }

        console.log(data)

        apiClient.put('faq', data)
            .then((res) => {
                console.log(res)
                navigate('/Faq')
            })
            .catch((err) => {
                console.log(err)
            });
    }


    const handleCancelBtnClick = () => {
        navigate(`/Faq`);
    }


    return (
        <div className={style.FaqModify_box}>
            <h3>FAQ 수정</h3>

            <div className={style.FaqModify_title}>
                <span className={style.FaqModify_title_name}>제목</span>
                <input className={style.FaqModify_title_input}
                    type="text"
                    name="boardTitle"
                    value={boardTitle}
                    onChange={handleChange}
                    placeholder="제목을 입력해주세요"
                />
            </div>

            <div className={style.FaqModify_title}>
                <span className={style.FaqModify_content_name}>내용</span>

                <textarea
                    className={style.FaqModify_content_input}
                    placeholder="내용을 입력해주세요"
                    name="boardContent"
                    value={boardContent}
                    onChange={handleChange}
                />
                {/* <input className={style.FaqCreate_content_input} type="text" name="boardContent" value={boardContent} onChange={handleChange} /> */}
            </div>

            <div className={style.FaqModify_btns}>
                <button className={style.FaqModify_btn} onClick={handlemodifyBtnClick} >제출</button>
                <button className={style.FaqModify_btn} onClick={handleCancelBtnClick}>취소</button>
            </div>
        </div>
    )
}

export default FaqModify
