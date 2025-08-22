import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 80px auto 40px; /* 헤더 때문에 top margin 넉넉히 */
  padding: 0 20px;
`;

export const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 1.2rem;
  color: #555;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Image = styled.img`
  width: 100%;       /* 가로 꽉 채우기 */
  height: auto;      /* 원본 비율 유지 */
  max-height: 500px; /* 최대 높이 제한 */
  object-fit: contain; /* 확대 없이 비율 유지 */
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e53935; /* 가격 강조 색상 */
  margin-bottom: 16px;
`;

export const Desc = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 16px;
`;

export const Content = styled.div`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
  white-space: pre-line; /* 줄바꿈 유지 */
`;
