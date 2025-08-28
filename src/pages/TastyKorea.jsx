import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './TastyKorea.styles';

function TastyKorea() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [activeTab, setActiveTab] = useState('korean');

  const tabDataMap = {
    'korean': { name: 'Korean Food', file: 'tastykorea.json', subtitle: "Check out Korea's representative foods and their prices!" },
    'dessert': { name: 'Dessert', file: 'desserts.json', subtitle: "Sweet treats from Korea and beyond!" },
    'convenience': { name: 'Convenience Store', file: 'conveniencefoods.json', subtitle: "Explore popular Korean convenience store foods!" },
    // 'halal': { name: 'Halal Food', file: 'halalfoods.json', subtitle: "Discover Halal-friendly foods available in Korea!" },
    // 'owner_gallery': { name: "Owner's Gallery", file: 'ownergallery.json', subtitle: "My Top Picks from Personal Culinary Journeys!" },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const filePath = `/data/${tabDataMap[activeTab].file}`;
    
    fetch(process.env.PUBLIC_URL + filePath)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setFoods(data);
        setFilteredFoods(data);
        setSearchTerm('');
        setCurrentPage(1);
      })
      .catch(err => {
        console.error(`Error fetching data for ${activeTab} tab:`, err);
        setFoods([]);
        setFilteredFoods([]);
        setSearchTerm('');
        setCurrentPage(1);
      });
  }, [activeTab]);

  useEffect(() => {
    const results = foods.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (food.price && food.price.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredFoods(results);
    setCurrentPage(1);
  }, [searchTerm, foods]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleChange = (e) => setSearchTerm(e.target.value);
  const goDetail = (id) => navigate(`/tasty-korea-detail/${id}`); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <S.Section>
      <S.SectionTitle>Tasty Korea</S.SectionTitle>

      <S.TabWrapper>
        {Object.keys(tabDataMap).map((tabKey) => (
          <S.TabButton
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            isActive={activeTab === tabKey}
          >
            {tabDataMap[tabKey].name}
          </S.TabButton>
        ))}
      </S.TabWrapper>

      <S.SearchWrapper>
        <S.SubTitle>{tabDataMap[activeTab].subtitle}</S.SubTitle>
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
              {food.price && <S.PlaceDesc>{food.price}</S.PlaceDesc>}
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

export default TastyKorea;