import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Импорт стилей Quill
import './ArticleUpdatePage.css';
import UploadIcon from '@mui/icons-material/Upload';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';

const ArticleUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
    author: '',
    photo: null,
  });
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const quillRef = useRef(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/articles/${id}/`)
      .then(response => {
        const { title, content, tags, author, photo } = response.data;
        setFormData({
          title,
          content,
          tags: tags.map(tag => tag.id.toString()),
          author,
        });
        setCurrentPhoto(photo);
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
            setFormData(prevFormData => ({
              ...prevFormData,
              content: quillInstance.root.innerHTML,
            }));
          });
          quillRef.current = quillInstance;
        }
        quillRef.current.root.innerHTML = content;
      })
      .catch(error => console.error('Error fetching article detail:', error));

     axios.get('http://127.0.0.1:8000/api/article-tags/')
    .then(response => {
      // Используйте response.data.results для обновления состояния
      setTagsFromAPI(response.data.results);
    })
    .catch(error => console.error('Error fetching tags:', error));
}, [id, setTagsFromAPI]);

  const handleTagChange = (tagId) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tags: prevFormData.tags.includes(tagId)
        ? prevFormData.tags.filter(id => id !== tagId)
        : [...prevFormData.tags, tagId],
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'photo' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    for (const key in formData) {
      if (key === 'tags') {
        formData[key].forEach(value => dataToSend.append('tags', value));
      } else {
        dataToSend.append(key, formData[key]);
      }
    }

    if (formData.photo instanceof File) {
      dataToSend.append('photo', formData.photo);
    }

    axios.put(`http://127.0.0.1:8000/api/articles/${id}/update/`, dataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => navigate(`/articles/${id}`))
      .catch(error => console.error('Error updating article:', error));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить эту статью?');
    if (confirmDelete) {
      axios.delete(`http://127.0.0.1:8000/api/articles/${id}/delete/`)
        .then(() => navigate('/'))
        .catch(error => console.error('Error deleting article:', error));
    }
  };

  const triggerFileSelectPopup = () => document.getElementById('fileInput').click();


  return (
    <div className="update-article-container">
      <h1 className="update-article-header">Обнови Статью</h1>
      <form onSubmit={handleSubmit} className="update-article-form" encType="multipart/form-data">
        <div>
          <label>Название</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="update-article-input"
          />
        </div>
        <div>
          <label>Контент</label>
          <div id="quill-container"></div> {/* Контейнер для Quill */}
        </div>
        <div>
          <label>Автор</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="update-article-input"
          />
        </div>
        {currentPhoto && (
          <div className="current-photo-container">
            <label>Обложка Сейчас</label>
            <img src={currentPhoto} alt="Current" className="current-article-image" />
          </div>
        )}
        <div className="file-upload-container">
          <button type="button" onClick={triggerFileSelectPopup} className="file-upload-button">
            <UploadIcon /> Выбрать новую обложку
          </button>
          <input
            id="fileInput"
            type="file"
            name="photo"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <span className="file-upload-text">{formData.photo ? formData.photo.name : 'Файл не выбран'}</span>
        </div>
        <div className="update-article-tags">
        <label>Теги:</label>
        <div className="checkbox-group">
          {tagsFromAPI.map(tag => ( // Используем tagsFromAPI для отрисовки чекбоксов тегов
            <label key={tag.id} className="update-article-tag">
              <input
                type="checkbox"
                name="tags"
                value={tag.id}
                checked={formData.tags.includes(tag.id.toString())}
                onChange={() => handleTagChange(tag.id.toString())}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>
        <button type="submit" className="submit-button">
          <SaveAltIcon /> Сохранить
        </button>
        <button type="button" onClick={handleDelete} className="delete-button">
          <DeleteIcon /> Удалить
        </button>
      </form>
    </div>
  );
};

export default ArticleUpdatePage;
