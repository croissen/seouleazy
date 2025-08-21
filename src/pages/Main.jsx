import React, { useEffect } from "react";
import * as S from "./Main.styles";
import Slideshow from "../components/Slideshow";
import HotPlace from "../components/HP";
import TastyKorea from "../components/TK";
import More from "../components/More";

function Main() {
  // 마운트 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sharePage = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("링크가 복사되었습니다!");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("링크가 복사되었습니다!");
    }
  };

  return (
    <S.Container>
      <Slideshow />
      <HotPlace />
      <TastyKorea />
      <More />

      {/* 공유 버튼 */}
      <S.TopButton style={{ bottom: "60px" }} onClick={sharePage}>
        🔗
      </S.TopButton>

      {/* Top 버튼 */}
      <S.TopButton style={{ bottom: "20px" }} onClick={scrollToTop}>
        ▲
      </S.TopButton>
    </S.Container>
  );
}

export default Main;
