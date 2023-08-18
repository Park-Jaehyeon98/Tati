import React from 'react'
import style from './Tooltip.module.css'


const Tooltip = ({ children, message }) => {
    return (
        <div className={style.container}>
            {children}
            <div className={`${style.content} ${style.tooltip}`}>{message}</div>
        </div>
    );
}

export default Tooltip