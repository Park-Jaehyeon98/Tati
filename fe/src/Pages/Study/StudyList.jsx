import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import style from './StudyList.module.css';
import StudyCardList from "../../Components/Study/StudyCardList";
import { apiClient } from "../../api/apiClient";

const StudyList = () => {
    const navigate = useNavigate();
    const [studyList, setStudyList] = useState([]);


    // 페이지네이션
    const [pageNum, setPageNum] = useState(1);


    // 카테고리 선택
    const [listCategory, setListCategory] = useState("자격증");
    const handleCategoryClick = (value) => {
        setListCategory(value)
    }
    const categoryArray = ["자격증", "취업", "학교", "공시", "기타"];

    // 검색 키워드
    const [keyword, setKeyword] = useState('');
    const handleKeywordChagne = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearchBtnClick = () => {

        apiClient.get('study', {
            params: {
                page: pageNum,
                category: listCategory,
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

    // 전체조회
    useEffect(() => {
        apiClient.get('study')
            .then((res) => {
                console.log(res)
                setStudyList(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    // 키워드, 카테고리, 페이지
    // if ()
    //     useEffect(() => {
    //         apiClient.get('study/search', {
    //             params: {
    //                 page: pageNum,
    //                 category: listCategory,
    //                 keyword: keyword
    //             }
    //         })
    //             .then(response => {
    //                 console.log(response.data);
    //                 setStudyList(response.data);
    //             })
    //     }, [pageNum, listCategory, keyword]);

    // 하드코딩용
    // useEffect(() => {
    //     setStudyList([{ studyId: 0, studyName: "하하", totalMember: 8, disclosure: true, currentMember: 5, imageUrl: "" }, { studyId: 1, studyName: "하하", totalMember: 8, disclosure: true, currentMember: 5, imageUrl: "" }])
    // }, [])

    return (
        <div>
            {/* 위에 바 */}
            <div>
                <h3>스터디 목록</h3>
                <hr />
                <button onClick={() => { navigate('Create') }}>스터디 만들기</button>
                <div>
                    {categoryArray.map((category) =>
                        <button key={category} className={category === listCategory ? style.selected : style.noSelected} onClick={() => handleCategoryClick(category)}>{category}</button>
                    )}
                </div>
                <div>
                    <input type="text" name="keyword" value={keyword} onChange={handleKeywordChagne} placeholder="스터디이름으로 검색" />
                    <button onClick={handleSearchBtnClick}>검색</button>
                </div>
                <button onClick={() => {
                    console.log({
                        page: pageNum,
                        category: listCategory,
                        keyword: (keyword ? keyword : null)
                    })
                }}>테스트용</button>
            </div>

            <hr />

            {/* 페이지 1개당 8개 스터디 렌더링할것 */}
            <div style={{ height: 500, backgroundColor: "white" }}>
                {/* 스터디 카드 리스트 */}
                <StudyCardList studyList={studyList} />
                {/* 페이지네이션 부분 */}
            </div>
        </div >
    )
}

export default StudyList