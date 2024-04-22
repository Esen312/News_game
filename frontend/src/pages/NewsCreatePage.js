import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Импорт стилей Quill
import './NewsCreatePage.css';

const NewsCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
    author: '',
    photo: null,
  });
  const quillRef = useRef(null); // Добавляем ссылку на Quill
  const [contentType, setContentType] = useState('news');

  const newsTags = [
    { id: '1', name: 'PC' },
    { id: '2', name: 'PlayStation 4' },
    { id: '3', name: 'Xbox One' },
    { id: '4', name: 'Киберспорт' },
    { id: '5', name: 'Фановые' },
    { id: '6', name: 'Кино' },
    { id: '7', name: 'Индустрия' },
    { id: '8', name: 'PlayStation 5' },
    { id: '9', name: 'Xbox Series X/S' },
    { id: '10', name: 'Stadia' },
    { id: '11', name: 'VR' },
    { id: '12', name: 'Nintendo Switch' },
    { id: '13', name: 'MMO/MMORPG' },
    { id: '14', name: 'Мобильные' },
    { id: '15', name: 'Социальные' },
    { id: '16', name: 'Железо' },
  ];

  const articleTags = [
    { id: '3', name: 'PC' },
    { id: '4', name: 'PlayStation 4' },
    { id: '5', name: 'Xbox One' },
    { id: '6', name: 'Киберспорт' },
    { id: '7', name: 'Фановые' },
    { id: '8', name: 'Кино' },
    { id: '9', name: 'Индустрия' },
    { id: '2', name: 'PlayStation 5' },
    { id: '11', name: 'Xbox Series X/S' },
    { id: '12', name: 'Stadia' },
    { id: '13', name: 'VR' },
    { id: '14', name: 'Nintendo Switch' },
    { id: '15', name: 'MMO/MMORPG' },
    { id: '16', name: 'Мобильные' },
    { id: '17', name: 'Социальные' },
    { id: '18', name: 'Железо' },
  ];

  const tagsToUse = contentType === 'news' ? newsTags : articleTags;

  const handleTagChange = (tagId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.includes(tagId)
        ? prevFormData.tags.filter((id) => id !== tagId)
        : [...prevFormData.tags, tagId],
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'photo' ? files[0] : value,
    }));
  };

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    for (const key in formData) {
      if (key === 'tags') {
        formData[key].forEach((value) => dataToSend.append(key, value));
      } else {
        dataToSend.append(key, formData[key]);
      }
    }
    const endpoint = contentType === 'news' ? 'news/create/' : 'articles/create/';
    axios.post(`http://127.0.0.1:8000/api/${endpoint}`, dataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.error('Error creating news:', error));
  };

  const triggerFileSelectPopup = () => document.getElementById('fileInput').click();

  // Инициализация Quill
  useEffect(() => {
    if (!quillRef.current) {
      const quillInstance = new Quill('#quill-container', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block']
          ],
        },
      });

      quillInstance.on('text-change', () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          content: quillInstance.root.innerHTML,
        }));
      });
      quillRef.current = quillInstance;
    }
  }, []);

  return (
    <div className="create-news-container">
      <h1 className="create-news-header">{contentType === 'news' ? 'Создай Новость' : 'Создай Статью'}</h1>
      <div className="select-container">
        <label htmlFor="content-type-select">Выберите тип содержимого:</label>
        <select
          id="content-type-select"
          value={contentType}
          onChange={handleContentTypeChange}
          className="content-type-select"
        >
          <option value="news">Новость</option>
          <option value="article">Статья</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="create-news-form" encType="multipart/form-data">
        <div>
          <label>Название</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="create-news-input"
          />
        </div>
        <div>
          <label>Контент</label>
          <div id="quill-container" ></div> {/* Контейнер для Quill */}
        </div>
        <div>
          <label>Автор</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="create-news-input"
          />
        </div>
        <div className="file-upload-container">
          <button type="button" onClick={triggerFileSelectPopup} className="file-upload-button">
            Выбрать обложку
          </button>
          <input
            type="file"
            id="fileInput"
            name="photo"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <span className="file-upload-text">{formData.photo ? formData.photo.name : 'Файл не выбран'}</span>
        </div>
        <div className="create-news-tags">
        <label>Теги:</label>
        <div className="checkbox-group">
          {tagsToUse.map((tag) => (
            <label key={tag.id} className="create-news-tag">
              <input
                type="checkbox"
                name="tags"
                value={tag.id}
                checked={formData.tags.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>
        <button type="submit" className="create-news-submit-button">Создать</button>
      </form>
    </div>
  );
};

export default NewsCreatePage;
