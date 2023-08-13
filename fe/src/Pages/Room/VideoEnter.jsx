import React from 'react'
import VideoRoomComponent from './VideoRoomComponent';
import { useLocation } from 'react-router-dom';

const VideoEnter = () => {
    const { studyId, memberId } = useLocation()
    return (
        <div>
            <VideoRoomComponent />
        </div>
    )
}

export default VideoEnter