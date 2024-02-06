import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Playback = () => {
  const { videoID } = useParams();
  const [video, setVideoDetails] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/playback/${videoID}`);
        if (response.ok) {
          const data = await response.json(); // video obj
          setVideoDetails(data);
        } else {
          console.error('Failed to fetch video details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [videoID]);

  return (
    <div>
      <h2>Video Details</h2>
      {video ? (
        <div>
          <h3>Title: {video.title}</h3>
          <video controls width="600" height="400">
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Description: {video.description}</p>
        </div>
      ) : (
        <p>Loading video details...</p>
      )}
    </div>
  );
};

export default Playback;
