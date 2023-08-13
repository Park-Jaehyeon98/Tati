import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { apiClient } from '../../../api/apiClient';
import { useSelector } from 'react-redux';

const StudyBoardModify = () => {
    const navigate = useNavigate();
    const params = useParams();
    const boardId = params.boardId;

    const { studyId, boardType } = useOutletContext();
    const user = useSelector(state => state.user.user);
    // 0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

    const [boardBody, setBoardBody] = useState({
        boardTitle: '',
        // 제목 string
        boardContent: '',
        // 내용 String
        boardId,
        // 보드id int
        memberId: user.memberId,
        // 멤버id  int
        // 공지사항 생성 시는 제목,내용,스터디id,멤버id  request body에 담아줄것

    })

    useEffect(() => {
        apiClient.get(`study/board/${boardId}`)
            .then((res) => {
                setBoardBody({
                    ...boardBody,
                    boardTitle: res.data.boardTitle,
                    // 제목 string
                    boardContent: res.data.boardContent,
                    // 내용 String
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    // 역구조화로 key값을 변수로 사용
    const { boardTitle, boardContent } = boardBody;

    const [boardFile, setBoardFile] = useState(null);


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
        const subUrl = boardType === 1 ? 'study/notice' : 'study/board';

        // 게시판 파일 첨부 -> 있을때만 첨부
        if (boardType === 2) {
            const formData = new FormData();

            formData.append('file', boardFile)
            formData.append('studyBoardModifyDto', new Blob([JSON.stringify(boardBody)], {
                type: "application/json"
            }))

            console.log(boardBody);

            apiClient.put(subUrl, formData, config)
                .then((res) => {
                    console.log(res)
                    handleCancleBtnClick()
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            console.log("스터디 공지 수정")
            console.log(user.memberId);
            console.log(boardBody)
            apiClient.put(subUrl, boardBody)
                .then((res) => {
                    console.log(res)
                    handleCancleBtnClick()
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    // 이미지 업로드
    const handleBoardFileUpload = (e) => {
        const file = e.target.files[0];
        // setBoardFile(() => { return file })
        setBoardFile(file)

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
            {boardType === 2 ? <h3>스터디 게시판 수정</h3> : <h3>공지사항 수정</h3>}
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
                            <input type="file" name="studyBoardFile" onChange={handleBoardFileUpload} />
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

export default StudyBoardModify