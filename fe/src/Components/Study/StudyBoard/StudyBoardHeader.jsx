import React from 'react'
import style from './StudyBoardHeader.module.css'
import { Link, redirect } from 'react-router-dom'

// 스터디 공지사항 게시판 위에 있는 헤더

const StudyBoardHeader = ({ boardType, studyId }) => {
    // boardType   0 : 공지 1: 스터디 공지 2: 스터디 게시판 9: FAQ

    return (
        <div>
            <div className={style.container}>
                {/* 스터디 대표이미지 들어감 */}
                <div className={style.content}>
                    스터디 이미지 들어갈 자리
                </div>

                {/* 스터디 이름, 게시판 타입, 게시판 타입 설명 */}
                <div className={style.content}>
                    <div>
                        스터디 이름
                    </div>
                    {boardType === 1 ?
                        <div>
                            {/* 스터디 공지 */}
                            <div>
                                공지사항
                            </div>
                            <div>
                                스터디 공지사항을 이곳에서 확인해보세요. <br />
                                중요 공지와 스터디 규칙을 대표로 설정하세요.
                            </div>
                        </div> :
                        <div>
                            {/* 스터디 게시판 */}
                            <div>
                                자유게시판
                            </div>
                            <div>
                                스터디원들끼리 소통하는 공간입니다.<br />
                                이곳에 작성된 글은 스터디 멤버만 확인할 수 있습니다.
                            </div>
                        </div>}

                </div>

                {/* 스터디 메인으로 가는 버튼 */}
                <div className={style.content}>

                    {boardType === 2 ?
                        <Link to={`/Study/${studyId}/Notice`}>
                            <div className={style.btn}>
                                <div>스터디 공지보러가기</div>
                            </div>
                        </Link> : <Link to={`/Study/${studyId}/Board`}>
                            <div className={style.btn}>
                                <div>스터디 게시판 보러가기</div>
                            </div>
                        </Link>}

                    <Link to='/'>
                        <div className={style.btn}>
                            <div>스터디 메인으로</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default StudyBoardHeader