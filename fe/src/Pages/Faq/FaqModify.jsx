import React, { useEffect, useState } from 'react';
import style from './FaqModify.module.css'
import { apiClient } from '../../api/apiClient';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

const FaqModify = () => {
    const params = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => { return state.user.user });
    const [boardData, setBoardData] = useState({
        boardId : params.boardId,
        boardTitle: '',
        boardContent: '',
        memberId : user.memberId
    });

    const {
        boardId,
        boardTitle,
        boardContent,
    } = boardData;


    useEffect(() => {
        const subURL =`/faq/${boardId}`
        apiClient.get(subURL)
            .then((res) => {
                console.log(res.data)
                setBoardData(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardData({
            ...boardData,
            [name]: value,
        });
    };

    const handlemodifyBtnClick = () => {
        apiClient.put('faq', boardData)
            .then((res) => {
                console.log(res)
                if (res.request.status === 200) navigate(`../`)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleCancelBtnClick = () => {
        navigate(`../`);
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
            <button className={style.FaqModify_btn} >제출</button>
            <button className={style.FaqModify_btn} >취소</button>
        </div>
    </div>
    )
}

export default FaqModify
