import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/apiClient";
import style from './StudyList.module.css';

import StudyCardItem from "../../Components/Common/StudyCardItem";


const StudyList = () => {
    const navigate = useNavigate();

    // 스터디 리스트
    const [studyList, setStudyList] = useState([]);
    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const firstPage = currentPage - (currentPage % 5) + 1
    // 카테고리 선택
    const [categoryId, setCategoryId] = useState(null);
    const categoryIdArray = ["자격증", "취업", "학교", "공시", "기타"];
    // 검색 키워드
    const [keywordInput, setKeywordInput] = useState('');
    const [keyword, setKeyword] = useState(null);


    // 처음 조회 (전체 조회
    useEffect(() => {
        console.log("전체")
        apiClient.get('study')
            .then((res) => {
                console.log(res)
                setStudyList(res.data)
                setTotalPages(res.data.sort.totalPages)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    // 카테고리변경시
    const handleCategoryIdClick = (value) => {
        (value === categoryId - 1 ? setCategoryId(null) : setCategoryId(value + 1))
    }
    // 검색창입력 변경, 검색창 입력
    const handleKeywordInputChagne = (e) => {
        console.log()
        setKeywordInput(e.target.value);
    }
    const handleSearchBtnClick = () => {
        (keywordInput ? setKeyword(keywordInput) : setKeyword(null))
    }
    // 키워드 조회
    useEffect(() => {
        if (keyword || categoryId) {
            console.log("키워드")
            apiClient.get('study', {
                params: {
                    page: currentPage,
                    category: categoryId,
                    keyword: (keyword ? keyword : null)
                }
            })
                .then((res) => {
                    console.log(res);
                    // studyList에 res.data 값 할당
                    setStudyList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [currentPage, categoryId, keyword])


    // 하드코딩용
    // useEffect(() => {
    //     setStudyList([{ studyId: 0, studyName: "하하", totalMember: 8, disclosure: true, currentMember: 5, imageUrl: "" }, { studyId: 1, studyName: "하하", totalMember: 8, disclosure: true, currentMember: 5, imageUrl: "" }])
    // }, [])

    return (
        <div>
            {/* 위에 바 */}
            <>
                <h3>스터디 목록</h3>
                <hr />
                <button onClick={() => { navigate('Create') }}>스터디 만들기</button>
                <div>
                    {categoryIdArray.map((categoryIdItem, index) =>
                        <button key={categoryIdItem} className={index === categoryId - 1 ? style.selected : style.noSelected} onClick={() => handleCategoryIdClick(index)}>{categoryIdItem}</button>
                    )}
                </div>
                <div>
                    <input type="text" name="keywordInput" value={keywordInput} onChange={handleKeywordInputChagne} placeholder="스터디이름으로 검색" />
                    <button onClick={handleSearchBtnClick}>검색</button>
                </div>

                <button onClick={() => {
                    console.log({
                        page: currentPage,
                        category: categoryId,
                        keyword: keyword
                    })
                }}>인풋값 콘솔 출력 테스트용</button>
            </>

            <hr />

            {/* 페이지 1개당 8개 스터디 렌더링할것 */}
            <div>
                {/* 스터디 카드 리스트 */}

                {studyList.map((studyDetail) => {
                    return <StudyCardItem studyDetail={studyDetail} />
                })}


                {/* 페이지네이션 부분 */}
                <button
                    key={'<'}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                {Array.from({ length: 5 }, (_, i) =>
                    currentPage % 5 === 0 ?
                        (firstPage - 5 + i) <= totalPages &&
                        <button
                            key={firstPage - 5 + i}
                            onClick={() => setCurrentPage(firstPage - 5 + i)}
                            disabled={firstPage - 5 + i === currentPage}
                        >
                            {firstPage - 5 + i}
                        </button>
                        :
                        (firstPage + i) <= totalPages && <button
                            key={firstPage + i}
                            onClick={() => setCurrentPage(firstPage + i)}
                            disabled={firstPage + i === currentPage}
                        >
                            {firstPage + i}
                        </button>)}
                <button
                    key={'>'}
                    onClick={() => {
                        setCurrentPage(currentPage + 1)
                    }}
                    disabled={currentPage === totalPages || !totalPages}
                >
                    {">"}
                </button>
            </div>
        </div>
    )
}

export default StudyList