import React from 'react';

function cardItem({ name, currentMemberCnt, totalMemberCnt, isPrivate, imageUrl }) {
    return (
        <div>
            {name}
            {currentMemberCnt} / {totalMemberCnt}
            {isPrivate}
            {imageUrl}
        </div>
    );
}

export default cardItem;