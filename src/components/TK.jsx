import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./TK.styles";

function TK() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  // JSON 데이터 불러오기 (상위 5개만)
  useEffect(() => {
    fetch("/data/tastykorea.json") // public/data/tastykorea.json
      .then(res => res.json())
      .then(data => setFoods(data.slice(0, 5)))
      .catch(err => console.error(err));
  }, []);

  // 상세페이지 이동
  const goDetail = (id) => {
    navigate(`/tasty-korea-detail/${id}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Read More 버튼 이동
  const goTastyKoreaPage = () => {
    navigate("/tasty-korea");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Tasty Korea</S.SectionTitle>
        <S.ReadMore onClick={goTastyKoreaPage}>Read More →</S.ReadMore>
      </S.TitleWrapper>
      <S.SubTitle>한국의 대표 음식과 가격을 확인하세요</S.SubTitle>

      <S.PlacesWrapper>
        {foods.map((food) => (
          <S.FoodCard key={food.id} onClick={() => goDetail(food.id)}>
            <S.FoodImg src={food.img} alt={food.name} />
            <S.FoodName>{food.name}</S.FoodName>
            <S.FoodPrice>{food.price}</S.FoodPrice>
          </S.FoodCard>
        ))}
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default TK;
