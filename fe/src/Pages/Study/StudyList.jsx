import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import styles from './StudyList.module.css';
import StudyCardList from "../../Components/Study/StudyCardList";

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
        axios({
            method: 'get',
            url: `http://59.27.11.90:8080/study`,
            header: {},
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


    // 페이지 렌더링 될 때 처음 리스트를 받아오기 위해
    // useEffect(() => {
    //     axios.get(`http://59.27.11.90:8080/study`, {
    //         params: {
    //             page: pageNum,
    //             category: listCategory,
    //             keyword: keyword
    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setStudyList(response.data);
    //         })
    // }, [pageNum, listCategory, keyword]);

    // 하드코딩용
    // useEffect(() => {
    //     setStudyList([{ studyId: 0, studyName: "하하", totalMember: 8, disclosure: true, currentMember: 5, imageUrl: "" }, { studyId: 1, studyName: "하하", totalMember: 8, disclosure: true, currentMember: 5, imageUrl: "" }])
    // }, [])

    return (
        <div>
            <h3>스터디 목록</h3>
            <p><button onClick={() => { navigate('/StudyCreate') }}>스터디 만들기</button></p>
            <p>
                {categoryArray.map((category) =>
                    <button key={category} className={category === listCategory ? styles.selected : styles.noSelected} onClick={() => handleCategoryClick(category)}>{category}</button>
                )}
            </p>
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
                // axios.get(`http://59.27.11.90:8080/study`, {
                //     params: {
                //         page: pageNum,
                //         category: listCategory,
                //         keyword: keyword
                //     }
                // })
                //     .then(response => {
                //         console.log(response.data);
                //         setStudyList(response.data);
                //     })
            }}>테스트용</button>
            {/* 페이지 1개당 8개 스터디 렌더링할것 */}
            <StudyCardList studyList={studyList} />
            {/* 페이지네이션 부분 */}

        </div>
    )
}

export default StudyList