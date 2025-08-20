import React from "react";
import * as S from "./Footer.styles";

function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <p>© 2025 SeoulEZ. All rights reserved.</p>
        <S.SupportButton onClick={() => alert("후원 페이지로 이동")}>
          후원하기
        </S.SupportButton>
      </S.FooterContent>
    </S.FooterContainer>
  );
}

export default Footer;