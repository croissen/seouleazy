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
      // 메인 페이지일 때만 스크롤 여부에 따라 배경 투명도 조절
      if (location.pathname === "/") {
        setScrolled(window.scrollY > 50);
      } else {
        // 메인 페이지가 아니면 항상 배경이 보이도록
        setScrolled(true);
      }
      setMobileMenuOpen(false); // 스크롤하면 모바일 메뉴 닫기
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 컴포넌트 마운트 시 한 번 실행하여 초기 상태 설정
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // location.pathname이 바뀔 때마다 다시 실행

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 드롭다운 외부를 클릭했는지, 그리고 햄버거 버튼이 아닌지 확인
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("#mobile-hamburger")
      ) {
        setMobileMenuOpen(false); // 모바일 메뉴 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 모바일 메뉴 토글 함수
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // 메뉴 아이템 클릭 시 모바일 메뉴 닫기
  const handleMenuItemClick = () => setMobileMenuOpen(false);

  return (
    <S.HeaderContainer scrolled={scrolled}>
      {/* 로고 */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <S.Logo>SeoulEZ</S.Logo>
      </Link>

      {/* 데스크탑 메뉴 - Nav 안에 묶여있는 메뉴 아이템들 */}
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

      {/* Contact는 Nav와는 별도로 존재했던 원래 구조 유지!! */}
      <Link to="/contact" style={{ textDecoration: "none" }}>
        <S.Contact className="desktop">Contact</S.Contact>
      </Link>

      {/* 모바일 햄버거 버튼 */}
      <S.MobileMenuButton id="mobile-hamburger" onClick={toggleMobileMenu}>
        &#x2630;
      </S.MobileMenuButton>

      {/* 모바일 드롭다운 - 여기서는 Contact도 NavItem으로 통일되어 있었으니 그대로 유지! */}
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