import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Playback = () => {
  const { videoID } = useParams();
  const [video, setVideoDetails] = useState(null);
  const [comments, setComment] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/social/${videoID}`);
        if (response.ok) {
          const data = await response.json();
          setLikes(data.likes);
        } else {
          console.error("Failed to fetch likes: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching likes: ", error);
      }
    };
    fetchLikes();
  }, []);

  const handleLikes = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/social/${videoID}/like`, {
        method: "POST",
      });
      setLikes(likes + 1);
      console.log(likes);
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleComments = async (e) => {
    e.preventDefault();

    let comment = {
      comments,
    };
    console.log(comments);
  };
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/playback/${videoID}`
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json(); // video obj
          setVideoDetails(data);
        } else {
          console.error("Failed to fetch video details:", response.status);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
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
      <form action="">
        <label htmlFor="text">Comment: </label>
        <input
          type="text"
          name="comment"
          id="comment"
          value={comments}
          onChange={(e) => setComment(e.target.value)}
        />
        <input
          type="submit"
          id="submit"
          value={"submit"}
          onClick={handleComments}
        />
      </form>
      <input
        type="button"
        name="like"
        id="like"
        value={`Likes: ${likes}`}
        onClick={handleLikes}
      />
    </div>
  );
};

export default Playback;
