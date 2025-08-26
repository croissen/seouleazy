import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './TastyKorea.styles';

function TastyKorea() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/tastykorea.json')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setFilteredFoods(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 검색어 필터링
  useEffect(() => {
    const results = foods.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.price.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(results);
    setCurrentPage(1); // 검색 시 페이지 1로 초기화
  }, [searchTerm, foods]);

  // 페이지 변경 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleChange = (e) => setSearchTerm(e.target.value);
  const goDetail = (id) => navigate(`/tasty-korea-detail/${id}`);

  // 현재 페이지에 보여줄 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <S.Section>
      <S.SectionTitle>Tasty Korea</S.SectionTitle>

      <S.SearchWrapper>
        <S.SubTitle>Check out Korea's representative foods and their prices!</S.SubTitle>
        <S.SearchInput
          type="text"
          placeholder="Search Food"
          value={searchTerm}
          onChange={handleChange}
        />
      </S.SearchWrapper>

      <S.PlacesWrapper>
        {currentFoods.length > 0 ? (
          currentFoods.map(food => (
            <S.PlaceCard key={food.id} onClick={() => goDetail(food.id)}>
              <S.PlaceImg src={process.env.PUBLIC_URL + food.img} alt={food.name} />
              <S.PlaceTitle>{food.name}</S.PlaceTitle>
              <S.PlaceDesc>{food.price}</S.PlaceDesc>
            </S.PlaceCard>
          ))
        ) : (
          <S.NoResults>No results found. You can search in English.</S.NoResults>
        )}
      </S.PlacesWrapper>

      {/* 페이지네이션 버튼 */}
      {totalPages > 1 && (
        <S.PaginationWrapper>
          <S.PageButton
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </S.PageButton>
          <span>{currentPage} / {totalPages}</span>
          <S.PageButton
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </S.PageButton>
        </S.PaginationWrapper>
      )}
    </S.Section>
  );
}

export default TastyKorea;
