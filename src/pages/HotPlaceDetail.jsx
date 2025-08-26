// src/pages/HotPlaceDetail.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './HotPlaceDetail.styles';
import MapComponent from '../components/MapComponent';

const SUBWAY_LINE_COLORS = {
  'Line 1': '#0033A0',
  'Line 2': '#3CB44A',
  'Line 3': '#FF9900',
  'Line 4': '#00A4E0',
  'Line 5': '#A050B8',
  'Line 6': '#CC7820',
  'Line 7': '#546600',
  'Line 8': '#EA5499',
  'Line 9': '#D4A000',
  'Shinbundang Line': '#DA251D',
  'Gyeongui-Jungang Line': '#7B822C',
  'Airport Railroad': '#0090D2',
  'Suin-Bundang Line': '#F5A400',
};

function HotPlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/hotplace.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => String(item.id) === id);
        if (found && found.latitude && found.longitude) {
          found.latitude = parseFloat(found.latitude);
          found.longitude = parseFloat(found.longitude);
        }
        setPlace(found);
        setCurrentImageIndex(0);
      })
      .catch(err => console.error(err));
  }, [id]);

  // Hook 호출 조건부 에러 해결: Hooks는 최상위에서 호출되어야 함.
  // place가 아직 null일 때도 allImages가 계산될 수 있도록 초기값 처리.
  const allImages = useMemo(() => {
    if (!place) return [];
    if (place.galleryImages && place.galleryImages.length > 0) {
      return place.galleryImages;
    }
    if (place.img) {
      return [place.img];
    }
    return [];
  }, [place]);

  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };

  if (!place) return <S.Loading>Loading...</S.Loading>;

  const highlightsArray = place.highlights ? place.highlights.split(',').map(item => item.trim()) : [];

  let lineKey = '';
  let lineNumberDisplay = '';
  let stationDisplayName = '';

  if (place.nearestStationInfo) {
    const info = place.nearestStationInfo.trim();
    
    const matchLineNumber = info.match(/^(Line\s(\d+))\s(.+)$/);
    const matchMultiWordLine = info.match(/^((?:[A-Za-z]+(?:\-[A-Za-z]+)?(?:\s[A-Za-z]+)?)\sLine)\s(.+)$/);
    const matchAirportRailroad = info.match(/^(Airport Railroad)\s(.+)$/);
    const matchGyeonguiJungang = info.match(/^(Gyeongui-Jungang Line)\s(.+)$/);
    const matchShinbundang = info.match(/^(Shinbundang Line)\s(.+)$/);

    if (matchLineNumber) {
      lineKey = matchLineNumber[1];
      lineNumberDisplay = matchLineNumber[2];
      stationDisplayName = matchLineNumber[3];
    } else if (matchShinbundang) {
        lineKey = matchShinbundang[1];
        lineNumberDisplay = "Shinbundang";
        stationDisplayName = matchShinbundang[2];
    } else if (matchMultiWordLine) {
        lineKey = matchMultiWordLine[1];
        lineNumberDisplay = matchMultiWordLine[1].replace(' Line', '');
        stationDisplayName = matchMultiWordLine[2];
        if (lineNumberDisplay === 'Gyeongui-Jungang') {
            lineNumberDisplay = 'GJ';
        }
    } else if (matchAirportRailroad) {
        lineKey = matchAirportRailroad[1];
        lineNumberDisplay = 'AREX';
        stationDisplayName = matchAirportRailroad[2];
    }
    
    if (!lineKey && !lineNumberDisplay && !stationDisplayName) {
      stationDisplayName = info;
    }
  }

  const lineColor = SUBWAY_LINE_COLORS[lineKey] || '#6c757d';


  return (
    <S.Container>
      <S.BackButtonWrapper>
        <S.BackButton onClick={() => navigate(-1)}>← Back</S.BackButton>
      </S.BackButtonWrapper>

      <S.ContentWrapper>
        <S.Title>{place.title}</S.Title>

        {allImages.length > 0 && ( // 이미지가 한 개라도 있을 때만 이미지 영역 표시
          hasMultipleImages ? (
            <S.ResponsiveSliderContainer>
              <S.ImageSliderWrapper>
                {allImages.map((imagePath, index) => (
                  <S.SliderImage
                    key={index}
                    src={process.env.PUBLIC_URL + imagePath}
                    alt={`${place.title} ${index + 1}`}
                    $active={index === currentImageIndex}
                  />
                ))}
              </S.ImageSliderWrapper>
              <S.SliderArrow className="left" onClick={prevImage}>
                ‹
              </S.SliderArrow>
              <S.SliderArrow className="right" onClick={nextImage}>
                ›
              </S.SliderArrow>
            </S.ResponsiveSliderContainer>
          ) : (
            <S.Image src={process.env.PUBLIC_URL + allImages[0]} alt={place.title} />
          )
        )}
        {/* 만약 allImages가 아예 없으면 이미지를 표시하지 않음. */}

        <S.Desc>{place.desc}</S.Desc>

        {place.tips && (
          <>
            <S.SectionTitle>💡 Tips for your visit</S.SectionTitle>
            <S.TipsSection>
              <p>{place.tips}</p>
            </S.TipsSection>
          </>
        )}

        {highlightsArray.length > 0 && (
          <>
            <S.SectionTitle>🌟 Highlights</S.SectionTitle>
            <S.HighlightsList>
              {highlightsArray.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </S.HighlightsList>
          </>
        )}

        {place.latitude && place.longitude && (
          <>
            {stationDisplayName && (
              <S.SubwayInfoRow>
                <span>Nearest Station:</span>
                <S.SubwayInfoContainer>
                  {lineNumberDisplay && (
                    <S.SubwayLineCircle color={lineColor}>
                      {lineNumberDisplay}
                    </S.SubwayLineCircle>
                  )}
                  <S.StationName>{stationDisplayName}</S.StationName>
                </S.SubwayInfoContainer>
              </S.SubwayInfoRow>
            )}

            <MapComponent lat={place.latitude} lng={place.longitude} title={place.title} />
          </>
        )}
      </S.ContentWrapper>
    </S.Container>
  );
}

export default HotPlaceDetail;