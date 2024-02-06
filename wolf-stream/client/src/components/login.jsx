import React, { useState } from "react";
/* Hook that allows you to navigate to different routes */
import { useNavigate } from "react-router-dom";
const Login = () => {
  /* useNavigate returns a function to navigate to the different routes */
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let loginData = {
      username,
      password,
    };
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      console.log(loginData);
      const result = await response.json();
      console.log(result.role);
      if (result.role === "viewer") {
        navigate("/homeViewer");
        console.log("login successful in viewer");
      } else {
        navigate("/home");
        console.error("login successful in creator");
      }
    } catch (error) {
      console.error("error during login: ", error.message);
    }
  };
  const handleSignIn = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="container">
        <h1>Wolf-Stream</h1>
        <form id="login" className="center" method="post" action="/login">
          <fieldset>
            <legend>Login</legend>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" id="submit" onClick={handleLogin} />
            <input
              type="button"
              id="signIn"
              value="Sign In"
              onClick={handleSignIn}
            />
          </fieldset>
          <div id="logError"></div>
        </form>
      </div>
    </>
  );
};

export default Login;
