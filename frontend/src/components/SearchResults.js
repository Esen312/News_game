import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import './NewsList.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            // Одновременно выполняем запросы для новостей и статей
            Promise.all([
                axios.get(`http://127.0.0.1:8000/api/news/?search=${query}`),
                axios.get(`http://127.0.0.1:8000/api/articles/?search=${query}`)
            ])
            .then(([newsResponse, articlesResponse]) => {
                // Объединяем результаты новостей и статей
                const newsData = Array.isArray(newsResponse.data) ? newsResponse.data : newsResponse.data.results;
                const articlesData = Array.isArray(articlesResponse.data) ? articlesResponse.data : articlesResponse.data.results;
                setResults([...(newsData || []), ...(articlesData || [])]);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка поиска:', error);
                setLoading(false);
            });
        }
    }, [query]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="news-list-container">
            <h2>Результаты поиска для "{query}"</h2>
            <div className="news-container">
                {results.map(item => (
                    <div key={item.id} className="news-card">
                        <img src={item.photo} alt={item.title} className="news-image" />
                        <div className="news-info">
                            {/* Используйте item.type для определения типа элемента (новость или статья) и настройте маршрут соответственно */}
                            <Link to={`/${item.type === 'news' ? 'news' : 'articles'}/${item.id}`} className="news-title">{item.title}</Link>
                            <div className="news-meta">
                                <span>{new Date(item.pub_date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
