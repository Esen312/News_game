import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NewsDetailPage from './pages/NewsDetailPage';
import NewsList from './components/NewsList';
import Register from './pages/Registration';
import Login from './pages/Login';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import NewsCreatePage from './pages/NewsCreatePage'; // Импортируем NewsCreatePage
import NewsUpdatePage from './pages/NewsUpdatePage'; // Импортируем NewsUpdatePage
import './App.css';

const App = () => {
  return (
    <Router>
     <div id="page-container">
      <NavBar /> {/* Верхняя навигационная панель */}
       <div id="content-wrap">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/create" element={<NewsCreatePage />} /> {/* Добавляем маршрут для создания новости */}
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/news/:id/update" element={<NewsUpdatePage />} /> {/* Добавляем маршрут для обновления новости */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />
        {/* ...другие маршруты... */}
      </Routes>
       </div>
        <Footer /> {/* Добавляем Footer внизу */}
      </div>
    </Router>
  );
};

export default App;
