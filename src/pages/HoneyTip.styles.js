// HoneyTip.styles.jsx
import styled from 'styled-components';

// 전체 페이지 컨테이너
// 전체 페이지 컨테이너
export const Container = styled.div`
  width: 100%;
  max-width: 1200px; // PC에서도 충분히 넓게
  min-height: 100vh;
  margin: 0 auto;
  padding: 9% 2%; // 양쪽 여백만
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #0f172a;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
    "Segoe UI Emoji";
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 15% 4%;
  }
`;

// 페이지 제목
export const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 800;
  text-align: start;
`;

// 페이지 설명
export const Description = styled.p`
  font-size: 15px;
  color: #555;
  margin-bottom: 50px;
  line-height: 1.6;
  text-align: start;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

// 꿀팁 그리드 컨테이너
export const TipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // PC 3열
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); // 태블릿 2열
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; // 모바일 1열
    gap: 15px;
  }
`;

// 각 꿀팁 카드
export const TipCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

// 꿀팁 아이콘
export const TipIcon = styled.div`
  font-size: 3.5em;
  margin-bottom: 15px;
  line-height: 1;

  @media (max-width: 480px) {
    font-size: 3em;
  }
`;

// 꿀팁 제목
export const TipTitle = styled.h3`
  font-size: 1.6em;
  color: #34495e;
  margin-bottom: 15px;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 1.4em;
  }
`;

// 꿀팁 내용
export const TipContent = styled.p`
  font-size: 1.05em;
  color: #666;
  line-height: 1.7;
  word-break: keep-all;

  @media (max-width: 480px) {
    font-size: 0.95em;
    line-height: 1.6;
  }
`;
