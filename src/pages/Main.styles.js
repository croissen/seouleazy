import styled, { keyframes } from 'styled-components';

// 줌 인 → 줌 아웃 애니메이션
const zoomInOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const Panorama = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${zoomInOut} 10s ease-in-out infinite;
  opacity: ${props => (props.isActive ? 1 : 0)};
  transition: opacity 2s ease-in-out;
  z-index: ${props => (props.isActive ? 1 : 0)};
`;

export const Overlay = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  text-align: center;
  color: white;
  text-shadow: 0 4px 10px rgba(0,0,0,0.7); /* 그림자 강화 */
`;

export const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem); /* 반응형 폰트 */
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
`;

export const Subtitle = styled.h2`
  font-size: clamp(1rem, 2.5vw, 2rem); /* 반응형 폰트 */
  margin-top: 1rem;
  font-weight: 400;
  line-height: 1.4;
`;