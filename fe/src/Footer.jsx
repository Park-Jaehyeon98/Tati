import React from 'react'
import style from './Footer.module.css'

const Footer = () => {
    return (
        <div className={style.Footer}>
            <p className={style.App_Footer_name}>타티</p>
            <div className={style.App_Footer_text}>
                <p className={style.App_Footer_name_text}>이용약관</p>
                <p className={style.App_Footer_name_text}>개인정보처리방침</p>
                <p className={style.App_Footer_name_text}>서비스소개</p>
            </div>
        </div>
    )
}

export default Footer