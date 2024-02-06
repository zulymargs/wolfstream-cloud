import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleHome = () => {
    navigate("/home");
  };

  const category = (value) => {
    // Do something with the selected category value
    console.log(value);
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/upload"; // Replace with your server URL

    const formDataToSend = new FormData();
    formDataToSend.append("videoFile", formData.file);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
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
                onChange={handleFileChange}
              />
              <br />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                onChange={handleChange}
              />
              <br />

              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                required
                onChange={handleChange}
              />
              <br />

              <label>Category:</label>
              <select
                name="category"
                className="category"
                onChange={(e) => category(e.target.value)}
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
