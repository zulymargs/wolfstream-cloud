//  import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // We import all the components we need in our app
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import HomeViewer from "./components/homeViewer";
import Upload from "./components/upload";
import Playback from "./components/playback"
// We use Route in order to define the different routes of our application

// import axios from "axios";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeViewer" element={<HomeViewer />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/playback/:videoId" element={<Playback />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
