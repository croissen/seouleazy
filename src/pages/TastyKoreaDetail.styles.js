import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 5% 10% 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10% 5% 30px;
  }
  @media (max-width: 480px) {
    padding: 15% 4% 20px;
  }
`;

export const BackButtonWrapper = styled.div`
  position: relative;

  @media (max-width: 748px) {
    margin-top: 5%;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 15px;
  color: #0077ff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #005fcc;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

export const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 1.2rem;
  color: #555;
`;

// Image 스타일 (단일 이미지가 있을 때 사용되지만, ResponsiveSliderContainer가 감싸므로 사실상 사용될 일은 드묾)
export const Image = styled.img`
  width: 800px;
  height: 500px;
  object-fit: contain;
  object-position: center;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: 250px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #222;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

export const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e53935;
  margin-bottom: 20px;
`;

export const Desc = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  font-size: 1rem;
  color: #333;
  white-space: pre-line;
  margin-top: 10px;
`;

// ✨ 이미지 갤러리 관련 스타일 시작! ✨

// 이미지 슬라이더를 위한 외부 래퍼
export const ResponsiveSliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px; /* PC 웹 규격: 고정 너비. 이 기준으로 화살표가 나갈 공간이 계산됨. */
  height: 500px; /* 높이 고정 */
  margin: 0 auto 30px; /* 가운데 정렬 및 하단 여백 */
  /* ✨ overflow: hidden; -> 여기서 제거! ✨ */
  border-radius: 12px; /* 이 컨테이너는 둥근 모서리 유지 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  @media (max-width: 768px) {
    height: 250px;
    margin-bottom: 20px;
    /* ✨ 모바일에서는 이미지 안에 화살표가 있으니 overflow: hidden;을 다시 추가! ✨ */
    overflow: hidden;
  }
  @media (max-width: 480px) {
    height: 200px;
    margin-bottom: 20px;
  }
`;

// 실제 이미지가 담기고 넘어가는 컨테이너 (overflow: hidden 유지)
export const ImageSliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* ✨ 여기서 overflow: hidden;을 유지하거나, ResponsiveSliderContainer에서 PC일 때도 hidden을 사용하지 않을 거라면 삭제! ✨ */
  /* HotPlaceDetail.styles.js에서는 이 위치에 overflow: hidden이 있었음 */
  overflow: hidden; /* 이미지가 이 Wrapper 밖으로 나가지 않도록 함 */
  border-radius: 12px;
  /* box-shadow나 background-color는 ResponsiveSliderContainer에 있으므로 중복X */
`;

export const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  position: absolute;
  opacity: ${props => (props.$active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

export const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.3s;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  &.left {
    left: 10px; /* 모바일 기본: 이미지 안쪽에 위치 */

    @media (min-width: 1024px) { /* PC 버전: 이미지 밖으로 빼기 */
      left: -60px; /* 적절한 값으로 조절해서 밖으로 나오게 */
    }
  }

  &.right {
    right: 10px; /* 모바일 기본: 이미지 안쪽에 위치 */

    @media (min-width: 1024px) { /* PC 버전: 이미지 밖으로 빼기 */
      right: -60px; /* 적절한 값으로 조절해서 밖으로 나오게 */
    }
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 1.2rem;
  }
`;
// ✨ 이미지 갤러리 관련 스타일 끝! ✨