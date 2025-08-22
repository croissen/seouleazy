import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Header.styles";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); // 현재 경로 확인

  // 스크롤 시 배경, 드롭다운 닫기
  useEffect(() => {
    const handleScroll = () => {
      // 메인 화면('/')일 때만 스크롤 반영
      if (location.pathname === "/") {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true); // 다른 페이지에서는 항상 검은색
      }
      setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기값 세팅
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
      <S.Logo href="/">SeoulEZ</S.Logo>

      <S.Nav className="desktop">
        <S.NavItem href="/hot-place">Hot-Place</S.NavItem>
        <S.NavItem href="/tasty-korea">Tasty-Korea</S.NavItem>
        <S.NavItem href="/trip-calc">Trip-Calc</S.NavItem>
        <S.NavItem href="/honey-tip">Honey-Tip</S.NavItem>
      </S.Nav>

      <S.Contact className="desktop">Contact</S.Contact>

      <S.MobileMenuButton id="mobile-hamburger" onClick={toggleMobileMenu}>
        &#x2630;
      </S.MobileMenuButton>

      <S.MobileDropdown ref={dropdownRef} isOpen={mobileMenuOpen}>
        <S.NavItem href="/hot-place" onClick={handleMenuItemClick}>
          Hot-Place
        </S.NavItem>
        <S.NavItem href="/tasty-korea" onClick={handleMenuItemClick}>
          Tasty-Korea
        </S.NavItem>
        <S.NavItem href="/trip-calc" onClick={handleMenuItemClick}>
          Trip-Calc
        </S.NavItem>
        <S.NavItem href="/contact" onClick={handleMenuItemClick}>
          Contact
        </S.NavItem>
      </S.MobileDropdown>
    </S.HeaderContainer>
  );
};

export default Header;
