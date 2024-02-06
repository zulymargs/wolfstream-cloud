import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Upload = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");

  const handleHome = () => {
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoData = {
      title,
      description,
      category,
      file,
    };
    console.log(videoData);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        console.log("File and video information uploaded successfully!");
        // Handle success, e.g., show a success message or redirect to another page
      } else {
        console.error("Failed to upload file and video information");
        // Handle error
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="contenedor" id="contenedor">
        <div className="container">
          <form
            id="upload"
            className="center"
            method="post"
            action="upload/uploaded"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>Upload new video</legend>
              <input
                type="file"
                name="videoFile"
                id="videoFile"
                accept=".mp4"
                required
                onChange={(e) => setFile(e.target.value)}
              />
              <br />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />

              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />

              <label>Category:</label>
              <select
                name="category"
                className="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="blank"></option>
                <option value="kids">Kids</option>
                <option value="sport">Sport</option>
                <option value="vehicles">Vehicles</option>
                <option value="music">Music</option>
              </select>
              <input
                type="submit"
                id="submit"
                name="submit"
                value="Add video"
                onClick={handleSubmit}
              />
              <input
                type="button"
                id="home"
                name="home"
                value="Home"
                onClick={handleHome}
              />
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;