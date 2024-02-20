import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './headerViewer'; // Import the Header component

const HomeViewer = () => {
  const contenedorRef = useRef(null);
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleResize = () => {
      setAnchoVentana(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch('http://localhost:8000/home/videos');
        const data = await response.json();
        setVideos(data);
        setFilteredVideos(data); // Initialize filteredVideos with all videos
      } catch (error) {
        console.error("Error fetching data from the database:", error);
      }
    };

    fetchDataFromDatabase();
  }, []);

  useEffect(() => {
    if (contenedorRef.current) {
      if (anchoVentana <= 768) {
        contenedorRef.current.classList.remove("active");
      } else {
        contenedorRef.current.classList.add("active");
      }
    }
  }, [anchoVentana]);

  const searchVideo = (val) => {
    const input = val ? val.toLowerCase() : '';
    let filtered;

    if (input.trim() === 'category' && selectedCategory === 'All') {
      filtered = videos;
    } else {
      filtered = videos.filter((video) => {
        const videoText = `${video.title} ${video.description} ${video.category.join(' ')}`;
        return (
          videoText.toLowerCase().includes(input) &&
          (selectedCategory === 'All' || video.category.includes(selectedCategory))
        );
      });
    }

    setFilteredVideos(filtered);
  };

  const handlePlayback = (videoId) => {
    console.log('Video ID:', videoId._id);
    navigate(`/playback/${videoId._id}`);
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div className="contenedor" ref={contenedorRef} style={{ height: '600px' }}>
        {/* Use the Header component */}
        <Header handleUpload={handleUpload} searchVideo={searchVideo} />

        <main className="main">
          <h3 className="titulo">Wolf Stream</h3>
          <div className="contenedor-logo">
            <select name="categorias" className="categorias" onChange={(e) => searchVideo(e.target.value)}>
              <option value="category">Categories</option>
              <option value="kids">Kids</option>
              <option value="sport">Sport</option>
              <option value="vehicles">Vehicles</option>
              <option value="music">Music</option>
            </select>
          </div>
          <div className="grid-videos">
            {filteredVideos.map((video) => (
              <div key={video._id} className="video" onClick={() => handlePlayback(video)}>
                <video poster={video.poster} className="video">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h4 className="title">{video.title}</h4>
              </div>
            ))}
          </div>
        </main>

        <footer>
          &#169; Group 3 and 4 <br /> Zulymar García, Eddy Figueroa, Ismael López, and Dereck Declet
        </footer>
      </div>
    </>
  );
};

export default HomeViewer;
