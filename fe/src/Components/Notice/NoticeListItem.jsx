import React from 'react'

const NoticeListItem = ({ boardItemInfo }) => {
    const { boardTitle, createdDate } = boardItemInfo

    return (
        <>
            <hr />
            <div>{boardTitle}    {createdDate}</div>
            <hr />
        </>

    )
}

export default NoticeListItem