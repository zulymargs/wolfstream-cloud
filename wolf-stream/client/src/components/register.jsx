/* Hook that allows you to navigate to different routes */
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate =
    useNavigate(); /* useNavigate returns a function to navigate to the different routes */

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      username,
      password,
      confirmPassword,
      email,
      userRole,
    };

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      console.log("RESULT");
      console.log(result);

      if (result.success) {
        // Registration successful, navigate to a success page or another route
        navigate("/home");
      } else {
        console.log("AAA");
        // Registration failed, handle the error (display a message, etc.)
        // console.error(result.error); //!!!!!!!!!!!!!!!
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Wolf-Stream</h1>
        <form
          id="register"
          className="center"
          onSubmit={handleSubmit}
          action="/register"
        >
          <fieldset>
            <legend>Register</legend>
            <label>Create username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Create password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div id="pswMatch"></div>
            <label>User Role:</label>
            <select
              id="userRole"
              className="userRole"
              name="userRole"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="blank"></option>
              <option value="creator">Content Creator</option>
              <option value="viewer">Viewer</option>
            </select>
            <input
              type="submit"
              id="sign"
              value="submit"
              onClick={handleSubmit}
            />
            <input
              type="button"
              id="log"
              value="Log in"
              onClick={handleLogin}
            />
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Register;
