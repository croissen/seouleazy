import styled from "styled-components";

export const Section = styled.section`
  min-height: 100vh;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0 4%;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

export const SubTitle = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 16px;
`;

// 데스크탑과 모바일 공용 슬라이드
export const PlacesWrapper = styled.div`
  display: flex;               // grid 대신 flex
  gap: 20px;
  overflow-x: auto;            // 좌우 스크롤 가능
  scroll-behavior: smooth;     // 부드럽게 스크롤
  -webkit-overflow-scrolling: touch; // 모바일 부드럽게
  padding-bottom: 10px;
`;

export const PlaceCard = styled.div`
  flex: 0 0 calc(33.3333% - 13.3333px); // 데스크탑 한 줄에 3개 (gap 포함 계산)
  background: #f7f7f9;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);

  @media (max-width: 768px) {
    flex: 0 0 80%;  // 모바일은 그대로
  }
`;

export const PlaceImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 10px;
`;

export const PlaceTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 8px 0 4px;
`;

export const PlaceDesc = styled.p`
  font-size: 0.9rem;
  color: #555;

  @media (min-width: 769px) {
    display: block;
  }
`;

export const ReadMore = styled.button`
  font-size: 0.8rem;
  background: none;
  border: none;
  color: #ff5722;
  cursor: pointer;
`;

export const SliderInner = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
`;

export const ArrowLeft = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  cursor: pointer;
`;

export const ArrowRight = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  cursor: pointer;
`;