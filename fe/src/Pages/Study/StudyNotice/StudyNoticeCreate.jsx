import React, { useState } from 'react'
import { apiClient } from './../../../api/apiClient';
import { redirect } from 'react-router-dom';

const StudyNoticeCreate = (studyId) => {



    const [noticeBody, setNoticeBody] = useState({
        boardTitle: '',
        boardContent: '',

        boardType: 1,
        // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

        studyId: studyId,
        memberId: 1
    })

    // 비구조화 할당
    const { boardTitle, boardContent } = noticeBody;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoticeBody({
            ...noticeBody,
            [name]: value,
        });
    };



    const handleCompleteBtnClick = () => {
        console.log(noticeBody)
        apiClient.post('', noticeBody)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // 스터디 
    const handleCancleBtnClick = () => {
        redirect('/')
    }


    return (
        <div>
            <div style={{ height: 100 }}></div>
            <div>여기는 스터디 공지 헤더</div>
            <h3>스터디 공지 작성</h3>
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

export default StudyNoticeCreate