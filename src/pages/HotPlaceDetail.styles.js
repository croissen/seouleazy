// src/pages/HotPlaceDetail.styles.js

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
  width: 100%;
  max-width: 1000px;
  height: 500px;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    height: 250px;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    height: 200px;
    margin-bottom: 20px;
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

export const Desc = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 25px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-top: 35px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-top: 25px;
    margin-bottom: 10px;
  }
`;

export const TipsSection = styled.div`
  background-color: #f9f9f9;
  border-left: 5px solid #ffa07a;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);

  p {
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 25px;
  }
`;

export const HighlightsList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 40px;

  li {
    font-size: 1rem;
    color: #444;
    line-height: 1.8;
    margin-bottom: 8px;
    position: relative;
    padding-left: 25px;

    &:before {
      content: '✨';
      position: absolute;
      left: 0;
      color: #ffd700;
      font-size: 0.9rem;
      line-height: 1.8;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
    li {
      font-size: 0.95rem;
      margin-bottom: 6px;
    }
  }
`;

export const Content = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  white-space: pre-line;
  flex-grow: 1;

  h2, h3, h4 {
    margin-top: 30px;
    margin-bottom: 15px;
    color: #222;
  }
  p {
    margin-bottom: 15px;
  }
`;

export const SubwayInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
`;

export const SubwayLineCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.color || '#ccc'};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 700;
  margin-right: 8px;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
    margin-right: 6px;
  }
`;

export const StationName = styled.p`
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
  margin: 0;
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SubwayInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 35px;
  margin-bottom: 15px;
  flex-wrap: wrap;

  font-size: 1.5rem;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-top: 25px;
    margin-bottom: 10px;
  }
`;

// 이미지 슬라이더를 위한 외부 래퍼
export const ResponsiveSliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px; /* 이미지 슬라이더 자체의 최대 너비와 동일하게 */
  margin: 0 auto 30px; /* 가운데 정렬 및 하단 여백 */
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

// 실제 이미지가 담기고 넘어가는 컨테이너 (overflow: hidden 유지)
export const ImageSliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden; /* 슬라이더 이미지 전환 시 필수 */
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 250px;
  }
  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  opacity: ${props => (props.$active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

export const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.3s;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  &.left {
    left: 10px; /* 모바일 기본: 이미지 안쪽에 위치 */
    
    @media (min-width: 1024px) { /* PC 버전: 이미지 밖으로 빼기 */
      left: -60px; /* 적절한 값으로 조절해서 밖으로 나오게 */
    }
  }

  &.right {
    right: 10px; /* 모바일 기본: 이미지 안쪽에 위치 */

    @media (min-width: 1024px) { /* PC 버전: 이미지 밖으로 빼기 */
      right: -60px; /* 적절한 값으로 조절해서 밖으로 나오게 */
    }
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 1.2rem;
  }
`;