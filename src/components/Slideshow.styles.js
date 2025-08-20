// Slideshow.styles.js
import styled from "styled-components";

export const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Panorama = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(p) => (p.isActive ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export const SlideTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 4px 20px rgba(0,0,0,0.7); // 그림자 강화
  @media (max-width: 480px) {
    font-size: 2.2rem; // 모바일 대응
  }
`;

export const SlideSubtitle = styled.h2`
  font-size: 1.25rem;
  margin-top: 12px;
  opacity: 0.95; // 약간 더 선명하게
  text-shadow: 0 2px 12px rgba(0,0,0,0.6); // 그림자 추가
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 40%;  
  width: 100%;
  text-align: center;
  color: white;
  text-shadow: 0 4px 12px rgba(0,0,0,0.6);
  /* 선택 사항: 글씨 뒤에 반투명 배경 추가 */
  /* background: rgba(0,0,0,0.2); */
  /* padding: 10px 0; */
`;

export const ScrollDown = styled.div`
    color: white;
    position: absolute;
    bottom: 50px;       // 항상 화면 하단에서 10px 위
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    opacity: 0.8;
    animation: bounce 1.5s infinite;

    @keyframes bounce {
        0%, 100% { transform: translate(-50%, 0); }
        50% { transform: translate(-50%, 8px); }
    }

    // 모바일 반응형
    @media (max-width: 768px) {
        bottom: 15%; 
    }

    @media (max-width: 480px) {
        bottom: 15%; 
    }
`;