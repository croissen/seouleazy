import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './HotPlace.styles';

function HotPlace() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/hotplace.json')
      .then(res => res.json())
      .then(data => setPlaces(data))
      .catch(err => console.error(err));
  }, []);

  const goDetail = (id) => {
    navigate(`/hot-place-detail/${id}`);
  };

  return (
    <S.Section>
      <S.TitleWrapper>
        <S.SectionTitle>Hot Place</S.SectionTitle>
      </S.TitleWrapper>
      <S.SubTitle>서울에 유명한 명소를 확인하세요</S.SubTitle>

      <S.PlacesWrapper>
        {places.map((place) => (
          <S.PlaceCard key={place.id} onClick={() => goDetail(place.id)}>
            <S.PlaceImg src={place.img} alt={place.title} />
            <S.PlaceTitle>{place.title}</S.PlaceTitle>
            <S.PlaceDesc>{place.desc}</S.PlaceDesc>
          </S.PlaceCard>
        ))}
      </S.PlacesWrapper>
    </S.Section>
  );
}

export default HotPlace;
