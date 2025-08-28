import styled from "styled-components";

export const Section = styled.section`
  min-height: 100vh;
  padding: 10% 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  background-color:rgb(233, 231, 230);

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const TopContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 100px;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    max-width: 90%;
    padding: 20% 0 0 0;
    box-sizing: border-box;
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

  width: 100%;
  max-width: 100%;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
    box-sizing: border-box;
  }

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

export const AboutMeSection = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  line-height: 1.8;

  @media (max-width: 768px) {
    padding: 30px 10% ;
    max-width: 90%;
    box-sizing: border-box;
    margin-bottom: 10%;
  }
`;

export const AboutMeText = styled.p`
  font-size: 1.05rem;
  color: #333333;
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

export const DonationButton = styled(Button)`
  margin-top: 20px;
  padding: 14px 30px;
  font-size: 1.1rem;
  background-color: #FF5A5F;
  &:hover {
    background-color: #E04B50;
  }
`;

export const GoogleFormNote = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin-top: 15px;
    line-height: 1.5;
`;

export const GoogleFormLink = styled.a`
    color: #0077ff;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

export const ClosingRemark = styled.p`
    font-size: 1rem;
    color: #444;
    margin-top: 30px;
    font-weight: bold;
`;

export const SectionTitle = styled.h2`
  font-size: 2.2rem;
  color: #222;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
`;