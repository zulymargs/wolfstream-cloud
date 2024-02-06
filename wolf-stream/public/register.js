"use strict"
const $ = selector => document.querySelector(selector);

// const signIn= ()=>{
//     if(validateRegi)//valid
//     {
//         const username = $("#createUserName").val();
//         const email = $("#email").val();
//         const password = $("#createPassword").val();
//         const userRole = $("#userRole").val();
//         var user = {};
//         user.username = username;
//         user.password = password;
//         user.email = email;
//         user.userRole = userRole;
//         user = JSON.stringify(user);
//         localStorage.setItem("user", user); //current user
//         console.log(localStorage.getItem("user"));
//         $("#register").submit(); 
//     }
// }

const logIn=()=>{
    window.location.replace("http://localhost:3000/login");  
    setTimeout("pageRedirect()", 10000);
}

// const validateRegi=()=>{
//     const messages = $("#signError");
//     const username = $("#createUserName").val();
//     const email = $("#email").val();
//     const psw = $("#createPassword").val();
//     const cpsw = $("#confirmPassword").val();
//     const userRole = $("#userRole").val();
//     const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;    

// /* Username validation */
//     if(username === ""){
//         messages.text("Username is required");
//         return;
//     }
//     if(username.length < 3){
//         messages.text("Username must be 3+ characters");
//         return;
//     }

// /* Email validation */
//     if(email === ""){
//         messages.text("Email is required");
//         return;
//     }
//     if(!pattern.test(email)){
//         messages.text("Invalid email.");
//         return;
//     }
// /* Password validation */
//     if(psw === ""){
//         messages.text("Password is required");
//         return;
//     }
//     if(psw.length < 3){
//         messages.text("Password must be 3+ character");
//         return;

//     }

// /* Password confirmation */
//     if(psw !== cpsw){
//         $("#pswMatch").text("Password dont match.");
//         return;
//     }

// /* Role validation */
//     if(userRole === "blank"){
//         messages.text("Select a user role.");
//         return;
//     }
//     return true;
// }


document.addEventListener("DOMContentLoaded", () => {
    // hook up click events for both buttons
    $("#log").addEventListener("click", logIn);
    // $("#sign").addEventListener("click", signIn);

});