import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Исправлено на Link
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
        axios.get(`http://127.0.0.1:8000/api/news/?search=${query}`)
            .then(response => {
                // Предполагаем, что ответ может содержать массив в ключе results
                // Если ответ прямо массив, используем его, иначе пытаемся использовать response.data.results
                const data = Array.isArray(response.data) ? response.data : response.data.results;
                setResults(data || []); // Устанавливаем пустой массив, если data undefined или null
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
                {results.map(news => (
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
        </div>
    );
};

export default SearchResults;
