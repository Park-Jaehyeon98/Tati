import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

import style from './FaqCreate.module.css'


const FaqCreate = () => {

    const naviate = useNavigate();

    // 멤버아이디 리덕스로 받아와야함.
    const [boardData, setBoardData] = useState({
        boardTitle: '',
        boardContent: '',
    });

    const boardType = 9;
    // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ
    const config = 0;

    const { boardTitle, boardContent } = boardData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitBtnClick = () => {
        const subURL = boardType === 0 ? 'notice' : 'faq'
        apiClient.post(subURL, boardData)
            .then((res) => {
                console.log(res)
                if (res.request.status === 200) naviate('../')
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleCancelButtonClick =()=>{
        naviate('/Faq')
    }

    return (
        <div className={style.FaqCreate_box}>
            <h3>FAQ 생성</h3>
            <div className={style.FaqCreate_title}>
                <span className={style.FaqCreate_title_name}>제목</span> 
                <input className={style.FaqCreate_title_input}
                 type="text"
                  name="boardTitle"
                   value={boardTitle}
                    onChange={handleChange}
                    placeholder="제목을 입력해주세요"
                     />
            </div>
            <div className={style.FaqCreate_title}>
                <span className={style.FaqCreate_content_name}>내용</span>
            
                <textarea
                    className={style.FaqCreate_content_input}
                    placeholder="내용을 입력해주세요"
                    name="boardContent"
                    value={boardContent} 
                    onChange={handleChange}
                />
                {/* <input className={style.FaqCreate_content_input} type="text" name="boardContent" value={boardContent} onChange={handleChange} /> */}
            </div>

            <div className={style.FaqCreate_btns}>
                <button className={style.FaqCreate_btn} onClick={handleSubmitBtnClick}>제출</button>
                <button className={style.FaqCreate_btn} onClick={handleCancelButtonClick}>취소</button>
            </div>
        </div>
    )
}

export default FaqCreate