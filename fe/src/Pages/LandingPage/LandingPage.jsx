import React, { useState } from 'react';
import MyStudyList from './MyStudyList';
import TodaySchedule from './TodaySchedule';
import LatestStudyList from './LatestStudyList';

function LandingPage(props) {

    const [myStudy, setMyStudy] = useState();
    const [mySchedule, setMySchedule] = useState();
    // axios.get('url',) axios 요청을 통해 내가 가입한 스터디 리스트를 받아와야함.
    // 내 오늘 일정도 받아와야함



    const [studyList, setStudyList] = useState();
    // 스터디 목록 출력시 사용


    return (
        <>
            <div className="box1" >
                <div className='box1content'>
                    <MyStudyList />
                </div>
                <div className='box1content'>
                    <TodaySchedule />
                </div>
            </div>

            <div className="box2">
                <LatestStudyList />
            </div>

        </>
    );
}

export default LandingPage;