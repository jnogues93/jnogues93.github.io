const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//#########################################################//
// Funciones para agregar campos de Profile/Login

let newidul = document.querySelector(".navbar-nav");
newidul.setAttribute('id','menu');

LocalEmail = localStorage.getItem("userlocal");
//imggoogle.src = localStorage.getItem("getImg");
NameGoogle = localStorage.getItem("getName");
GoogleEmail = localStorage.getItem("getEmail");

if(LocalEmail) {
let profilelocal = `
          <li class="nav-item" id="login">
            <div class="emaillocal text-light">${LocalEmail}</div>
            <div class="text-light"><button onClick="signOut()">Sign Out</button></div>
          </li>
        `
        document.getElementById("menu").innerHTML += profilelocal
}else if(GoogleEmail) {
let profilegoogle = `
          <li class="nav-item" id="login">
            <div class="name text-light">${NameGoogle}</div>
            <div class="email text-light">${GoogleEmail}</div>
            <div class="text-light"><button onClick="signOut()">Sign Out</button></div>
          </li>
       `
       document.getElementById("menu").innerHTML += profilegoogle
}

//#########################################################//

//#########################################################//
//Funcion para cerrar sesion, la requiere el boton de login
let login =  document.getElementById("login");
function signOut() {
    localStorage.removeItem('userlocal');
    localStorage.removeItem('getName');
    localStorage.removeItem('getEmail');
    location.href = "index.html";
    //location.reload();
}
//#########################################################//