import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/news/${id}/`)
      .then(response => {
        setNews(response.data);
      })
      .catch(error => console.error('Error fetching news detail:', error));
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту новость?');
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/news/${id}/delete/`)
        .then(() => {
          navigate('/news/');
        })
        .catch(error => console.error('Error deleting news:', error));
    }
  };

  if (!news) {
    return <div className="loading">Loading...</div>;
  }

  const handleTagClick = (tagName) => {
  // Переход к списку новостей с выбранным тегом
  navigate(`/news?tags__name=${tagName}`);
};

  return (
    <div className="nd-container">
      <h2 className="nd-title">{news.title}</h2>
      <div className="nd-meta">
        <p className="nd-pub-date">Дата публикации: {new Date(news.pub_date).toLocaleString()}</p>
        <p className="nd-author">Автор: {news.author}</p>
      </div>
      <div className="nd-content" dangerouslySetInnerHTML={{ __html: news.content }}></div>

      <div className="nd-tags">
        <h4>Теги:</h4>
        <ul>
          {news.tags.map(tag => (
            <li key={tag.id} className="nd-tag" onClick={() => handleTagClick(tag.name)}>
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Кнопки Обновить и Удалить */}
      <div className="nd-buttons">
        <Link to={`/news/${id}/update/`} className="nd-update-button">Обновить</Link>
        <button onClick={handleDelete} className="nd-delete-button">Удалить</button>
      </div>
    </div>
  );
};

export default NewsDetailPage;
