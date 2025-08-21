import React, { useState, useRef } from "react";
import * as S from "./TK.styles";

const foods = [
  { name: "불고기", price: "₩15,000", img: "/img/food/bulgogi.jpg" },
  { name: "비빔밥", price: "₩10,000", img: "/img/food/bibimbap.jpg" },
  { name: "떡볶이", price: "₩5,000", img: "/img/food/tteokbokki.png" },
  { name: "김치찌개", price: "₩8,000", img: "/img/food/kimchijjige.jpg" },
];

function TK() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef();

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = foods.length - 3;
      return prev + 3 > maxIndex ? 0 : prev + 3;
    });
  };

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Tasty Korea</S.SectionTitle>
        <S.ReadMore onClick={nextSlide}>Read More →</S.ReadMore>
      </S.TitleWrapper>
      <S.SubTitle>한국의 대표 음식과 가격을 확인하세요</S.SubTitle>

      <S.PlacesWrapper ref={wrapperRef}>
        <S.SliderInner currentIndex={currentIndex}>
          {foods.map((food, idx) => (
            <S.FoodCard key={idx}>
              <S.FoodImg src={food.img} alt={food.name} />
              <S.FoodName>{food.name}</S.FoodName>
              <S.FoodPrice>{food.price}</S.FoodPrice>
            </S.FoodCard>
          ))}
        </S.SliderInner>
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default TK;
