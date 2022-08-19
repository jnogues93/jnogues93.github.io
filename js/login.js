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

//Boton para login de Google
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  //var id_token = googleUser.getAuthResponse().id_token;
  //console.log("ID Token: " + id_token);
}