import React, { useState, useEffect } from 'react';
import * as S from './Main.styles';

const images = [
  "/img/place/namsan1.png",
  "/img/place/river.jpg",
  "/img/place/kbg1.png"
];

function Main() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000); // 8초마다 이미지 전환
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      {images.map((src, idx) => (
        <S.Panorama
          key={src}
          src={src}
          isActive={idx === current} // 현재 인덱스만 active
        />
      ))}
      <S.Overlay>
        <S.Title>어디긴? SeoulEZ!!</S.Title>
        <S.Subtitle>서울을 쉽고 즐겁게 체험하세요</S.Subtitle>
      </S.Overlay>
    </S.Container>
  );
}

export default Main;
