import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import * as S from "./Header.styles";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); // 현재 경로 확인

  // 스크롤 시 배경, 드롭다운 닫기
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
      }
      setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("#mobile-hamburger")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const handleMenuItemClick = () => setMobileMenuOpen(false);

  return (
    <S.HeaderContainer scrolled={scrolled}>
      {/* 로고 */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <S.Logo>SeoulEZ</S.Logo>
      </Link>

      {/* 데스크탑 메뉴 */}
      <S.Nav className="desktop">
        <Link to="/hot-place" style={{ textDecoration: "none" }}>
          <S.NavItem>Hot-Place</S.NavItem>
        </Link>
        <Link to="/tasty-korea" style={{ textDecoration: "none" }}>
          <S.NavItem>Tasty-Korea</S.NavItem>
        </Link>
        <Link to="/trip-calc" style={{ textDecoration: "none" }}>
          <S.NavItem>Trip-Calc</S.NavItem>
        </Link>
        <Link to="/honey-tip" style={{ textDecoration: "none" }}>
          <S.NavItem>Honey-Tip</S.NavItem>
        </Link>
      </S.Nav>

      <S.Contact className="desktop">Contact</S.Contact>

      {/* 모바일 햄버거 버튼 */}
      <S.MobileMenuButton id="mobile-hamburger" onClick={toggleMobileMenu}>
        &#x2630;
      </S.MobileMenuButton>

      {/* 모바일 드롭다운 */}
      <S.MobileDropdown ref={dropdownRef} isOpen={mobileMenuOpen}>
        <Link to="/hot-place" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Hot-Place</S.NavItem>
        </Link>
        <Link to="/tasty-korea" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Tasty-Korea</S.NavItem>
        </Link>
        <Link to="/trip-calc" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Trip-Calc</S.NavItem>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Contact</S.NavItem>
        </Link>
      </S.MobileDropdown>
    </S.HeaderContainer>
  );
};

export default Header;
