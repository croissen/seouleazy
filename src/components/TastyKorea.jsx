import React, { useState } from "react";
import * as S from "./TastyKorea.styles";

const foods = [
  { name: "불고기", price: "₩15,000", img: "/img/food/bulgogi.jpg" },
  { name: "비빔밥", price: "₩10,000", img: "/img/food/bibimbap.jpg" },
  { name: "떡볶이", price: "₩5,000", img: "/img/food/tteokbokki.png" },
  { name: "김치찌개", price: "₩8,000", img: "/img/food/kimchijjige.jpg" },
];

function TastyKorea() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === foods.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? foods.length - 1 : prev - 1));

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Food & Price</S.SectionTitle>
        <S.ReadMore onClick={nextSlide}>Read More →</S.ReadMore>
      </S.TitleWrapper>
      <S.SubTitle>한국의 대표 음식과 가격을 확인하세요</S.SubTitle>

      <S.PlacesWrapper>
        {foods.map((food, idx) => (
          <S.FoodCard key={food.name} isActive={idx === current}>
            <S.FoodImg src={food.img} alt={food.name} />
            <S.FoodName>{food.name}</S.FoodName>
            <S.FoodPrice>{food.price}</S.FoodPrice>
          </S.FoodCard>
        ))}

        {/* 모바일 화살표 */}
        <S.ArrowLeft onClick={prevSlide}>‹</S.ArrowLeft>
        <S.ArrowRight onClick={nextSlide}>›</S.ArrowRight>
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default TastyKorea;
