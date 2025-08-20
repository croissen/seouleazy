import React, { useState, useRef } from "react";
import * as S from "./HotPlace.styles";

const places = [
  { title: "남산타워", img: "/img/place/namsan1.png", desc: "서울의 랜드마크, 남산에서 서울 전경을 즐기세요." },
  { title: "경복궁", img: "/img/place/kbg1.png", desc: "조선의 대표 궁궐, 전통과 역사를 느껴보세요." },
  { title: "한강", img: "/img/place/river.jpg", desc: "힐링 가득한 한강으로 놀러오세요." },
  { title: "롯데월드", img: "/img/place/lotte.jpg", desc: "놀이공원과 쇼핑을 한 곳에서 즐기세요." },
  { title: "홍대", img: "/img/place/river.jpg", desc: "젊음과 예술이 가득한 홍대 거리." },
  { title: "명동", img: "/img/place/river.jpg", desc: "젊음과 예술이 가득한 명동 거리." },
];

function HotPlace() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef();

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = places.length - 3; // 한 번에 3개씩
      return prev + 3 > maxIndex ? 0 : prev + 3;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = places.length - 3;
      return prev - 3 < 0 ? maxIndex : prev - 3;
    });
  };

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Hot Place</S.SectionTitle>
        <S.ReadMore>Read More →</S.ReadMore>
      </S.TitleWrapper>
      <S.SubTitle>서울에 유명한 명소를 확인하세요</S.SubTitle>

      <S.PlacesWrapper ref={wrapperRef}>
        <S.SliderInner currentIndex={currentIndex}>
          {places.map((place, idx) => (
            <S.PlaceCard key={idx}>
              <S.PlaceImg src={place.img} alt={place.title} />
              <S.PlaceTitle>{place.title}</S.PlaceTitle>
              <S.PlaceDesc>{place.desc}</S.PlaceDesc>
            </S.PlaceCard>
          ))}
        </S.SliderInner>

        {/* PC 화살표 */}
        <S.ArrowLeft onClick={prevSlide}>‹</S.ArrowLeft>
        <S.ArrowRight onClick={nextSlide}>›</S.ArrowRight>
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default HotPlace;
