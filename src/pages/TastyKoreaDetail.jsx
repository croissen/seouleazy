import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./TastyKoreaDetail.styles";

function TastyKoreaDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch("/data/tastykorea.json") // public/data/tastykorea.json
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(item => String(item.id) === id); // 숫자 id를 문자열로 비교
        setFood(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!food) return <S.Loading>Loading...</S.Loading>;

  return (
    <S.Container>
      <S.Title>{food.name}</S.Title>
      <S.Image src={food.img} alt={food.name} />
      <S.Price>{food.price}</S.Price>
      <S.Desc>{food.desc}</S.Desc>
      <S.Content>{food.content}</S.Content>
    </S.Container>
  );
}

export default TastyKoreaDetail;
