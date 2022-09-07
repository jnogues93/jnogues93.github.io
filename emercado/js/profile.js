//#########################################################//
// Funciones para guardar los datos de usuario Google en la pagina principal

var emaillocal = document.getElementsByClassName('emaillocal')[0];
emailProfilelocal = emaillocal.innerHTML = localStorage.getItem("userlocal");

//#########################################################//
// Funciones para guardar los datos de usuario Google en la pagina principal

var imggoogle = document.getElementsByClassName('img')[0];
var getNamegoogle = document.getElementsByClassName('name')[0];
var emailgoogle = document.getElementsByClassName('email')[0];

imggoogle.src = localStorage.getItem("getImg");
getNamegoogle.innerHTML = localStorage.getItem("getName");
emailgoogle.innerHTML = localStorage.getItem("getEmail");

imgProfile = imggoogle.src = localStorage.getItem("getImg");
nameProfile = getNamegoogle.innerHTML = localStorage.getItem("getName");
emailProfile =emailgoogle.innerHTML = localStorage.getItem("getEmail");

document.getElementById("profile").innerHTML = profile;

profile += `
            <div class="emaillocal text-light">${emailProfilelocal}</div>
            <!--<img class="img" style="max-height:75px;width:130px;">
            <div class="name text-light">${nameProfile}</div>-->
            <div class="email text-light">${emailProfile}</div>
            <div class="text-light"><button onClick="signOut()">Sign Out</button></div>
        `

//#########################################################//

//#########################################################//
//Funcion para cerrar sesion, la requiere el boton de login
function signOut() {
    google.accounts.id.disableAutoSelect();
    location.reload();
}
//#########################################################//