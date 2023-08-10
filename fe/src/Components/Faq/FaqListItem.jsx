import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const FaqListItem = ({ boardItemInfo }) => {
    const [isShow, setIsShow] = useState(false);
    const user = useSelector((state) => { return state.user.user })
    const { memberNickName } = user.memberNickName
    // const memberNickName = "관리자"
    const { boardId, boardTitle, boardContent } = boardItemInfo
    const naviate = useNavigate();

    // 제목 누르면 내용 펼쳐짐
    const handleTitleClick = () => {
        setIsShow((isShow) => { return !isShow })
    }
    // 수정버튼 클릭
    const handleModifyBtnClick = () => {

    }
    // 삭제버튼 클릭
    const handleDeleteBtnClick = () => {

        const subURL = `/faq/${boardId}`;
        console.log(subURL)
        apiClient.delete(subURL+`/${user.memberId}`)
            .then((res) => {
                console.log(res);
                if (res.request.status === 200) {
                    naviate('../faq')
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)
            });

    }
    return (
        <div>
            <hr />
            <div onClick={handleTitleClick}>
                Q : {boardTitle}
            </div>
            {!isShow ||
                <div>
                    A : {boardContent}
                    {(memberNickName === "admin") ||
                        <>
                            <Button onClick={handleModifyBtnClick}>수정버튼</Button>
                            <Button onClick={handleDeleteBtnClick}>삭제버튼</Button>
                            
                        </>
                    }

                </div>
            }
            <hr />
        </div>
    )
}

export default FaqListItem