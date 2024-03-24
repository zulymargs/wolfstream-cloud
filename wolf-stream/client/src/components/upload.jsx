import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const navigate = useNavigate();

  const submit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    try {
      const response = await fetch('http://localhost:8000/upload/video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleHome = () => {
    navigate('/home');
  };

  const fileSelected = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="contenedor" id="contenedor">
      <div className="container">
        <form
          onSubmit={submit}
          id="upload"
          className="center"
          method="post"
          action="upload/uploaded"
          encType="multipart/form-data"
        >
          <fieldset>
            <legend>Upload new video</legend>
            <input onChange={fileSelected} type="file" accept=".mp4" />
            <br />
            <label htmlFor="title">Title:</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
            />
            <br />
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              required
              onChange={e => setDescription(e.target.value)}
            />
            <br />
            <label>Category:</label>
            <select
              name="category"
              className="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="blank"></option>
              <option value="kids">Kids</option>
              <option value="sport">Sport</option>
              <option value="vehicles">Vehicles</option>
              <option value="music">Music</option>
            </select>

            <input type="submit" id="submit" name="submit" value="Add video" />
            <input type="button" id="home" name="home" value="Home" onClick={handleHome} />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Upload;
