// Header.js

import React from 'react';

const Header = ({ handleUpload, searchVideo }) => {
  return (
    <header className="header">
      <div className="botones-header">
        <a href="#" className="avatar">
          <img src="Fotos/guest-user.jpg" alt="perfil" />
        </a>
        <a href="">
          <button id="home">
            <span className="material-symbols-outlined">home</span>
          </button>
        </a>
        <a href="#">
          <button id="upload" onClick={handleUpload}>
            <span className="material-symbols-outlined">upload</span>
          </button>
        </a>
      </div>

      <div className="barra-busqueda">
        <input
          id="searchbar"
          onChange={(e) => searchVideo(e.target.value)}
          type="text"
          name="search"
          placeholder="Search"
        />
      </div>

      
    </header>
  );
};

export default Header;
