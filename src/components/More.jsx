import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./More.styles";

function More() {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <S.Section>
      <S.ContentBlock bgImg={process.env.PUBLIC_URL + "/img/calc.jpg"}>
        <h2>합리적인 한국 여행을 위하여</h2>
        <p>여행비를 시뮬레이션 하세요!</p>
        <S.Button onClick={() => goToPage("/trip-calc")}>여행계산기</S.Button>
      </S.ContentBlock>

      <S.ContentBlock bgImg={process.env.PUBLIC_URL + "/img/tip.jpg"}>
        <h2>모르면 후회할 다양한 정보</h2>
        <p>미리 확인하세요!</p>
        <S.Button onClick={() => goToPage("/honey-tip")}>꿀팁 확인하러 가기</S.Button>
      </S.ContentBlock>
    </S.Section>
  );
}

export default More;
