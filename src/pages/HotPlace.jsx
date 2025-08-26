import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './HotPlace.styles';

function HotPlace() {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/hotplace.json')
      .then(res => res.json())
      .then(data => {
        setPlaces(data);
        setFilteredPlaces(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const results = places.filter(place =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlaces(results);
    setCurrentPage(1); // 검색 시 페이지 1로 초기화
  }, [searchTerm, places]);

  // 페이지 변경 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const goDetail = (id) => navigate(`/hot-place-detail/${id}`);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlaces = filteredPlaces.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  return (
    <S.Section>
      <S.SectionTitle>Hot Place</S.SectionTitle>

      <S.SearchWrapper>
        <S.SubTitle>Check out the famous attractions in Seoul!</S.SubTitle>
        <S.SearchInput
          type="text"
          placeholder="Search Place"
          value={searchTerm}
          onChange={handleChange}
        />
      </S.SearchWrapper>

      <S.PlacesWrapper>
        {currentPlaces.length > 0 ? (
          currentPlaces.map(place => (
            <S.PlaceCard key={place.id} onClick={() => goDetail(place.id)}>
              <S.PlaceImg src={process.env.PUBLIC_URL + place.img} alt={place.title} />
              <S.PlaceTitle>{place.title}</S.PlaceTitle>
              <S.PlaceDesc>{place.desc}</S.PlaceDesc>
            </S.PlaceCard>
          ))
        ) : (
          <S.NoResults>No results found. You can search in English.</S.NoResults>
        )}
      </S.PlacesWrapper>

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

export default HotPlace;
