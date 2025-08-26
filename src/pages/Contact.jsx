// Contact.jsx
import React, { useState } from 'react';
import * as S from './Contact.styles';

const Contact = () => {
  const [activeSection, setActiveSection] = useState('inquiry');

  return (
    <S.Container>
      {/* 버튼 선택 영역 */}
      <S.ButtonContainer>
        <S.Button
          onClick={() => setActiveSection('inquiry')}
          active={activeSection === 'inquiry'}
        >
          Ads & Inquiries
        </S.Button>
        <S.Button
          onClick={() => setActiveSection('donation')}
          active={activeSection === 'donation'}
        >
          Donation
        </S.Button>
      </S.ButtonContainer>

      {/* 내용 영역 */}
      <S.ContentSection>
        {activeSection === 'inquiry' ? (
          <div>
            <S.SectionTitle>💌 Ads & Inquiries</S.SectionTitle>
            <S.SectionText>
              If you have any questions or partnership inquiries, feel free to reach out!
              Please use the form below.
            </S.SectionText>
            <S.EmailLink
              href="https://forms.gle/uNw63SJ6v3CHmsnT9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <S.HighlightText>Go to Ads & Inquiries Form</S.HighlightText>
            </S.EmailLink>
            <S.SectionText small>
              * We aim to respond within 2–3 business days!
            </S.SectionText>
          </div>
        ) : (
          <div>
            <S.SectionTitle>💖 Donation</S.SectionTitle>
            <S.SectionText>
              To help our project grow and create even better content,
              even a small contribution makes a big difference! 
              Thank you so much! 🙏
            </S.SectionText>

            {/* 한국 계좌 정보 */}
            <S.DonationInfo>
              <p>IBK Bank</p>
              <p>97303748201019 (Seungmin Kwak)</p>
            </S.DonationInfo>

            {/* Ko-fi 버튼 */}
            <S.DonationInfo>
              <p>Or support us via Ko-fi:</p>
              <S.KofiButton
                href="https://ko-fi.com/seoulez"
                target="_blank"
                rel="noopener noreferrer"
              >
                ☕ Support on Ko-fi
              </S.KofiButton>
            </S.DonationInfo>

            <S.SectionText small>
              * We sincerely thank everyone who supports us! You are amazing! 👍
            </S.SectionText>
          </div>
        )}
      </S.ContentSection>
    </S.Container>
  );
};

export default Contact;
