import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import style from "./FaqListItem.module.css"

const FaqListItem = ({ boardItemInfo }) => {

    const navigate = useNavigate();


    const [isShow, setIsShow] = useState(false);


    // 리덕스 펄시스트 유저정보를 불러옴
    const user = useSelector(state => state.user.user);

    const memberNickName = "관리자"

    const { boardTitle, boardContent, boardId  } = boardItemInfo


    // 제목 누르면 내용 펼쳐짐
    const handleTitleClick = () => {
        setIsShow((isShow) => { return !isShow })
    }


    // 수정버튼 클릭
    const handleModifyBtnClick = () => {
        navigate(`FaqModify`)
    }


    // 삭제버튼 클릭
    const handleDeleteBtnClick = () => {
        console.log('faq 삭제======================')
        console.log(boardTitle)
        console.log(user.memberId)
        console.log('faq 삭제======================')
        axios.post(`${process.env.REACT_APP_URL}/faq/${boardId}/${user.memberId}`, {
          })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }



    return (
        <div>

            <div onClick={handleTitleClick}>
                Q : {boardTitle}
            </div >
            {!isShow ||
                <div className={style.FaqListItem_A}>
                    A : {boardContent}
                    {/* {!(memberNickName === "admin") || */}
                        <div className={style.FaqListItem_btn}>
                            <Button onClick={handleModifyBtnClick} className={style.FaqListItem_btn_update}>수정버튼</Button>
                            <Button onClick={handleDeleteBtnClick}>삭제버튼</Button>
                        </div>
                    {/* } */}

                </div>
            }
            <hr />
        </div>
    )
}

export default FaqListItem