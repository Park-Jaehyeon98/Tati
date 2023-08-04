import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/apiClient';
import FaqListItem from '../../Components/Faq/FaqListItem';

const FaqList = () => {
    // 여기서 요청 보낸 후 컴포넌트로 뿌려야함. Detail, Modify 둘다
    const [boardList, setBoardList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const subURL = 'faq'
    const config = { params: { pageNum: pageNum } }

    useEffect(() => {
        apiClient.get(subURL, config)
            .then((res) => {
                // console.log(res)
                setBoardList(res.data.content)
                setTotalPages(res.data.sort.totaPages)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])


    return (
        <div>
            <h3>자주하는 질문</h3>
            {/* 여기에는 faq 리스트 아코디언으로 구현 */}
            <div>
                {boardList.length === 0 ? <></> :
                    boardList.map((boardItemInfo, index) =>
                        <div key={index}>
                            <hr />
                            <FaqListItem boardItemInfo={boardItemInfo} />
                            <div>수정버튼</div>
                            <div>삭제버튼</div>
                            <hr />
                        </div>)}
            </div>
            {/* 페이지네이션 */}
            <div>
                페이지네이션이 들어갑니다
            </div>
        </div>

    )
}

export default FaqList