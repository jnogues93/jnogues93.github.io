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
    location.href = "../index.html";
 }else {
   valido.innerText = "Formato de email Incorrecto";
 }
}