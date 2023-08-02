import React, { useState } from 'react'
import { redirect, useOutletContext } from 'react-router-dom';
import { apiClient } from '../../../api/apiClient';

const StudyBoardCreate = () => {
    const { studyId, boardType } = useOutletContext();

    const [boardBody, setBoardBody] = useState({
        boardTitle: '',
        boardContent: '',

        boardType,
        // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

        studyId,
        memberId: 1
    })

    // 역구조화로 key값을 변수로 사용
    const { boardTitle, boardContent } = boardBody;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardBody({
            ...boardBody,
            [name]: value,
        });
    };

    const handleCompleteBtnClick = () => {
        console.log(boardBody)
        apiClient.post('', boardBody)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // 스터디 게시판 리스트로 돌아가야함
    const handleCancleBtnClick = () => {
        redirect('/')
    }


    return (
        <div>
            <div style={{ height: 100 }}></div>
            <h3>스터디 게시판 작성</h3>
            <div>
                <div>제목
                    <input type="text" name="boardTitle" value={boardTitle} onChange={handleChange} />
                </div>
                <div>내용
                    <input type="text" name="boardContent" value={boardContent} onChange={handleChange} />
                </div>
                <button onClick={handleCompleteBtnClick}>작성 완료</button>
                <button onClick={handleCancleBtnClick}>취소</button>
            </div>
        </div >

    )
}

export default StudyBoardCreate