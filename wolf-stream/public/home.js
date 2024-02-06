"use strict"
const $ = selector => document.querySelector(selector);

//const { response } = require("./controllers/homeController");
// Load the video data from the JSON file in the "data" folder

const comprobarAncho = () => {
	if(window.innerWidth <= 768){
		contenedor.classList.remove('active');
	} else {
		contenedor.classList.add('active');
	}
}

comprobarAncho();

window.addEventListener('resize', () => {
	comprobarAncho();
});


// active controls 
var vid = document.getElementsByClassName("video");

document.addEventListener("DOMContentLoaded", function () {

    for (let i = 0; i < vid.length; i++) {
        // activa el atributo constrols al poner el mouse sobre el video
        vid[i].addEventListener("mouseover", function () {
            this.setAttribute('controls', '');
        });

        // desactiva el atributo constrols al quitar el mouse sobre el video
        vid[i].addEventListener("mouseout", function () {
            this.removeAttribute('controls', '');
        });
      }
});


// search bar & category filter code 
function search_video(val) { 
    if(val)
        var input= val;
    else
	    var input = document.getElementById('searchbar').value 

	input=input.toLowerCase(); 
	let x = document.getElementsByClassName('video'); 
	let y = document.getElementsByClassName('tag'); 
	
	for (let i = 0; i < x.length; i++) { 
        //console.log(input); 
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display = "none"; 
        } 
        else { 
            x[i].style.display = "list-item ";                 
        } 
    } 
}

function category(par){
    if(par == 'category')
        search_video();
    else if(par == 'kids')
        search_video(par);
    else if(par == 'vehicles')
        search_video(par);
    else if(par == 'sport')
        search_video(par);
    else if(par == 'music')
        search_video(par);
    else
        search_video();
}


const upload =()=>{
    window.location.replace("http://localhost:3000/upload");  
    setTimeout("pageRedirect()", 10000);
};

document.addEventListener("DOMContentLoaded", () => {
    // hook up click events for both buttons
    // $("#submit").addEventListener("click", submit);
    $("#upload").addEventListener("click", upload);
});
