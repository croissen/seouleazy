import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Footer.styles";

function Footer() {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <S.FooterContainer>
      <S.FooterContent>
        <p>© 2025 SeoulEZ. Content protected by SeoulEZ. No personal data. For high-quality images or any further inquiries, please contact us.</p>
        <S.SupportButton onClick={goToContact}>
          Contact
        </S.SupportButton>
      </S.FooterContent>
    </S.FooterContainer>
  );
}

export default Footer;
