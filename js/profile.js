//#########################################################//
// Funciones para guardar los datos de usuario Google en la pagina principal

var emaillocal = document.getElementsByClassName('emaillocal')[0];
emaillocal.innerHTML = localStorage.getItem("userlocal");

//#########################################################//
// Funciones para guardar los datos de usuario Google en la pagina principal

var imggoogle = document.getElementsByClassName('img')[0];
var getNamegoogle = document.getElementsByClassName('name')[0];
var emailgoogle = document.getElementsByClassName('email')[0];

imggoogle.src = localStorage.getItem("getImg");
getNamegoogle.innerHTML = localStorage.getItem("getName");
emailgoogle.innerHTML = localStorage.getItem("getEmail");

//#########################################################//