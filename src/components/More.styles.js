// More.styles.js
import styled from "styled-components";

export const Section = styled.section`
  min-height: 100vh;
  padding: 5% 10%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서는 세로 정렬 */
    align-items: center;
  }
`;

export const ContentBlock = styled.div`
  flex: 1;
  text-align: center;
  border-radius: 12px;
  padding: 100px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  background: ${(p) =>
    p.bgImg
      ? `url(${p.bgImg}) center/cover no-repeat`
      : "#f9f9f9"};
  color: ${(p) => (p.bgImg ? "white" : "inherit")};

  /* 사이즈 고정 */
  max-width: 420px;   /* PC에서 블록이 너무 넓어지지 않도록 제한 */
  min-width: 320px;   /* 최소 너비 확보 */

  /* 모바일 대응 */
  @media (max-width: 768px) {
    width: 100%;      /* 세로 정렬일 때는 꽉 채우기 */
    max-width: none;  /* 제한 해제 */
    min-width: auto;
  }

  /* 어두운 오버레이 */
  &::before {
    content: "";
    display: ${(p) => (p.bgImg ? "block" : "none")};
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 12px;
    z-index: 0;
  }

  h2, p, a {
    position: relative;
    z-index: 1;
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    color: ${(p) => (p.bgImg ? "#f1f1f1" : "#555")};
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background-color: #005fcc;
  }
`;
