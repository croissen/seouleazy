import styled from "styled-components";

export const Section = styled.section`
  min-height: 100vh;
  padding: 10% 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 20% 4%;
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

export const PlacesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PlaceCard = styled.div`
  background: #f7f7f9;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  cursor: pointer;
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
`;

