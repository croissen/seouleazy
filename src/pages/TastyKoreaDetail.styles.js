import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;       
  display: flex;
  flex-direction: column;
  padding: 5% 10% 40px;
  max-width: 1200px; 
  margin: 0 auto; 

  @media (max-width: 768px) { 
    padding: 10% 5% 30px;
  }
  @media (max-width: 480px) { 
    padding: 15% 4% 20px;
  }
`;

export const BackButtonWrapper = styled.div`
  position: relative;

  @media (max-width: 748px) {
    margin-top: 5%; 
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 15px;
  color: #0077ff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #005fcc;
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
  width: 800px;           /* 항상 일정한 가로 */
  height: 500px;          /* 항상 일정한 세로 */
  object-fit: contain;    /* 원본 비율 유지, 남는 공간은 빈 공간 */
  object-position: center;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
  background-color: #ffffff; /* 남는 공간 흰색으로 채움 */

  @media (max-width: 768px) {
    width: 100%;           /* 모바일에서는 화면 가로에 맞춤 */
    max-width: 400px;      /* 최대 크기 제한 */
    height: 250px;         /* 모바일에서 고정 높이 */
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #222; 

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

export const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e53935;
  margin-bottom: -5px;
`;

export const Desc = styled.p`
  font-size: 1.1rem;
  color: #555; 
  line-height: 1.5;
`;

export const Content = styled.div`
  font-size: 1rem;
  color: #333; 
  white-space: pre-line; 
`;
