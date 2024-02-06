const express = require("express");
const bodyParser = require("body-parser");
const user = express.Router();
const fs = require("fs");
const dbo = require("../db/conn"); //database
const cors = require("cors");
user.use(bodyParser.urlencoded({ extended: true }));
user.use(express.json());

// const ObjectId = require("mongodb").ObjectId;

const bcrypt = require("bcrypt"); //Initialize requirements for bcrypt password hashing
const saltRounds = 10; // Number of salt rounds for bcrypt hashing
/*------ POST: /login ------
- Handle data of existing user
- Verify if existing user in 
  user.json file
-------------------------*/
user.route("/login").post(async (req, res) => {
  let result = { success: "false", error: "ERROR", role: "viewer" };
  try {
    let username = req.body.username;
    let password = req.body.password;
    // console.log(username);
    // console.log(password);
    if (username != "" && password != "") {
      let db_connect = dbo.getDb("wolfstreamDB");
      const existingUser = await db_connect
        .collection("users")
        .findOne({ username, password });
      console.log(existingUser.userRole);
      let userExists =
        existingUser &&
        existingUser.username === username &&
        existingUser.password === password;
      if (userExists) {
        if (
          existingUser.userRole === "viewer" ||
          existingUser.userRole === "creator"
        ) {
          result.success = "true";
          result.role = existingUser.userRole;
          res.json(result);
        } else {
          result.error = "Invalid user role";
          res.json(result);
        }
      } else {
        result.error = "Invalid Username or password";
        res.json(result);
      }
    } else {
      result.error = "No username and password is provide";
      res.json(result);
    }
  } catch (error) {
    result.error = "Invalid JSON data";
    res.json(result);
  }
});

/*------ GET: /register ------
  - User can register
  - Render view
  -------------------------*/
user.route("/register").get(function (req, res) {
  res.render("register");
});

/*------ POST: /register ------
  - User can register
  - Render view
  -------------------------*/
user.route("/register").post(async (req, res) => {
  try {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let confirmPassword = req.body.confirmPassword;
    // console.log(confirmPassword);
    let userRole = req.body.userRole;
    // console.log(userRole);
    let result = { success: "false", error: "ERROR" };

    if (
      username != "" &&
      password != "" &&
      email != "" &&
      confirmPassword != "" &&
      userRole != ""
    ) {
      //Send an error message if email isn't in valid format
      if (!isEmail(email)) {
        result.error = "Invalid email input";
        res.json(result);
      } else {
        if (password !== confirmPassword) {
          console.log(password);
          console.log(confirmPassword);
          result.error = "Passwords do not match";
          res.json(result);
        } else {
          email = email.trim();
          password = password.trim();

          //Hash the password
          password = await hashPassword(password);
          //If user exists, send an error message
          let db_connect = dbo.getDb("wolfstreamDB");
          const existingUser = await db_connect
            .collection("users")
            .findOne({ $or: [{ username }, { email }] });

          if (existingUser) {
            result.error =
              "User with the same username or email already exists";
            res.json(result);
          } else {
            //If user doesn't exist, create that user in the DB's users collection
            const newUser = {
              username: username,
              password: password,
              email: email,
              userRole: userRole,
            };
            console.log("--------------newUser------------");
            console.log(newUser);
            let obj = await db_connect.collection("users").insertOne(newUser);
            result.success = true;
            console.log(obj);
            res.json(result);
            console.log("Account created!");
          }
        }
      }
    } else {
      result.error =
        "The username, email, password, confirmed password and user role can`t be empty";
      res.json(result);
    }
  } catch (error) {
    let result = { success: "false", error: "ERROR" };
    console.error("Error during registration:", error);
    result.error = "Registration failed";
    res.json(result);
  }
});

//esto funciona, just testing!!!!
user.route("/testing").get((req, res) => {
  let db_connect = dbo.getDb("wolfstreamDB");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//Function for verifying if a string is a valid email
function isEmail(email) {
  const emailChecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailChecker.test(email);
}

//Function for password hashing using bcrypt
async function hashPassword(password) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = user;
