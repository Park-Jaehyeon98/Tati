import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './Faq.module.css'

const Faq = () => {
    // div 크기만 정하기
    return (
        <div className={style.container}>
            <div></div>
            <Outlet />
            <div></div>
        </div>
    )
}

export default Faq