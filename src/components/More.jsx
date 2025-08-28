// src/components/More.js (수정된 코드)
import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./More.styles";

function More() {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <S.Section> 
      <S.TopContentWrapper> 
        <S.ContentBlock bgImg={process.env.PUBLIC_URL + "/img/calc.jpg"}>
          <h2>합리적인 한국 여행을 위하여</h2>
          <p>여행비를 시뮬레이션 하세요!</p>
          <S.Button onClick={() => goToPage("/trip-calc")}>여행계산기</S.Button>
        </S.ContentBlock>

        <S.ContentBlock bgImg={process.env.PUBLIC_URL + "/img/tip.jpg"}>
          <h2>모르면 후회할 다양한 정보</h2>
          <p>미리 확인하세요!</p>
          <S.Button onClick={() => goToPage("/honey-tip")}>꿀팁 확인하러 가기</S.Button>
        </S.ContentBlock>
      </S.TopContentWrapper>

      <S.AboutMeSection> 
        <S.SectionTitle>Hello, World!</S.SectionTitle>
        <S.AboutMeText>
          Hello, I'm a South Korean residing in Seoul. My greatest wish is for every foreign traveler to experience the beauty of Korea, especially Seoul, without a single regret. I believe every moment of their journey should be filled with happiness!
          <br /><br />
          I am simply someone who loves connecting with people and offering help. If there's something that can benefit others, I always strive to make it happen. This website, SeoulEZ, is my very first creation. While it may still have areas for improvement, my commitment to continuous development and updates is unwavering. My goal is to ensure a seamless and enjoyable experience for everyone.
          <br /><br />
          I genuinely hope to communicate and exchange ideas with countless people worldwide through this platform. If you resonate with my vision and wish to join me in this endeavor, please consider supporting me.
        </S.AboutMeText>
        
        {/* Donation Button */}
        <S.DonationButton onClick={() => goToPage("/contact/donation")}>Support My Vision</S.DonationButton>
        <S.GoogleFormNote>
            * After your support, if you kindly reach out via our Google Form, we promise to personally express our sincere gratitude through the contact information you provide.
            <S.GoogleFormLink 
                href="https://forms.gle/uNw63SJ6v3CHmsnT9" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                (Go to Google Form)
            </S.GoogleFormLink>
        </S.GoogleFormNote>
        <S.ClosingRemark>
            Thank you for your love and support for SeoulEZ! With much love,
            <br />SeoulEZ
        </S.ClosingRemark>
      </S.AboutMeSection>

    </S.Section>
  );
}

export default More;