import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;       
  display: flex;
  flex-direction: column;
  padding: 5% 10% 40px;
  max-width: 1200px; /* 전체 컨테이너 최대 너비 추가 */
  margin: 0 auto; /* 중앙 정렬 */

  @media (max-width: 768px) { /* 태블릿 */
    padding: 10% 5% 30px;
  }
  @media (max-width: 480px) { /* 모바일 */
    padding: 15% 4% 20px;
  }
`;

export const BackButtonWrapper = styled.div`
  position: relative;    // Container 안에서 상대 위치

  @media (max-width: 748px) {
    margin-top: 5%;      // 헤더 아래로 좀 더 여유 공간
  }
`;

export const BackButton = styled.button`
  background: none;       // 배경 없앰
  border: none;           // 테두리 없앰
  padding: 0;             // 패딩 제거
  font-size: 15px;
  color: #0077ff;         // 원하는 텍스트 색상
  cursor: pointer;
  text-decoration: none;  // 원하면 밑줄 추가
  &:hover {
    color: #005fcc;       // 호버 시 색상 변경
  }

`;

export const ContentWrapper = styled.div`
  flex: 1;                 
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

export const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 1.2rem;
  color: #555;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 1000px;
  height: 500px;           // 고정 높이
  object-fit: cover;       // 비율 유지하며 잘림
  object-position: center; // 중앙 기준으로 잘림
  border-radius: 12px;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    height: 250px;         // 모바일에서는 조금 작게
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    height: 200px;         // 모바일 화면에서는 더 작게
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #222; /* 제목 색상도 좀 더 진하게 */

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

export const Desc = styled.p`
  font-size: 1.1rem; /* 설명도 조금 더 크게 */
  color: #555; /* 설명 색상을 더 부드럽게 */
  margin-bottom: 25px; /* 설명과 내용 사이 여백 추가 */
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

export const Content = styled.div`
  font-size: 1rem; /* 내용 폰트 크기도 조금 키웠어! */
  color: #333; /* 내용 색상을 좀 더 진하게 */
  line-height: 1.8; /* 줄 간격도 좀 더 여유 있게! */
  white-space: pre-line; 
  flex-grow: 1;           

  h2, h3, h4 { /* 혹시 내용에 제목이 있다면 스타일 적용 */
    margin-top: 30px;
    margin-bottom: 15px;
    color: #222;
  }
  p {
    margin-bottom: 15px;
  }
`;