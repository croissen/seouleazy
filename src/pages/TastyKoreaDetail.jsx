import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./TastyKoreaDetail.styles";

function TastyKoreaDetail() {
  const { id } = useParams(); 
  const [food, setFood] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/tastykorea.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(item => item.id === id); 
        setFood(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!food) return <S.Loading>Loading...</S.Loading>;

  return (
    <S.Container>
      {/* 뒤로가기 버튼 */}
      <S.BackButtonWrapper>
        <S.BackButton onClick={() => navigate(-1)}>← Back</S.BackButton>
      </S.BackButtonWrapper>

      <S.ContentWrapper>
        <S.Title>{food.name}</S.Title>
        <S.Image src={process.env.PUBLIC_URL + food.img} alt={food.name} />
        <S.Price>{food.price}</S.Price>
        <S.Desc>{food.desc}</S.Desc>
        <S.Content>{food.content}</S.Content>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default TastyKoreaDetail;
