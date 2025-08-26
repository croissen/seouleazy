// src/components/MapComponent.jsx

import React, { useRef, useEffect } from 'react';
import L from 'leaflet'; // Leaflet 라이브러리 임포트
import 'leaflet/dist/leaflet.css'; // Leaflet 기본 CSS 임포트
import styled from 'styled-components'; // 스타일 컴포넌트를 위해 임포트

// ----------------------------------------------------
// ✨ 중요: Leaflet 기본 마커 아이콘 깨짐 현상 해결 (Webpack 환경에서 흔함)
// ----------------------------------------------------
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});
// ----------------------------------------------------


// 지도를 감쌀 컨테이너 스타일 정의
const MapContainerDiv = styled.div`
  width: 100%;
  height: 400px; /* 지도의 높이, 필요에 따라 조절해줘! */
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과도 살짝 */

  @media (max-width: 768px) {
    height: 300px; /* 모바일에서 높이 조절 */
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    height: 250px;
    margin-bottom: 20px;
  }
`;

function MapComponent({ lat, lng, title }) {
  const mapRef = useRef(null); // 지도를 렌더링할 div 엘리먼트에 연결할 ref
  const leafletMapRef = useRef(null); // Leaflet map 인스턴스를 저장할 ref

  useEffect(() => {
    // 위도와 경도 정보가 없으면 지도를 띄울 수 없으니 early return
    if (!lat || !lng) return;

    // 만약 Leaflet 지도 인스턴스가 이미 존재한다면, 기존 지도를 제거하고 다시 만듦 (props 변경 시 업데이트 위함)
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
    }

    // mapRef.current는 지도가 렌더링될 실제 DOM 엘리먼트
    // setView([lat, lng], zoomLevel)로 지도 중앙과 확대 레벨 설정
    const map = L.map(mapRef.current).setView([lat, lng], 16);
    leafletMapRef.current = map; // 지도 인스턴스 저장

    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 핫플레이스 위치에 마커 추가
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>${title}</b>`) // 마커 클릭 시 뜰 팝업 메시지
      .openPopup(); // 기본적으로 팝업 열어두기

    // 컴포넌트 언마운트 시 지도 인스턴스 정리
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null; // 인스턴스 참조 제거
      }
    };
  }, [lat, lng, title]); // lat, lng, title props가 변경될 때마다 useEffect 재실행

  return <MapContainerDiv ref={mapRef} />; // 지도가 렌더링될 div 엘리먼트
}

export default MapComponent;