"use strict"
$(document).ready(async () => {
    const log = $("#login");
    const register = $("#register");

/* which form we want to show first */
    register.show();
    log.hide();

/* Event for moving between register and log */
    $("#log").click(function(e) {
        e.preventDefault(); /* Stops the tab from refreshing */
        register.hide();
        log.show();
    });
    $("#signIn").click(function(e) {
        e.preventDefault();  /* Stops the tab from refreshing */
        log.hide();
        register.show();
    });
    $("#sign").click(function(e) {
        e.preventDefault();
        if(validateRegi()){
            const username = $("#createUserName").val();
            const email = $("#email").val();
            const psw = $("#createPassword").val();
            const userRole = $("#userRole").val();
            var user = {};
            user.username = username;
            user.email = email;
            user.psw = psw;
            user.role = userRole;
            user = JSON.stringify(user);
            localStorage.setItem("user", user);
            console.log(localStorage.getItem("user"));
        }
    })

    $("#submit").click(function(e) {
        e.preventDefault();
        if(validateLog()){
            console.log(true);
            /* Aqui entraria al main */
        }
    })
});

function validateLog() {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = $("#username").val();
    const psw = $("#password").val();
    const messages = $("#logError");
    // console.log(user);

    if(username === ""){
        messages.text("Username cannot be empty.");
        return;
    }
    if(username !== user.username){
        messages.text("Invalid username.");
        return;
    }
    if(psw === ""){
        messages.text("password cannot be empty.");
        return;
    }
    if(psw !== user.psw){
        messages.text("Invalid password.");
        return;
    }
    return true;
}

function validateRegi(){
    const messages = $("#signError");
    const username = $("#createUserName").val();
    const email = $("#email").val();
    const psw = $("#createPassword").val();
    const cpsw = $("#confirmPassword").val();
    const userRole = $("#userRole").val();
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;    
/* Username validation */

    if(username === ""){
        messages.text("Username is required");
        return;
    }
    if(username.length < 3){
        messages.text("Username must be 3+ characters");
        return;
    }

/* Email validation */
    if(email === ""){
        messages.text("Email is required");
        return;
    }
    if(!pattern.test(email)){
        messages.text("Invalid email.");
        return;
    }
/* Password validation */
    if(psw === ""){
        messages.text("Password is required");
        return;
    }
    if(psw.length < 3){
        messages.text("Password must be 3+ character");
        return;

    }

/* Password confirmation */
    if(psw !== cpsw){
        $("#pswMatch").text("Password dont match.");
        return;
    }

/* Role validation */
    if(userRole === "blank"){
        messages.text("Select a user role.");
        return;
    }
    return true;
}


