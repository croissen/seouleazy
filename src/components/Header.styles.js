import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  box-sizing: border-box;

  background-color: ${({ scrolled }) =>
    scrolled ? "rgba(34, 34, 34, 0.9)" : "transparent"};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(5px)" : "none")};
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
`;

export const Logo = styled.a`
  color: white;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 40px;
  flex-shrink: 0;

  &.desktop {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: #f39c12;
  }
`;

export const Contact = styled.div`
  font-size: 16px;
  cursor: pointer;
  color: white;

  &.desktop {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: rgba(34, 34, 34, 0.95);
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
  z-index: 1001;

  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-20px)")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;

  a {
    font-size: 16px;
  }
`;
