const templateValidacion = document.getElementById('control').content
const fragment = document.createDocumentFragment()
document.getElementById("btn-primary").addEventListener('click', registro)

//btn.addEventListener('click', registro)

  function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

  function registro() {
    document.getElementById("alert-success").classList.remove("show");
    document.getElementById("alert-danger").classList.remove("show");
    nombre = document.getElementById("nombre");
    apellido = document.getElementById("apellido");
    email = document.getElementById("email");
    con1 = document.getElementById("password1");
    con2 = document.getElementById("password2");
    termino = document.getElementById("terminos");
    
    if (nombre.value == '' || apellido.value == '' || email.value == '' || con1.value == '' || !termino.checked) {
        showAlertError();
    } else {
        showAlertSuccess();
    }

    if(!termino.checked){
      document.getElementById('general').querySelector('button').style.color = "#dc3545";
      document.getElementById('general').querySelector('p').hidden = false;
      document.getElementById('general').querySelector('p').style.color = "#dc3545";
    }else{
      document.getElementById('general').querySelector('button').style.color = '';
      document.getElementById('general').querySelector('p').hidden = true;
    }
    
}

function password(){
  con1 = document.getElementById("password1");
  con2 = document.getElementById("password2");
  if(con2.value != con1.value || con2.value.length < 6){
    con2.setCustomValidity('Deben ser iguales');
  }else{
    con2.setCustomValidity('');
  }
}


// JS para validacion de datos
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  //Funcion para agregar alerta en campos con Bootstrap
  function mensajes(){
  //  let campos = document.querySelectorAll('#general div');
    let requerido = document.querySelectorAll('#general div input');
    
  // for (const unidad of campos) {
  //      const clone = templateValidacion.cloneNode(true)
  //      fragment.appendChild(clone)
	//	unidad.appendChild(fragment)
  //  }
    for (const input of requerido) {
        input.setAttribute("required", "");
    }

    document.getElementById('terminos').setAttribute("required", "");
  //  document.getElementById('chkTerminos').appendChild(fragment)

  }

  document.addEventListener('DOMContentLoaded', ()=>{
        mensajes();
        
	});