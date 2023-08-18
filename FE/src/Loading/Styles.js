import styled from 'styled-components';

export const Background = styled.div`
  position: fixed; /* 변경된 부분 */  
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: ${props => (props.isLoading ? "auto" : "none")}; 
  overflow: hidden; /* 스크롤 막기 */
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;