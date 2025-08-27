import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./TastyKoreaDetail.styles";

function TastyKoreaDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 모든 JSON 파일을 불러와서 데이터를 찾도록 로직 변경
    const jsonFiles = ['tastykorea.json', 'desserts.json', 'conveniencefoods.json', 'halalfoods.json', 'ownergallery.json']; // 모든 음식 JSON 파일 목록

    const fetchData = async () => {
      let foundFood = null;
      for (const file of jsonFiles) {
        try {
          const res = await fetch(process.env.PUBLIC_URL + `/data/${file}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          foundFood = data.find(item => String(item.id) === id);
          if (foundFood) {
            break;
          }
        } catch (err) {
          console.error(`Error fetching data from ${file}:`, err);
        }
      }
      setFood(foundFood);
      setCurrentImageIndex(0); // 새 음식 로드 시 이미지 인덱스 초기화
    };

    fetchData();
  }, [id]);

  const allImages = useMemo(() => {
    if (!food) return [];
    if (food.galleryImages && food.galleryImages.length > 0) {
      return food.galleryImages;
    }
    if (food.img) {
      return [food.img];
    }
    return [];
  }, [food]);

  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  if (!food) return <S.Loading>Loading...</S.Loading>;

  return (
    <S.Container>
      <S.BackButtonWrapper>
        <S.BackButton onClick={() => navigate(-1)}>← Back</S.BackButton>
      </S.BackButtonWrapper>

      <S.ContentWrapper>
        <S.Title>{food.name}</S.Title>

        {allImages.length > 0 && (
          <S.ResponsiveSliderContainer>
            <S.ImageSliderWrapper>
              {allImages.map((imagePath, index) => (
                <S.SliderImage
                  key={index}
                  src={process.env.PUBLIC_URL + imagePath}
                  alt={`${food.name} ${index + 1}`}
                  $active={index === currentImageIndex}
                />
              ))}
            </S.ImageSliderWrapper>
            {hasMultipleImages && (
              <>
                <S.SliderArrow className="left" onClick={prevImage}>
                  ‹
                </S.SliderArrow>
                <S.SliderArrow className="right" onClick={nextImage}>
                  ›
                </S.SliderArrow>
              </>
            )}
          </S.ResponsiveSliderContainer>
        )}

        <S.Price>{food.price}</S.Price>
        <S.Desc>{food.desc}</S.Desc>
        <S.Content>{food.content}</S.Content>
      </S.ContentWrapper>
    </S.Container>
  );
}

export default TastyKoreaDetail;