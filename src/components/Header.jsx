import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import * as S from "./Header.styles";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation(); 

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

  // ✨ 여기 handleMenuItemClick 함수를 수정했어요! ✨
  const handleMenuItemClick = () => {
    setMobileMenuOpen(false); // 모바일 메뉴 닫기
    window.scrollTo(0, 0);   // ✨ 페이지 스크롤을 맨 위로! ✨
  };

  return (
    <S.HeaderContainer scrolled={scrolled}>
      {/* 로고도 클릭 시 스크롤 맨 위로 갈 수 있도록 onClick 추가 (필요하다면) */}
      <Link to="/" style={{ textDecoration: "none" }} onClick={handleMenuItemClick}>
        <S.Logo>SeoulEZ</S.Logo>
      </Link>

      <S.Nav className="desktop">
        {/* ✨ 데스크톱 NavItem에도 onClick을 추가했어요! ✨ */}
        <Link to="/hot-place" style={{ textDecoration: "none" }} onClick={handleMenuItemClick}>
          <S.NavItem>Hot-Place</S.NavItem>
        </Link>
        <Link to="/tasty-korea" style={{ textDecoration: "none" }} onClick={handleMenuItemClick}>
          <S.NavItem>Tasty-Korea</S.NavItem>
        </Link>
        <Link to="/trip-calc" style={{ textDecoration: "none" }} onClick={handleMenuItemClick}>
          <S.NavItem>Trip-Calc</S.NavItem>
        </Link>
        <Link to="/honey-tip" style={{ textDecoration: "none" }} onClick={handleMenuItemClick}>
          <S.NavItem>Honey-Tip</S.NavItem>
        </Link>
      </S.Nav>

      {/* ✨ 데스크톱 Contact Link에도 onClick을 추가했어요! ✨ */}
      <Link to="/contact" style={{ textDecoration: "none" }} onClick={handleMenuItemClick}>
        <S.Contact className="desktop">Contact</S.Contact>
      </Link>

      <S.MobileMenuButton id="mobile-hamburger" onClick={toggleMobileMenu}>
        &#x2630;
      </S.MobileMenuButton>

      <S.MobileDropdown ref={dropdownRef} isOpen={mobileMenuOpen}>
        {/* 모바일 NavItem은 기존에도 onClick이 있었고, 위에서 함수를 수정했으니 잘 적용될 거예요! */}
        <Link to="/hot-place" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Hot-Place</S.NavItem>
        </Link>
        <Link to="/tasty-korea" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Tasty-Korea</S.NavItem>
        </Link>
        <Link to="/trip-calc" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Trip-Calc</S.NavItem>
        </Link>
        <Link to="/honey-tip" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Honey-Tip</S.NavItem>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <S.NavItem onClick={handleMenuItemClick}>Contact</S.NavItem>
        </Link>
      </S.MobileDropdown>
    </S.HeaderContainer>
  );
};

export default Header;