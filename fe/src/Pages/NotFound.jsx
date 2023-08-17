import React from 'react'
import style from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={style.container}>
            <h1>404 NotFound</h1>
            <br />
            <div>요청한 주소가 없습니다. 주소를 확인해주세요.</div>
        </div>
    )
}

export default NotFound