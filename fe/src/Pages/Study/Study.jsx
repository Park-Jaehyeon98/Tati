import React from 'react'
import { Outlet } from 'react-router-dom';
import style from './Study.module.css';

const Study = () => {
    return (
        <div className={style.container}>
            <Outlet />
        </div>
    )
}

export default Study