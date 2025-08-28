import React from 'react';
import * as S from './Contact.styles'; // Contact.styles를 재활용할 수 있어요!

const InquirySection = () => {
  return (
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
  );
};

export default InquirySection;