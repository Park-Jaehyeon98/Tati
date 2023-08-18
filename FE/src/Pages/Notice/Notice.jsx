import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './Notice.module.css'


const Notice = () => {
    return (
        <div className={style.container}>
            <div></div>
            <Outlet />
            <div></div>
        </div>
    )
}

export default Notice