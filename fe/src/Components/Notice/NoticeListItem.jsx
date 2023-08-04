import React from 'react'

const NoticeListItem = ({ boardItemInfo }) => {
    const { boardTitle, createdDate } = boardItemInfo

    return (
        <>
            <div>{boardItemInfo.boardTitle}</div>
            <div>{createdDate}</div>
        </>

    )
}

export default NoticeListItem