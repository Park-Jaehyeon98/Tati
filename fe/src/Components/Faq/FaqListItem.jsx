import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';


const FaqListItem = ({ boardItemInfo }) => {
    const [isShow, setIsShow] = useState(false);
    // const { memberNickName } = useSelector((state) => { return state.user })
    const memberNickName = "관리자"
    const { boardTitle, boardContent } = boardItemInfo

    // 제목 누르면 내용 펼쳐짐
    const handleTitleClick = () => {
        setIsShow((isShow) => { return !isShow })
    }
    // 수정버튼 클릭
    const handleModifyBtnClick = () => {

    }
    // 삭제버튼 클릭
    const handleDeleteBtnClick = () => {

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
                    {!(memberNickName === "admin") ||
                        <>
                            <Button onClick={handleDeleteBtnClick}>수정버튼</Button>
                            <Button onClick={handleModifyBtnClick}>삭제버튼</Button>
                        </>
                    }

                </div>
            }
            <hr />
        </div>
    )
}

export default FaqListItem