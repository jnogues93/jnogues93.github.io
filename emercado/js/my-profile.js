let datosUsuario = []
let email = "";


if(window.LocalEmail){
email = localStorage.getItem('userlocal');
}else if(window.NameGoogle){
email = localStorage.getItem('getEmail');
}

// Funcion para cargar validar los input y guardar los datos en el array.
function completarPerfil() {
  let perfilRequerido = {
    email: email,
    pnombre: document.getElementById('nombre').value,
    papellido: document.getElementById('apellido').value,
    telefono: document.getElementById('telefono').value,
  };
datosUsuario.push({...perfilRequerido});

if(document.getElementById('segundoNombre').value != ""){
  valor = document.getElementById('segundoNombre').value
  let perfilOpcional = {
  snombre: valor,
  }
  datosUsuario.push({...perfilOpcional});
}
if(document.getElementById('segundoApellido').value != ""){
  valor = document.getElementById('segundoApellido').value
  let perfilOpcional = {
  sapellido: valor,
  }
  datosUsuario.push({...perfilOpcional});
}

localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario))
cargarImagen();
}

//Funcion para el boton de editar los input.
document.getElementById('btnEditar').addEventListener('click', ()=>{
  document.querySelectorAll('input').forEach((input => {
    input.removeAttribute('disabled');
  }))
  document.getElementById('email').setAttribute('disabled', '')
  document.getElementById('btnGuardar').hidden = false;
})


//Funcion para poder cargar y guardar la imagen de perfil.
const subirImagen = () => {
  let f = document.querySelector("#file");
 if(f.files && f.files[0]) {
    var foto = new FileReader();
    foto.onload = e => {
      guardarImagen(e.target.result);
    }
    foto.readAsDataURL(f.files[0]);
  }else{
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'No cargo ninguna imagen de perfil',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
const guardarImagen = img => {
  localStorage.setItem("fotoPerfil", img);
}
const cargarImagen = () => {
  if(localStorage.getItem("fotoPerfil")) {
    document.querySelector("#imgperfil").src = localStorage.getItem("fotoPerfil");
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Imagen cargada con exito',
      showConfirmButton: false,
      timer: 1500
    })
  }
}


//Carga inicial de los datos.
document.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('datosUsuario') !== null){
    let p = JSON.parse(localStorage.getItem('datosUsuario'))[0];
    document.getElementById('email').setAttribute('value', p.email)
    document.getElementById('nombre').setAttribute('value', p.pnombre)
    document.getElementById('nombre').setAttribute('disabled', '')
    if(p.snombre){
    document.getElementById('segundoNombre').setAttribute('value', p.snombre)
    document.getElementById('segundoNombre').setAttribute('disabled', '')
    }
    document.getElementById('apellido').setAttribute('value', p.papellido)
    document.getElementById('apellido').setAttribute('disabled', '')
    if(p.sapellido){
    document.getElementById('segundoApellido').setAttribute('value', p.sapellido)
    document.getElementById('segundoApellido').setAttribute('disabled', '')
    }
    document.getElementById('telefono').setAttribute('value', p.telefono)
    document.getElementById('telefono').setAttribute('disabled', '')

    if(localStorage.getItem("fotoPerfil")){
    document.querySelector("#imgperfil").src = localStorage.getItem("fotoPerfil")
    }
    document.getElementById('btnGuardar').hidden = true;
  }
  else {
    if (LocalEmail){
    document.getElementById('email').setAttribute('value', localStorage.getItem("userlocal"))
  }
  else{
    document.getElementById('email').setAttribute('value', localStorage.getItem("getEmail"))
  }
}
});


//Funcion para validar los input y guardar los datos.
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe completar los campos!',
            showConfirmButton: true,
            confirmButtonText: 'Revisar',
            })
          event.preventDefault()
          event.stopPropagation()
        }else{
          completarPerfil();
          Swal.fire({
            icon: 'success',
            title: 'Datos guardados correctamente',
            showConfirmButton: true,
            confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                  document.getElementById('btnEditar').hidden = false;
                  if(!localStorage.getItem("fotoPerfil")){
                    Swal.fire({
                      icon: 'info',
                      title: 'Oops...',
                      html: 'No cargo ninguna imagen de perfil!<br>Puede cargar una editando nuevamente el Perfil',
                      showConfirmButton: true,
                      confirmButtonText: 'Ok',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          location.reload();
                        }
                        })
                  }
                  else{
                    location.reload();
                  }
          }
          })
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()