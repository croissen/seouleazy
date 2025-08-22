import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './TastyKorea.styles'; // HotPlace 스타일 재사용

function TastyKorea() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/tastykorea.json')
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.error(err));
  }, []);

  const goDetail = (id) => {
    navigate(`/tasty-korea-detail/${id}`);
  };

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Tasty Korea</S.SectionTitle>
      </S.TitleWrapper>
      <S.SubTitle>한국의 대표 음식과 가격을 확인하세요</S.SubTitle>

      <S.PlacesWrapper>
        {foods.map((food) => (
          <S.PlaceCard key={food.id} onClick={() => goDetail(food.id)}>
            <S.PlaceImg src={process.env.PUBLIC_URL + food.img} alt={food.name} />
            <S.PlaceTitle>{food.name}</S.PlaceTitle>
            <S.PlaceDesc>{food.price}</S.PlaceDesc>
          </S.PlaceCard>
        ))}
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default TastyKorea;
