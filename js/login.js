//#########################################################//
//Login Normal
// Control para no dejar vacio los Input y formato de Email al Presionar Login
document.getElementById("button_login").onclick = function () {
email = document.getElementById("email").value;
passwd = document.getElementById("password").value;
formatoemail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
validoemail = document.getElementById('emailOK');
validopasswd = document.getElementById('passwOK');


 if( email == "" || passwd == "" ) {
  alert('Usuario y/o Contraseña No pueden estar Vacio!');
 }else if (!formatoemail.test(email) ) {
  validoemail.innerText = "Formato de email Incorrecto";
 }else if (passwd.length < 8) {
  validopasswd.innerText = "Formato Contraseña Invalido - Largo minimo 8 caracteres";
 }else {
  location.href = "../main.html";
 }
}
//#########################################################//


//#########################################################//
//Login de Google

function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);
  location.href = "main.html"
  
  //#########################################################//
  // Funciones para ver los datos del usuario Gmail en HTML
  //img.src = responsePayload.picture;
  //getName.innerHTML = responsePayload.name;
  //id.innerHTML = responsePayload.sub;
  //email.innerHTML = responsePayload.email;
  //container.style.display = 'inline-block';
  //googleButton.style.display = 'none'
  //#########################################################//
}

//#########################################################//
// Funciones para cargar el boton y la conexion con mi API de Google
window.onload = function () {
  google.accounts.id.initialize({
      client_id: "234182601925-p0np49m5bmjgt3fhnrsrf2rcs63c5sdc.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      auto_select: true,
      auto: true
  });
  google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "filled_blue", size: "medium", width: '200' }
  );
  //#########################################################//
  // Funcion para cargar cuentas logueadas en ventana flotante
  //google.accounts.id.prompt();
  //#########################################################// 
}
//#########################################################//


//#########################################################//
// Funcion para desifrar la respuesta del JSON
function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
//#########################################################//

//#########################################################//
//Funcion para cerrar sesion, la requiere el boton de login
function signOut() {
  google.accounts.id.disableAutoSelect();
  location.reload();
//#########################################################//  
}