// Contact.styles.jsx
import styled from 'styled-components'; // styled-components 불러오기

// 전체 페이지 컨테이너
export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  padding: 5% 20px;
  background-color: #fcfcfc;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    margin: 20px auto;
    padding: 25% 0;
  }
`;

// 버튼들을 담을 컨테이너
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 20px;
  flex-wrap: wrap; /* 모바일에서는 버튼이 줄바꿈되도록 */

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

// 개별 버튼
export const Button = styled.button`
  background-color: ${({ active }) => (active ? '#87CEEB' : '#e0f7fa')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.05em;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) => (active ? '0 4px 15px rgba(0, 123, 255, 0.2)' : 'none')};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.95em;
    padding: 10px 18px;
  }
`;

// 내용이 표시될 섹션
export const ContentSection = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  line-height: 1.8;

  @media (max-width: 480px) {
    padding: 20px;
    font-size: 0.95em;
  }
`;

// 섹션 제목
export const SectionTitle = styled.h3`
  font-size: 1.8em;
  color: #3f51b5;
  margin-bottom: 25px;
  font-weight: 800;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.4em;
    margin-bottom: 18px;
  }
`;

// 일반 텍스트
export const SectionText = styled.p`
  font-size: 1.1em;
  color: #555;
  margin-bottom: 20px;

  ${({ small }) =>
    small &&
    `
    font-size: 0.9em;
    color: #777;
    margin-top: 25px;
  `}

  @media (max-width: 480px) {
    font-size: ${({ small }) => (small ? "0.85em" : "1em")};
  }
`;

// 이메일 링크
export const EmailLink = styled.a`
  font-size: 1.2em;
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

// 후원 정보
export const DonationInfo = styled.div`
  background-color: #f8f8f8;
  border: 1px dashed #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
  font-size: 1.05em;
  color: #666;

  & p {
    margin: 8px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
    padding: 15px;
  }
`;

// 강조 텍스트
export const HighlightText = styled.span`
  color: #DDA0DD;
  font-weight: bold;
`;
