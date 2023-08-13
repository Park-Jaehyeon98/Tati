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
        <div>
            <h3>FAQ 수정</h3>
            <div>
                <span>제목</span>
                <input type="text" name="boardTitle" value={boardTitle} onChange={handleChange} />
            </div>
            <div>
                <span>내용</span>
                <input type="text" name="boardContent" value={boardContent} onChange={handleChange} />
            </div>
            <div>
                <div className={style.btn} onClick={handlemodifyBtnClick}>
                    수정하기
                </div>
                <div className={style.btn} onClick={handleCancelBtnClick}>
                    취소
                </div>
            </div>
        </div>
    )
}

export default FaqModify