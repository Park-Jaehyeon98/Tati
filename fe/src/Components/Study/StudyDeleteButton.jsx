import axios from 'axios'
import React from 'react'
import { apiClient } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

const StudyDeleteButton = ({ studyId }) => {
    const navigate = useNavigate();
    const memberId = 1;


    const handleDeleteBtnClick = () => {
        navigate('/Study')
        apiClient.delete(`study/${studyId}/delete/${memberId}`)
            .then((res) => {
                console.log(res.data)
                navigate('/Study')
            })
            .catch((err) => { console.log(err.data) })
    }

    return (
        <button onClick={handleDeleteBtnClick}>스터디삭제버튼</button>
    )
}

export default StudyDeleteButton