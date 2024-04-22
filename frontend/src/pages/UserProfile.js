import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Токен должен быть сохранен в localStorage после входа в систему
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUser(response.data);
      } catch (error) {
        setError('Ошибка при загрузке данных пользователя.');
        console.error('Ошибка загрузки данных пользователя:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <h1>Личный кабинет</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <p><strong>Имя пользователя:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Имя:</strong> {user.first_name}</p>
          <p><strong>Фамилия:</strong> {user.last_name}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
