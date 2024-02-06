"use strict";
const $ = (selector) => document.querySelector(selector);

/* Event for moving between register and log */

const signIn = () => {
  window.location.replace("http://localhost:3000/register");
  setTimeout("pageRedirect()", 10000);
};

// const submit=()=>{
// const user = JSON.parse(localStorage.getItem("user"));
// const username = $("#username").value;
// const psw = $("#password").value;
// const messages = $("#logError");

// let isValid=true;
// // console.log(user);

// if(username === ""){
//     messages.text("Username cannot be empty.");
//     isValid=false;
// }
// if(username !== user.username){
//     messages.text("Invalid username.");
//     isValid=false;
// }
// if(psw === ""){
//     messages.text("password cannot be empty.");
//     isValid=false;
// }
// if(psw !== user.psw){
//     messages.text("Invalid password.");
//     isValid=false;
// }
// if(isValid){
//     console.log("VALID");
// $("#register").submit();
// }

// }

// const validateLog=() =>{
//     const user = JSON.parse(localStorage.getItem("user"));
//     const username = $("#username").val();
//     const psw = $("#password").val();
//     const messages = $("#logError");
//     // console.log(user);

//     if(username === ""){
//         messages.text("Username cannot be empty.");
//         return;
//     }
//     if(username !== user.username){
//         messages.text("Invalid username.");
//         return;
//     }
//     if(psw === ""){
//         messages.text("password cannot be empty.");
//         return;
//     }
//     if(psw !== user.psw){
//         messages.text("Invalid password.");
//         return;
//     }
//     return true;
// }

$("#submit").addEventListener("click", function () {
  var user = $("#username").value;
  user = JSON.stringify(user);
  localStorage.setItem("username", user);
});

document.addEventListener("DOMContentLoaded", () => {
  // hook up click events for both buttons
  // $("#submit").addEventListener("click", submit);
  $("#signIn").addEventListener("click", signIn);
});
