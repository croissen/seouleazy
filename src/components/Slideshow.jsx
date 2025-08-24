import React, { useState, useEffect } from "react";
import * as S from "./Slideshow.styles";

const desktopImages = [
  process.env.PUBLIC_URL + "/img/place/namsan2.png",
  process.env.PUBLIC_URL + "/img/place/hangang.png",
  process.env.PUBLIC_URL + "/img/place/gyeongbokgung2.png",
];

const mobileImages = [
  process.env.PUBLIC_URL + "/img/place/namsan1.png",
  process.env.PUBLIC_URL + "/img/place/hangang.png",
  process.env.PUBLIC_URL + "/img/place/gyeongbokgung1.png",
];

function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const itv = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(itv);
  }, [images]);

  return (
    <S.Section>
      <S.SlideWrapper>
        {images.map((src, idx) => (
          <S.Panorama key={src} src={src} isActive={idx === current} />
        ))}
        <S.Overlay>
          <S.SlideTitle>Where else? SeoulEZ!!</S.SlideTitle>
          <S.SlideSubtitle>Discover Seoul the easy and fun way</S.SlideSubtitle>
        </S.Overlay>
        <S.ScrollDown>↓ scroll</S.ScrollDown>
      </S.SlideWrapper>
    </S.Section>
  );
}

export default Slideshow;
