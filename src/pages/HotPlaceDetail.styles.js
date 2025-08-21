import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 80px auto 40px; // 헤더 때문에 top margin 넉넉히
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
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
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
  white-space: pre-line; // 줄바꿈 유지
`;
