import React from 'react'

const NoticeListItem = ({ boardItemInfo }) => {
    const { boardTitle, createdDate } = boardItemInfo

    return (
        <>
            <div>{boardTitle} 작성일{createdDate}</div>
        </>

    )
}

export default NoticeListItem