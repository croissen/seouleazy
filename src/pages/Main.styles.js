import styled from "styled-components";

/* 전체 컨테이너 */
export const Container = styled.div`
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-y: auto;
  
`;

/* 공통 섹션 */
export const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

/* Top & 공유 버튼 */
export const TopButton = styled.button`
  position: fixed;
  right: 20px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #111;
  color: #fff;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s, transform 0.2s;
  z-index: 50;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    right: 14px;
    bottom: ${(p) => p.bottom || "20px"};
    font-size: 0.9rem;
  }
`;
