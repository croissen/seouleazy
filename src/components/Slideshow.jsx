import React, { useState, useEffect } from "react";
import * as S from "./Slideshow.styles";

const images = [
  process.env.PUBLIC_URL + "/img/place/namsan1.png",
  process.env.PUBLIC_URL + "/img/place/river.jpg",
  process.env.PUBLIC_URL + "/img/place/gyeongbok.jpg",
];

function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const itv = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(itv);
  }, []);

  return (
    <S.Section>
      <S.SlideWrapper>
        {images.map((src, idx) => (
          <S.Panorama key={src} src={src} isActive={idx === current} />
        ))}
        <S.Overlay>
          <S.SlideTitle>어디긴? SeoulEZ!!</S.SlideTitle>
          <S.SlideSubtitle>서울을 쉽고 즐겁게 체험하세요</S.SlideSubtitle>
        </S.Overlay>
        {/* Overlay 밖으로 이동, 항상 화면 하단 기준 */}
        <S.ScrollDown>↓ scroll</S.ScrollDown>
      </S.SlideWrapper>
    </S.Section>
  );
}

export default Slideshow;
