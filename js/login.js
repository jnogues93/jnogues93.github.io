// Control para no dejar vacio los Input y formato de Email al Presionar Login
document.getElementById("button_login").onclick = function () {
email = document.getElementById("email").value;
passwd = document.getElementById("password").value;
formatoemail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
valido = document.getElementById('emailOK');


 if( email == "" || passwd == "" ) {
  alert('Usuario y/o Contraseña Incorecto o Vacio!');
  window.location.reload()
 }if (formatoemail.test(email)) {
    location.href = "../main.html";
 }else {
   valido.innerText = "Formato de email Incorrecto";
 }
}

//Boton para login de Google
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}