import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ArticleDetailPage.css';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/articles/${id}/`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => console.error('Error fetching article detail:', error));
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту статью?');
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/articles/${id}/delete/`)
        .then(() => {
          navigate('/articles/');
        })
        .catch(error => console.error('Error deleting article:', error));
    }
  };

  if (!article) {
    return <div className="loading">Loading...</div>;
  }

  const handleTagClick = (tagName) => {
    navigate(`/articles?article_tags__name=${tagName}`);
  };

  return (
    <div className="ad-container">
      <h2 className="ad-title">{article.title}</h2>
      <div className="ad-meta">
        <p className="ad-pub-date">Дата публикации: {new Date(article.pub_date).toLocaleString()}</p>
        <p className="ad-author">Автор: {article.author}</p>
      </div>
      <div className="ad-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>

      <div className="ad-tags">
        <h4>Теги:</h4>
        <ul>
          {article.tags.map(tag => (
            <li key={tag.id} className="ad-tag" onClick={() => handleTagClick(tag.name)}>
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="ad-buttons">
        <Link to={`/articles/${id}/update/`} className="ad-update-button">Обновить</Link>
        <button onClick={handleDelete} className="ad-delete-button">Удалить</button>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
