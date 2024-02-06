import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const HomeViewer = () => {

  const contenedorRef = useRef(null);
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setAnchoVentana(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Simulando la obtención de datos desde una base de datos
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch('http://localhost8000/home'); // Reemplaza 'URL_DEL_BACKEND' con la URL real de tu endpoint en el backend
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching data from the database:', error);
      }
    };


    fetchDataFromDatabase();
  }, []);

  useEffect(() => {
    if (contenedorRef.current) {
      if (anchoVentana <= 768) {
        contenedorRef.current.classList.remove('active');
      } else {
        contenedorRef.current.classList.add('active');
      }
    }
  }, [anchoVentana]);


  // search bar & category filter code

  const searchVideo = (val) => {
    const input = val || document.getElementById("searchbar").value;
    const x = document.getElementsByClassName("video");

    for (let i = 0; i < x.length; i++) {
      // Obtén el texto del elemento excluyendo los elementos h4 y p
      const videoText = Array.from(x[i].childNodes)
        .filter((node) => node.nodeName !== "H4" && node.nodeName !== "P")
        .map((node) => node.textContent.toLowerCase())
        .join(" ");

      // Compara el texto con la entrada del usuario
      if (!videoText.includes(input.toLowerCase())) {
        x[i].style.display = "none";
      } else {
        x[i].style.display = "list-item";
      }
    }
  };

  const category = (par) => {
    if (par === "category") {
      searchVideo();
    } else if (
      par === "kids" ||
      par === "vehicles" ||
      par === "sport" ||
      par === "music"
    ) {
      searchVideo(par);
    } else {
      searchVideo();
    }
  };

  const handlePlayback = (videoId) => {
    navigate(`/playback/${videoId}`);
  };


  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />


      <div className="contenedor" ref={contenedorRef} style={{ height: '600px' }}>
        <header className="header">
          <div className="botones-header">
            <a href="#" className="avatar"><img src="Fotos/guest-user.jpg" alt="perfil" /></a>
            <a href=""><button id="home"><span className="material-symbols-outlined">home</span></button></a>
            <a href="#"><button id="upload"><span className="material-symbols-outlined">upload</span></button></a>
          </div>

          <div className="barra-busqueda">
            <input
              id="searchbar"
              onChange={() => searchVideo()}
              type="text"
              name="search"
              placeholder="Search"
            />
          </div>

          <div className="contenedor-logo">
            <select name="categorias" className="categorias" onChange={(e) => category(e.target.value)}>
              <option value="category">Categories</option>
              <option value="kids">Kids</option>
              <option value="sport">Sport</option>
              <option value="vehicles">Vehicles</option>
              <option value="music">Music</option>
            </select>
          </div>

        </header>

        <main className="main">
          <h3 className="titulo">Main Page</h3>
          <div className="grid-videos">
            {/* Dynamic rendering of videos */}
            {videos.map((video) => (
              <a key={video._id} onClick={handlePlayback(video._id)} className="video">
                <video poster={video.poster} className="video">
                  <source src={video.src} type="video/mp4" />
                  Tu navegador no admite el elemento de video.
                </video>
                <h4 className="title">{video.title}</h4>
              </a>
            ))}
          </div>
        </main>

        <footer>
          &#169; Group 3 and 4 <br /> Zulymar García, Eddy Figueroa, Ismael
          López and Dereck Declet
        </footer>
      </div>
    </>
  );
};

export default HomeViewer;

//  <a href="playback.html?video_id=1" className="video"><video poster="Fotos/manSurfing.PNG"  className="video" >sport surf</video><h4 className="title">Man Surfing</h4></a>
//             <a href="playback.html?video_id=2" className="video"><video poster="Fotos/motocross.PNG"  className="video">sports vehicles motorcycle bikes</video><h4 className="title">Mountain Motocross</h4></a>
//             <a href="playback.html?video_id=3" className="video"><video poster="Fotos/bicicleta.PNG"  className="video">sports vehicles bicycle bikes</video><h4 className="title">Bicycle street run </h4></a>
//             <a href="playback.html?video_id=4" className="video"><video poster="Fotos/futbol1.PNG"  className="video">sports futbol</video><h4 className="title">Free kick</h4></a>
//             <a href="playback.html?video_id=5" className="video"><video poster="Fotos/cars1.PNG"  className="video">vehicles cars</video><h4 className="title">Luxury Cars</h4></a>
//             <a href="playback.html?video_id=6" className="video"><video poster="Fotos/cars2.PNG"  className="video">vehicles cars</video><h4 className="title">McLaren MP4</h4></a>
//             <a href="playback.html?video_id=7" className="video"><video poster="Fotos/kids1.PNG"  className="video">kids </video><h4 className="title">Kids study</h4></a>
//             <a href="playback.html?video_id=8" className="video"><video poster="Fotos/basket.PNG"  className="video">sports basketball</video><h4 className="title">Basketball practice</h4></a>
//             <a href="playback.html?video_id=9" className="video"><video poster="Fotos/kids2.PNG"  className="video">kids music</video><h4 className="title">Kid playing drums</h4></a>
//             <a href="playback.html?video_id=10" className="video"><video poster="Fotos/kids3.PNG" className="video">kids</video><h4 className="title">Birthday Party</h4></a>
//             <a href="playback.html?video_id=11" className="video"><video poster="Fotos/cars3.PNG" className="video">vehicles cars</video><h4 className="title">Run in dunes</h4></a>
//             <a href="playback.html?video_id=12" className="video"><video poster="Fotos/skyDiving.PNG" className="video">sports skydiving</video><h4 className="title">Sky Diving</h4></a>
//             <a href="playback.html?video_id=13" className="video"><video poster="Fotos/baseball.PNG" className="video">sports baseball </video><h4 className="title">Baseball Park</h4></a>
//             <a href="playback.html?video_id=14" className="video"><video poster="Fotos/futbol2.PNG" className="video">sports futbol </video><h4 className="title">Futbol Stadium</h4></a>
//             <a href="playback.html?video_id=15" className="video"><video poster="Fotos/motocross2.PNG" className="video">sports vehicles motorcycle bikes</video><h4 className="title">Circuit Motocross</h4></a>
//             <a href="playback.html?video_id=16" className="video"><video poster="Fotos/tenis.PNG" className="video">sports tennis</video><h4 className="title">Tennis game</h4></a>
//             <a href="playback.html?video_id=17" className="video"><video poster="Fotos/futbol3.PNG" className="video">sports futbol</video><h4 className="title">Futbol sky shot</h4></a>
//             <a href="playback.html?video_id=18" className="video"><video poster="Fotos/bike.PNG" className="video">vehicles motorcycle bikes</video><h4 className="title">Motorcycle run</h4></a>
//             <a href="playback.html?video_id=19" className="video"><video poster="Fotos/kids4.PNG" className="video">kids</video><h4 className="title">Raining Day</h4></a>
//             <a href="playback.html?video_id=20" className="video"><video poster="Fotos/arrow.PNG" className="video">sports bow and arrow</video><h4 className="title">Bow & Arrow shot</h4></a>