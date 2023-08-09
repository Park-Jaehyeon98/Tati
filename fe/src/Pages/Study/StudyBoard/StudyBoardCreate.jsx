import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiClient } from '../../../api/apiClient';

const StudyBoardCreate = () => {
    const navigate = useNavigate();
    const { studyId, boardType } = useOutletContext();
    // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

    const [boardBody, setBoardBody] = useState({
        boardTitle: '',
        // 제목 string
        boardContent: '',
        // 내용 String
        studyId,
        // 스터디id int
        memberId: 1
        // 멤버id  int
        // 공지사항 생성 시는 제목,내용,스터디id,멤버id  request body에 담아줄것

    })

    // 역구조화로 key값을 변수로 사용
    const { boardTitle, boardContent } = boardBody;

    const { boardFile, setBoardFile } = useState(null);
    const { boardImgView, setBoardImgView } = useState(null);


    const config = {
        headers: {
            header: {
                'Content-Type': 'multipart/form-data',
            }
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardBody({
            ...boardBody,
            [name]: value,
        });
    };

    // 생성버튼 클릭
    const handleCompleteBtnClick = () => {
        const formData = new FormData();
        // 게시판 파일 첨부 -> 있을때만 첨부
        if (boardType === 2) {
            formData.append('', boardFile)
        }

        formData.append('studyCreateDto', new Blob([JSON.stringify(boardBody)], {
            type: "application/json"
        }))


        const subUrl = boardType === 1 ? 'study/notice' : 'study/board';


        apiClient.post(subUrl, formData, config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // 이미지 업로드
    const handleUpload = (e) => {
        const file = e.target.files[0];
        setBoardFile(() => { return file })

        const reader = new FileReader();
        reader.readAsDataURL(file);

        // return new Promise((resolve) => {
        //     reader.onload = () => {
        //         setStudyImgView(() => { return reader.result || null }); // 파일의 컨텐츠
        //         resolve();
        //     };
        // });
    }

    // 스터디 게시판/공지사항 리스트로 돌아가기
    const handleCancleBtnClick = () => {
        boardType === 1 ?
            navigate(`/Study/${studyId}/Notice`) :
            navigate(`/Study/${studyId}/Board`)
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
                {boardType === 2 &&
                    <>
                        <div>
                            <div>파일첨부 </div>
                            <input type="file" name="studyBoardFile" onChange={handleUpload} />
                        </div>

                        {/* <div style={{ width: 100, height: 100 }}>
                            {studyImgView && <img src={studyImgView} alt="" width={100} height={100} />}
                        </div> */}
                    </>

                }
                <button onClick={handleCompleteBtnClick}>작성 완료</button>
                <button onClick={handleCancleBtnClick}>취소</button>
            </div>
        </div >

    )
}

export default StudyBoardCreate