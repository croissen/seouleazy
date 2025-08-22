import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./TastyKoreaDetail.styles";

function TastyKoreaDetail() {
  const { id } = useParams(); // ex) "bibimbap"
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/tastykorea.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(item => item.id === id); // 문자열 비교
        setFood(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!food) return <S.Loading>Loading...</S.Loading>;

  return (
    <S.Container>
      <S.Title>{food.name}</S.Title>
      <S.Image src={process.env.PUBLIC_URL + food.img} alt={food.name} />
      <S.Price>{food.price}</S.Price>
      <S.Desc>{food.desc}</S.Desc>
      <S.Content>{food.content}</S.Content>
    </S.Container>
  );
}

export default TastyKoreaDetail;
