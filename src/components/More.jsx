import React from "react";
import { Link } from "react-router-dom";
import * as S from "./More.styles";

function More() {
  return (
    <S.Section>
      <S.ContentBlock bgImg="/img/calc.jpg">
        <h2>합리적인 한국 여행을 위하여</h2>
        <p>여행비를 시뮬레이션 하세요!</p>
        <Link to="/trip-calc">
          <S.Button>여행계산기</S.Button>
        </Link>
      </S.ContentBlock>

      <S.ContentBlock bgImg="/img/tip.jpg">
        <h2>모르면 후회할 다양한 정보</h2>
        <p>미리 확인하세요!</p>
        <Link to="/honey-tip">
          <S.Button>꿀팁 확인하러 가기</S.Button>
        </Link>
      </S.ContentBlock>
    </S.Section>
  );
}

export default More;
