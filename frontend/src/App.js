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

import NewsCreatePage from './pages/NewsCreatePage';
import NewsUpdatePage from './pages/NewsUpdatePage';

import ArticleList from './components/ArticleList';
import ArticleDetailPage from './pages/ArticleDetailPage';

import ArticleUpdatePage from './pages/ArticleUpdatePage';

import UserProfile from './pages/UserProfile';

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
        <Route path="/news/:id" element={<NewsDetailPage />} />

        <Route path="/news/create" element={<NewsCreatePage />} />
        <Route path="/news/:id/update" element={<NewsUpdatePage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/search" element={<SearchResults />} />

        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />

        <Route path="/articles/:id/update" element={<ArticleUpdatePage />} />

        <Route path="/userprofile" element={<UserProfile />} />

      </Routes>
       </div>
        <Footer /> {/* Добавляем Footer внизу */}
      </div>
    </Router>
  );
};

export default App;
