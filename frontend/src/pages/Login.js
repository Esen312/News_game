import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

axios.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        localStorage.setItem('access_token', data.access);
        config.headers['Authorization'] = 'Bearer ' + data.access;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
async function refreshToken() {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login/refresh/', {
      refresh: localStorage.getItem('refresh_token')
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    throw new Error("Session expired, please login again");
  }
}

const Login = () => {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            username: userData.username,
            password: userData.password,
        });

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh); // Сохранение refresh токена

        navigate('/'); // Перенаправление на главную страницу после успешного входа
    } catch (error) {
        console.error('Ошибка входа:', error.response ? error.response.data : error);
        setErrorMessage('Ошибка входа. Неверное имя пользователя или пароль.');
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        await refreshToken(); // Проверка и обновление токена при загрузке
      } catch {
        navigate('/login'); // Перенаправление на страницу входа, если сессия истекла
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-form-title">Вход в систему</h2>
          {errorMessage && <p className="login-form-error">{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group login-form-password-group">
            <label htmlFor="password">Пароль</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="login-password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn login-form-submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
