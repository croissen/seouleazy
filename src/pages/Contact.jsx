// Contact.jsx (수정된 코드)
import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom'; // Outlet, useNavigate, useLocation 추가
import * as S from './Contact.styles';

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로를 알기 위해 사용

  return (
    <S.Container>
      {/* 버튼 선택 영역 */}
      <S.ButtonContainer>
        <S.Button
          onClick={() => navigate('/contact/qna')} // 클릭 시 URL 변경
          // URL 경로에 따라 active 상태 설정
          active={location.pathname === '/contact' || location.pathname === '/contact/qna'}
        >
          Ads & Inquiries
        </S.Button>
        <S.Button
          onClick={() => navigate('/contact/donation')} // 클릭 시 URL 변경
          // URL 경로에 따라 active 상태 설정
          active={location.pathname === '/contact/donation'}
        >
          Donation
        </S.Button>
      </S.ButtonContainer>

      {/* 내용 영역 - 이제 여기에 자식 라우트의 내용이 렌더링됩니다! */}
      <S.ContentSection>
        <Outlet /> {/* 자식 라우트의 컴포넌트가 이곳에 표시돼요! */}
      </S.ContentSection>
    </S.Container>
  );
};

export default Contact;