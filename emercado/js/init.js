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

function setArticuloID(id) {
  localStorage.setItem("artID", id);
  window.location = "product-info.html"
}

function verModal(id){
  $(document).ready(function(){
    $(id).modal({ backdrop: 'static', keyboard: false });
    $(id).modal('show');
  });
}

//#########################################################//
// Funciones para agregar campos de Profile/Login

let newidul = document.querySelector(".navbar-nav");
newidul.setAttribute('id','menu');

LocalEmail = localStorage.getItem("userlocal");
GoogleImg = localStorage.getItem("getImg");
NameGoogle = localStorage.getItem("getName");
GoogleEmail = localStorage.getItem("getEmail");

if(LocalEmail) {
let profilelocal = `
          <li class="nav-item dropdown" id="login">
            <a class="emaillocal nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown">
            ${LocalEmail}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="./cart.html">Mi Carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
              <li><a class="dropdown-item" onClick="signOut()">Cerrar sesion</a></li>
            </ul>
          </li>
        `
        document.getElementById("menu").innerHTML += profilelocal
}else if(GoogleEmail) {
let profilegoogle = `
          <li class="nav-item dropdown" id="login">
            <a class="emaillocal nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown">
            ${GoogleEmail}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><a class="dropdown-item" href="./cart.html">Mi Carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
                <li><a class="dropdown-item" onClick="signOut()">Cerrar sesion</a></li>
            </ul>
          </li>
       `
       document.getElementById("menu").innerHTML += profilegoogle
}else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Debe estar logueado para ver el contenido!',
    showConfirmButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Login',
    background: '#fff',
    backdrop: 'rgba(0,0,123,0.4)',
    allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
          location.href='./index.html'
      }
    })
}

//#########################################################//

//#########################################################//
//Funcion para cerrar sesion, la requiere el boton de login
function signOut() {
    localStorage.removeItem('userlocal');
    localStorage.removeItem('getName');
    localStorage.removeItem('getEmail');
    location.reload();
}
//#########################################################//