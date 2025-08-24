// Contact.jsx
import React, { useState } from 'react';
import * as S from './Contact.styles';

const Contact = () => {
  const [activeSection, setActiveSection] = useState('inquiry');

  return (
    <S.Container>
      <S.ButtonContainer>
        <S.Button
          onClick={() => setActiveSection('inquiry')}
          active={activeSection === 'inquiry'}
        >
          Ads & Inquiries
        </S.Button>
        <S.Button
          onClick={() => setActiveSection('sponsorship')}
          active={activeSection === 'sponsorship'}
        >
          Sponsorship
        </S.Button>
      </S.ButtonContainer>

      <S.ContentSection>
        {activeSection === 'inquiry' ? (
          <div>
            <S.SectionTitle>💌 Ads & Inquiries</S.SectionTitle>
            <S.SectionText>
              If you have any questions or partnership inquiries, feel free to reach out!
              Contact us via the email below.
            </S.SectionText>
            <S.EmailLink href="mailto:contact@yourwebsite.com">
              <S.HighlightText>contact@yourwebsite.com</S.HighlightText>
            </S.EmailLink>
            <S.SectionText small>
              * We aim to respond within 2–3 business days!
            </S.SectionText>
          </div>
        ) : (
          <div>
            <S.SectionTitle>💖 Sponsorship</S.SectionTitle>
            <S.SectionText>
              To help our project grow and create even better content,
              even a small contribution makes a big difference! 
              Thank you so much! 🙏
            </S.SectionText>
            <S.DonationInfo>
              <p>Bank: Rabbit Bank 🐇</p>
              <p>Account Number: 1234-5678-91011 (Holder: Rabbit K)</p>
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
