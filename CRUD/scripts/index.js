// Consulto y Guardo los datos
async function getData() {
    let crud = await fetch('https://6361f74bfabb6460d80259e9.mockapi.io/users')
    if (crud.ok) {
        let users = await crud.json();
        return users;
    }
    else {
        document.getElementById('alert-error').classList.add('show');
    }
}

// Mostrar por numero de ID o todos los ID
document.getElementById('btnGet1').addEventListener('click', async function () {
    let datos = await getData();
    let id = document.getElementById('inputGet1Id').value;
    if(id == ""){
        let txt = '';
        for (const user of datos) {
            txt += "<li>ID: "+user.id+"</li>";
            txt += "<li>Nombre: "+user.name+"</li>";
            txt += "<li>Apellido: "+user.lastname+"</li>";
        }
        document.getElementById("results").innerHTML=txt;
    }else if (datos.findIndex(object => object.id == id) >= 0){
        let txt = '';
        let registro = datos.findIndex(object => object.id == id);
            txt += "<li>ID: "+ datos[registro].id +"</td>";
            txt += "<li>Nombre: "+ datos[registro].name +"</td>";
            txt += "<li>Apellido: "+ datos[registro].lastname +"</td>";
            document.getElementById("results").innerHTML=txt;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            html: 'El registro '+id+' no Existe.',
            timer: 2000,
            timerProgressBar: true,
        })
        document.getElementById("results").innerHTML = '';
    }
})

// Agregar un nuevo Registro
document.getElementById('btnPost').addEventListener('click', async function () {
    let datos = await getData();
    let newName = document.getElementById('inputPostNombre').value;
    let newLastName = document.getElementById('inputPostApellido').value;
    let txt = '';

    if(newName != "" || newLastName != ""){
        if(newName.length <= 5 && newLastName.length <= 5){
    fetch('https://6361f74bfabb6460d80259e9.mockapi.io/users', {
        method: 'POST',
        body: JSON.stringify({
            id: datos.length++,
            name: newName,
            lastname: newLastName,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
  })
  .then( async function(){
    let datos = await getData();
    for (const user of datos) {
    txt += "<li>ID: "+user.id+"</li>";
    txt += "<li>Nombre: "+user.name+"</li>";
    txt += "<li>Apellido: "+user.lastname+"</li>";
    }
    document.getElementById("results").innerHTML=txt;
    Swal.fire({
        icon: 'success',
        title: 'Registro guardado con exito',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar'
        })
    })
}else {
    Swal.fire({
        icon: 'error',
        title: 'Algo salio mal!',
        html: 'El Nombre y Apellido deben tener maximo 5 digitos',
        timer: 2000,
        timerProgressBar: true,
    })
    }
}

})

// Editar un Registro existente
//Controles para buscar el Registro a editar
document.getElementById('btnPut').addEventListener('click', async function (){
    let datos = await getData();
    let id = document.getElementById('inputPutId').value;
    let registro = datos.findIndex(object => object.id == id);
    if(registro < 0){
        Swal.fire({
            icon: 'error',
            title: 'Algo salio mal!',
            html: 'El registro '+id+' no Existe.',
            timer: 2000,
            timerProgressBar: true,
        })
    }else{
        document.getElementById('inputPutNombre').setAttribute('value', datos[registro].name)
        document.getElementById('inputPutApellido').setAttribute('value', datos[registro].lastname)
        $('#dataModal').modal('show');
    }
})

// Controles del Modal si el Registro existe
document.getElementById('btnSendChanges').addEventListener('click', async function () {
let id = document.getElementById('inputPutId').value;
let txt = '';
        let newNombre = document.getElementById('inputPutNombre').value
        let newApellido = document.getElementById('inputPutApellido').value
    
if(newNombre.length <= 5 && newApellido.length <= 5){
        fetch('https://6361f74bfabb6460d80259e9.mockapi.io/users/'+id, {
        method: 'PUT',
        body: JSON.stringify({
            name: newNombre,
            lastname: newApellido,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
  })
  .then( async function(){
    let datos = await getData();
    for (const user of datos) {
    txt += "<li>ID: "+user.id+"</li>";
    txt += "<li>Nombre: "+user.name+"</li>";
    txt += "<li>Apellido: "+user.lastname+"</li>";
    }
    document.getElementById("results").innerHTML=txt;
    $('#dataModal').modal('hide');
    Swal.fire({
        icon: 'success',
        title: 'Registro modificado con exito',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar'
        })
    })
}
else{
    Swal.fire({
        icon: 'error',
        title: 'Algo salio mal!',
        html: 'El Nombre y Apellido deben tener maximo 5 digitos',
        timer: 2000,
        timerProgressBar: true,
    })
    $('#dataModal').modal('show');
}
})




// Borrar un Registro existente
document.getElementById('btnDelete').addEventListener('click', async function () {
    let datos = await getData();
    let id = document.getElementById('inputDelete').value;
    let registro = datos.findIndex(object => object.id == id);
    let txt = '';
        if(id != "" && registro >= 0){
            fetch('https://6361f74bfabb6460d80259e9.mockapi.io/users/'+id, {
            method: 'DELETE',
            })
            .then( async function(){
            
            let datos = await getData();
            for (const user of datos) {
            txt += "<li>ID: "+user.id+"</li>";
            txt += "<li>Nombre: "+user.name+"</li>";
            txt += "<li>Apellido: "+user.lastname+"</li>";
            }
            document.getElementById("results").innerHTML=txt;
            Swal.fire({
                icon: 'success',
                title: 'Registro eliminado con exito',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar'
                })
            })
            
        }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salio mal!',
                    html: 'El registro '+id+' no Existe.',
                    timer: 2000,
                    timerProgressBar: true,
                })
        }

})