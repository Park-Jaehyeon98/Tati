import React from 'react'
import VideoRoomComponent from './VideoRoomComponent';
import { useLocation } from 'react-router-dom';

const VideoEnter = () => {
    const location = useLocation()
    console.log(location.state)
    const { studyId, memberId, studyName } = location.state
    return (
        <div className='classname'>
            <VideoRoomComponent studyId={studyId} user={memberId} sessionName={studyName} />
        </div>
    )
}

export default VideoEnter