import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Pagination from './Pagination'; // Убедитесь, что Pagination компонент существует
import './NewsList.css'; // Путь к вашему CSS файлу для NewsList

const NewsList = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTag, setSelectedTag] = useState(''); // Добавлено состояние для выбранного тега
  const navigate = useNavigate();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tagFromURL = params.get('tags__name');
  if (tagFromURL) {
    setSelectedTag(tagFromURL);
  }

  axios.get(`http://127.0.0.1:8000/api/news/?${params}`)
    .then(response => {
      setNewsItems(response.data.results);
      const pageSize = response.data.page_size || 18; // Используйте стандартный размер страницы, если API его не предоставляет
      setTotalPages(Math.ceil(response.data.count / pageSize));
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}, [currentPage, selectedTag]);;

  const handleTagSelect = (tag) => {
  setSelectedTag(tag);
  setCurrentPage(1); // Сбросить текущую страницу при смене тега
  const params = new URLSearchParams();
  if (tag) {
    params.set('tags__name', tag);
  }
  params.set('page', 1); // Сбросить страницу на 1 при смене тега
  navigate(`?${params.toString()}`); // Обновление URL с новыми параметрами
};

  const handlePageChange = (page) => {
  setCurrentPage(page);
  const params = new URLSearchParams(window.location.search);
  if (selectedTag) {
    params.set('tags__name', selectedTag);
  }
  params.set('page', page);
  navigate(`?${params.toString()}`);
};

  return (
    <div className="news-list-container">
      <h2>Игровые новости</h2>
      <div className="tags-container">
        {/* Обработчики кликов теперь вызывают handleTagSelect с соответствующим тегом */}
        <span className={`news-tag ${selectedTag === '' ? 'active' : ''}`} onClick={() => handleTagSelect('')}>Все</span>
        <span className={`news-tag ${selectedTag === 'PC' ? 'active' : ''}`} onClick={() => handleTagSelect('PC')}>PC</span>
        <span className={`news-tag ${selectedTag === 'PlayStation 4' ? 'active' : ''}`} onClick={() => handleTagSelect('PlayStation 4')}>PlayStation 4</span>
        <span className={`news-tag ${selectedTag === 'PlayStation 5' ? 'active' : ''}`} onClick={() => handleTagSelect('PlayStation 5')}>PlayStation 5</span>
        <span className={`news-tag ${selectedTag === 'Xbox One' ? 'active' : ''}`} onClick={() => handleTagSelect('Xbox One')}>Xbox One</span>
        <span className={`news-tag ${selectedTag === 'Xbox Series X/S' ? 'active' : ''}`} onClick={() => handleTagSelect('Xbox Series X/S')}>Xbox Series X/S</span>
        <span className={`news-tag ${selectedTag === 'Киберспорт' ? 'active' : ''}`} onClick={() => handleTagSelect('Киберспорт')}>Киберспорт</span>
        <span className={`news-tag ${selectedTag === 'Фановые' ? 'active' : ''}`} onClick={() => handleTagSelect('Фановые')}>Фановые</span>
        <span className={`news-tag ${selectedTag === 'Кино' ? 'active' : ''}`} onClick={() => handleTagSelect('Кино')}>Кино</span>
        <span className={`news-tag ${selectedTag === 'Индустрия' ? 'active' : ''}`} onClick={() => handleTagSelect('Индустрия')}>Индустрия</span>
        <span className={`news-tag ${selectedTag === 'Stadia' ? 'active' : ''}`} onClick={() => handleTagSelect('Stadia')}>Stadia</span>
        <span className={`news-tag ${selectedTag === 'VR' ? 'active' : ''}`} onClick={() => handleTagSelect('VR')}>VR</span>
        <span className={`news-tag ${selectedTag === 'Nintendo Switch' ? 'active' : ''}`} onClick={() => handleTagSelect('Nintendo Switch')}>Nintendo Switch</span>
        <span className={`news-tag ${selectedTag === 'MMO/MMORPG' ? 'active' : ''}`} onClick={() => handleTagSelect('MMO/MMORPG')}>MMO/MMORPG</span>
        <span className={`news-tag ${selectedTag === 'Мобильные' ? 'active' : ''}`} onClick={() => handleTagSelect('Мобильные')}>Мобильные</span>
        <span className={`news-tag ${selectedTag === 'Социальные' ? 'active' : ''}`} onClick={() => handleTagSelect('Социальные')}>Социальные</span>
        <span className={`news-tag ${selectedTag === 'Железо' ? 'active' : ''}`} onClick={() => handleTagSelect('Железо')}>Железо</span>
      </div>
      <div className="news-container">
        {newsItems.map(news => (
          <div key={news.id} className="news-card">
            <img src={news.photo} alt={news.title} className="news-image" />
            <div className="news-info">
              <Link to={`/news/${news.id}`} className="news-title">{news.title}</Link>
              <div className="news-meta">
                <span>{new Date(news.pub_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NewsList;