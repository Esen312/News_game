import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination'; // Убедитесь, что компонент Pagination существует
import './ArticleList.css'; // Путь к вашему CSS файлу для ArticleList

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTag, setSelectedTag] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagFromURL = params.get('article_tags__name');
    if (tagFromURL) {
      setSelectedTag(tagFromURL);
    }

    axios.get(`http://127.0.0.1:8000/api/articles/?${params}`)
      .then(response => {
        setArticles(response.data.results);
        const pageSize = response.data.page_size || 18;
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, [currentPage, selectedTag]);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    const params = new URLSearchParams();
    if (tag) {
      // Используйте 'article_tags__name' вместо 'tags__name'
      params.set('article_tags__name', tag);
    }
    params.set('page', 1);
    navigate(`?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(window.location.search);
    if (selectedTag) {
      params.set('article_tags__name', selectedTag);
    }
    params.set('page', page);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="article-list-container">
      <h2>Статьи</h2>
      <div className="tags-container">
        <span className={`article-tag ${selectedTag === '' ? 'active' : ''}`} onClick={() => handleTagSelect('')}>Все</span>
        <span className={`article-tag ${selectedTag === 'PC' ? 'active' : ''}`} onClick={() => handleTagSelect('PC')}>PC</span>
        <span className={`article-tag ${selectedTag === 'PlayStation 4' ? 'active' : ''}`} onClick={() => handleTagSelect('PlayStation 4')}>PlayStation 4</span>
        <span className={`article-tag ${selectedTag === 'PlayStation 5' ? 'active' : ''}`} onClick={() => handleTagSelect('PlayStation 5')}>PlayStation 5</span>
        <span className={`article-tag ${selectedTag === 'Xbox One' ? 'active' : ''}`} onClick={() => handleTagSelect('Xbox One')}>Xbox One</span>
        <span className={`article-tag ${selectedTag === 'Xbox Series X/S' ? 'active' : ''}`} onClick={() => handleTagSelect('Xbox Series X/S')}>Xbox Series X/S</span>
        <span className={`article-tag ${selectedTag === 'Киберспорт' ? 'active' : ''}`} onClick={() => handleTagSelect('Киберспорт')}>Киберспорт</span>
        <span className={`article-tag ${selectedTag === 'Фановые' ? 'active' : ''}`} onClick={() => handleTagSelect('Фановые')}>Фановые</span>
        <span className={`article-tag ${selectedTag === 'Кино' ? 'active' : ''}`} onClick={() => handleTagSelect('Кино')}>Кино</span>
        <span className={`article-tag ${selectedTag === 'Индустрия' ? 'active' : ''}`} onClick={() => handleTagSelect('Индустрия')}>Индустрия</span>
        <span className={`article-tag ${selectedTag === 'Stadia' ? 'active' : ''}`} onClick={() => handleTagSelect('Stadia')}>Stadia</span>
        <span className={`article-tag ${selectedTag === 'VR' ? 'active' : ''}`} onClick={() => handleTagSelect('VR')}>VR</span>
        <span className={`article-tag ${selectedTag === 'Nintendo Switch' ? 'active' : ''}`} onClick={() => handleTagSelect('Nintendo Switch')}>Nintendo Switch</span>
        <span className={`article-tag ${selectedTag === 'MMO/MMORPG' ? 'active' : ''}`} onClick={() => handleTagSelect('MMO/MMORPG')}>MMO/MMORPG</span>
        <span className={`article-tag ${selectedTag === 'Мобильные' ? 'active' : ''}`} onClick={() => handleTagSelect('Мобильные')}>Мобильные</span>
        <span className={`article-tag ${selectedTag === 'Социальные' ? 'active' : ''}`} onClick={() => handleTagSelect('Социальные')}>Социальные</span>
        <span className={`article-tag ${selectedTag === 'Железо' ? 'active' : ''}`} onClick={() => handleTagSelect('Железо')}>Железо</span>
      </div>
      <div className="article-container">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <img src={article.photo} alt={article.title} className="article-image" />
            <div className="article-info">
              <Link to={`/articles/${article.id}`} className="article-title">{article.title}</Link>
              <div className="article-meta">
                <span>{new Date(article.pub_date).toLocaleDateString()}</span>
                <p className="nd-author">Автор: {article.author}</p>
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

export default ArticleList;
