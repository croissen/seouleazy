import styled from "styled-components";

export const Section = styled.section`
  min-height: 100vh;
  padding: 7% 10%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20% 4%;
  }
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

export const NoResults = styled.div`
  grid-column: 1 / -1; /* 그리드 전체 너비 사용 */
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  padding: 50px 0;
`;
export const SearchInput = styled.input`
  width: 40%; /* 넓은 화면에서는 타이틀 옆에 오도록 너비 조정 */
  max-width: 350px; /* 너무 커지지 않도록 최대 너비 설정 */
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.2);
  }

  @media (max-width: 768px) { /* 모바일에서는 너비를 100%로 만들어서 아래로 내려오게 */
    width: 100%;
    max-width: none; /* 최대 너비 제한 해제 */
    padding: 10px 0%;
  }
`;
export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    flex-direction: column; /* 모바일에서는 세로로 */
    align-items: flex-start;
    gap: 10px; /* 제목과 검색창 사이 간격 */
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;