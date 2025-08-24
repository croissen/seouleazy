// HoneyTip.jsx
import React, { useEffect, useState } from 'react';
import * as S from './HoneyTip.styles';

const HoneyTip = () => {
  const [honeyTips, setHoneyTips] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/honeytip_en.json') // 영어 JSON 파일
      .then(res => res.json())
      .then(data => setHoneyTips(data))
      .catch(err => console.error('Failed to load honey tips data:', err));
  }, []);

  if (honeyTips.length === 0) return <S.Container>Loading...</S.Container>;

  return (
    <S.Container>
      <S.PageTitle>✨ Korea Travel Tips!</S.PageTitle>
      <S.Description>
        Essential information and useful tips for foreigners visiting Korea. Enjoy a fun and comfortable trip!
      </S.Description>

      <S.TipGrid>
        {honeyTips.map(tip => (
          <S.TipCard key={tip.id}>
            <S.TipIcon>{tip.icon}</S.TipIcon>
            <S.TipTitle>{tip.title}</S.TipTitle>
            <S.TipContent>{tip.content}</S.TipContent>
          </S.TipCard>
        ))}
      </S.TipGrid>
    </S.Container>
  );
};

export default HoneyTip;
