import React, { useState } from 'react'
import VideoRoomComponent from './VideoRoomComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './VideoEnter.module.css';

const VideoEnter = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { studyId, memberId, studyName, memberNickName } = location.state
    const [onVideo, setOnVideo] = useState(false);

    return (
        <div className={style.container}>
            <h3>
                <span className={style.titleHighlight}>{studyName}</span>의 캠스터디
            </h3>
            <div className={style.buttons}>
                <button onClick={() => { setOnVideo(true) }}>입실하기</button>
                <button onClick={() => { navigate(`/study/${studyId}`) }}>스터디로 돌아가기</button>
            </div>
            {onVideo
                &&
                <VideoRoomComponent
                    // setOffVideo={setOnVideo(() => { return false })}
                    studyId={studyId}
                    studyName={studyName}
                    memberId={memberId}
                    memberName={memberNickName}
                />}
        </div>
    )
}

export default VideoEnter