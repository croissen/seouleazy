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

export const PlacesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    overflow: hidden;
    position: relative;
  }
`;

export const FoodCard = styled.div`
  background: #f7f7f9;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    flex: 0 0 80%;
    display: ${(p) => (p.isActive ? "block" : "none")};
  }
`;

export const FoodImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 10px;
`;

export const FoodName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 8px 0 4px 0;
`;

export const FoodPrice = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

export const ReadMore = styled.button`
  font-size: 0.8rem;
  background: none;
  border: none;
  color: #ff5722;
  cursor: pointer;
`;

export const ArrowLeft = styled.button`
  display: none;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  border: none;
  border-radius: 50%;
  color: white;
  padding: 8px;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const ArrowRight = styled.button`
  display: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  border: none;
  border-radius: 50%;
  color: white;
  padding: 8px;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    display: block;
  }
`;
