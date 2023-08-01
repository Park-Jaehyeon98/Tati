import axios from 'axios'
import React from 'react'

const StudyDeleteButton = ({ studyId }) => {
    const memberId = 1;

    const handleDeleteBtnClick = () => {
        axios({
            method: 'delete',
            url: `http://192.168.31.58:8080/study/${studyId}/delete/${memberId}`,
        })
            .then((res) => { console.log(res.data) })
            .catch((err) => { console.log(err.data) })
    }

    return (
        <button onClick={handleDeleteBtnClick}>스터디삭제버튼</button>
    )
}

export default StudyDeleteButton