import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./HP.styles";

function HP() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  // JSON 데이터 불러오기
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/hotplace.json")
      .then(res => res.json())
      .then(data => setPlaces(data.slice(0, 5))) // 상위 5개만
      .catch(err => console.error(err));
  }, []);

  const goDetail = (id) => {
    navigate(`/hot-place-detail/${id}`);
  };

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Hot Place</S.SectionTitle>
        <S.ReadMore onClick={() => {
            navigate("/hot-place");
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }}>
          Read More →
        </S.ReadMore>
      </S.TitleWrapper>
      <S.SubTitle>서울에 유명한 명소를 확인하세요</S.SubTitle>

      <S.PlacesWrapper>
        {places.map((place) => (
          <S.PlaceCard key={place.id} onClick={() => goDetail(place.id)}>
            <S.PlaceImg src={process.env.PUBLIC_URL + place.img} alt={place.title} />
            <S.PlaceTitle>{place.title}</S.PlaceTitle>
            <S.PlaceDesc>{place.desc}</S.PlaceDesc>
          </S.PlaceCard>
        ))}
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default HP;
