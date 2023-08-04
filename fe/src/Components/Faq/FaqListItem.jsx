import React, { useState } from 'react'
import { apiClient } from '../../api/apiClient';

const FaqListItem = ({ boardItemInfo }) => {
    const { boardTitle, boardContent } = boardItemInfo


    return (
        <div>
            <div>
                Q : {boardTitle}
            </div>
            <div>
                A : {boardContent}
            </div>
        </div>
    )
}

export default FaqListItem