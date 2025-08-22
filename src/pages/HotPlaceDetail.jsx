import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './HotPlaceDetail.styles';

function HotPlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/hotplace.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => String(item.id) === id);
        setPlace(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!place) return <S.Loading>Loading...</S.Loading>;

  return (
    <S.Container>
      <S.Title>{place.title}</S.Title>
      <S.Image src={process.env.PUBLIC_URL + place.img} alt={place.title} />
      <S.Desc>{place.desc}</S.Desc>
      <S.Content>{place.content}</S.Content>
    </S.Container>
  );
}

export default HotPlaceDetail;
