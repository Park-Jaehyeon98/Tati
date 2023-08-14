import React from 'react';
import {Background, LoadingText} from './Styles';
import Spinner from './spinner.gif';

export default function Loading(){
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </Background>
  );
};