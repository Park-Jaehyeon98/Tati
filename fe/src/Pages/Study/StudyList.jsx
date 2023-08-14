import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import style from './StudyList.module.css';

import StudyCardItem from "../../Components/Common/StudyCardItem";
import { Button } from '@material-ui/core';


const StudyList = () => {
    const navigate = useNavigate();

    // 스터디 리스트
    const [studyList, setStudyList] = useState([]);
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const zeroToOnePage = currentPage + 1
    const firstPage = zeroToOnePage - (zeroToOnePage % 5) + 1
    // 카테고리 선택
    const [categoryId, setCategoryId] = useState(0);
    const categoryIdArray = ["전체", "자격증", "취업", "학교", "공시", "기타"];
    // 검색 키워드
    const [keywordInput, setKeywordInput] = useState(null);
    const [keyword, setKeyword] = useState(null);


    // // 처음 조회 (전체 조회
    // useEffect(() => {
    //     console.log("전체")
    //     apiClient.get('study/list')
    //         .then((res) => {
    //             console.log(res)
    //             setStudyList(res.data.content)
    //             res.data.totalPages === 0 ?
    //                 setTotalPages(1)
    //                 : setTotalPages(res.data.totalPages);
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // }, [])

    // 카테고리변경시
    const handleCategoryIdClick = (value) => {
        setCurrentPage(0);
        setCategoryId(value);
    }

    // 검색창입력 변경, 검색창 입력
    const handleKeywordInputChagne = (e) => {
        setKeywordInput(e.target.value);
    }

    //검색 버튼 클릭
    const handleSearchBtnClick = () => {
        setCurrentPage(0);
        (keywordInput ? setKeyword(keywordInput) : setKeyword(null))
    }

    // 키워드 조회
    useEffect(() => {
        console.log("키워드")
        apiClient.get('study/search', {
            params: {
                page: currentPage,
                category: categoryId,
                keyword: (keyword ? keyword : null)
            }
        })
            .then((res) => {
                console.log(res);
                setStudyList(res.data.content);
                res.data.totalPages === 0 ?
                    setTotalPages(1)
                    : setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [currentPage, categoryId, keyword])


    return (
        <div>
            {/* 위에 바 */}
            <h2>스터디 목록 <Button onClick={() => { navigate('Create') }}>스터디 만들기</Button></h2>
            <hr />
            <div className={style.buttons}>
                {categoryIdArray.map((categoryIdItem, index) =>
                    <button key={categoryIdItem}
                        className={index === categoryId ? style.selected : style.noSelected}
                        onClick={() => handleCategoryIdClick(index)}>
                        {categoryIdItem}
                    </button>
                )}
            </div>
            <div className={style.inputField}>
                <input type="text" name="keywordInput" value={keywordInput} onChange={handleKeywordInputChagne} placeholder="스터디이름으로 검색" />
                <Button onClick={handleSearchBtnClick}>검색</Button>
            </div>

            {/* <Button onClick={() => {
                console.log({
                    page: currentPage,
                    category: categoryId,
                    keyword: keyword
                })
            }}>인풋값 콘솔 출력 테스트용</Button> */}
            <hr />

            {/* 페이지 1개당 8개 스터디 렌더링할것 */}
            <div>
                {/* 스터디 카드 리스트 */}
                <div className={style.study_container}>
                    {studyList.map((studyDetail) => {
                        return <StudyCardItem studyDetail={studyDetail} />
                    })}
                </div>


                {/* 페이지네이션 부분 */}
                <div className={style.pagenation}>
                    <Button
                        key={'<'}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        {"<"}
                    </Button>
                    {Array.from({ length: 5 }, (_, i) =>
                        zeroToOnePage % 5 === 0 ?
                            (firstPage - 5 + i) <= totalPages &&
                            <Button
                                key={firstPage - 5 + i}
                                onClick={() => setCurrentPage(firstPage - 5 + i - 1)}
                                disabled={firstPage - 5 + i === currentPage + 1}
                            >
                                {firstPage - 5 + i}
                            </Button>
                            :
                            (firstPage + i) <= totalPages && <Button
                                key={firstPage + i}
                                onClick={() => setCurrentPage(firstPage + i - 1)}
                                disabled={firstPage + i === currentPage + 1}
                            >
                                {firstPage + i}
                            </Button>)}
                    <Button
                        key={'>'}
                        onClick={() => {
                            setCurrentPage(currentPage + 1)
                        }}
                        disabled={currentPage === totalPages - 1 || !totalPages}
                    >
                        {">"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default StudyList