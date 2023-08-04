import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';
import FaqListItem from '../../Components/Faq/FaqListItem';

const FaqList = () => {
    // 여기서 요청 보낸 후 컴포넌트로 뿌려야함. Detail, Modify 둘다
    const [boardList, setBoardList] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const subURL = 'faq'
    const config = { params: { pageNum: pageNum } }

    apiClient.get(subURL, config)
        .then((res) => {
            console.log(res)
            setBoardList(res.data)
        })
        .catch((err) => {
            console.log(err)
        });

    return (
        <div>
            <h3>자주하는 질문</h3>
            {/* 여기에는 faq 리스트 아코디언으로 구현 */}
            <div>
                {boardList.map((boardItemInfo) => {
                    <FaqListItem boardItemInfo={boardItemInfo} />
                })}
            </div>
            {/* 페이지네이션 */}
            <div>
                페이지네이션이 들어갑니다
            </div>
        </div>

    )
}

export default FaqList