import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Registration.css'; // Убедитесь, что создали и обновили CSS файл для Registration

const Registration = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      setErrorMessage('Пароли не совпадают.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/register/', userData);
      navigate('/'); // Перенаправление на главную страницу после успешной регистрации
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setErrorMessage('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="registration-page-container">
      <div className="registration-form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <h2 className="registration-form-title">Регистрация</h2>
          {errorMessage && <p className="registration-form-error">{errorMessage}</p>}
          {/* Форма регистрации */}
          <div className="form-group">
            <label htmlFor="first_name">Имя</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Фамилия</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="email">Электронная почта</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group registration-form-password-group">
            <label htmlFor="password">Пароль</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="registration-password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="form-group registration-form-password-group">
            <label htmlFor="password2">Подтвердите пароль</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              name="password2"
              value={userData.password2}
              onChange={handleChange}
              required
            />
            <button type="button" className="registration-password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn registration-form-submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
