import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; // Убедитесь, что обновили путь к CSS файлу

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Отправка запроса к API для аутентификации пользователя
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            username: userData.username,
            password: userData.password,
        });

        console.log("Аутентификация прошла успешно, полученные данные:", response.data);

        // Сохранение access токена в localStorage
        localStorage.setItem('access_token', response.data.access); // Важно: сохраняем именно access токен

        navigate('/'); // Перенаправление на главную страницу после успешного входа
    } catch (error) {
        console.error('Ошибка входа:', error.response ? error.response.data : error);
        setErrorMessage('Ошибка входа. Неверное имя пользователя или пароль.');
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
