import React from 'react'
import style from './NoticeListItem.module.css'
const NoticeListItem = ({ boardItemInfo }) => {
    const { boardTitle, createdDate } = boardItemInfo

    return (
        <>
            <div className={style.NoticeListItem_box}>{boardTitle}
             <p className={style.NoticeListItem_day}
              style={{ justifyContent: 'flex-end' }}
             >작성일 - {createdDate}</p>
             </div>
        </>

    )
}

export default NoticeListItem