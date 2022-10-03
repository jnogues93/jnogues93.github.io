let t = document.getElementById("titulo");
let d = document.getElementById("desc");
let lista = document.getElementById("lista");
let boton = document.getElementById("agregar");
let lista_tareas = [];


function borrar(indice) {
    let valor = lista_tareas;
    valor.splice(indice, 1);
    localStorage.setItem('tareas', JSON.stringify(lista_tareas));
    let tarea = document.getElementById("lista");
    let borrar = document.getElementById(`${indice}`);
    tarea.removeChild(borrar);
}


boton.addEventListener('click', (evento) => {
    evento.preventDefault();
    let tarea = {
        título: t.value,
        descripcion: d.value
      };
    
    lista_tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(lista_tareas));
    mostrar();
});


function mostrar() {
    let obj_tareas = JSON.parse(localStorage.getItem("tareas"));
    let completar = "";
    let id_tarea = 0;
    //for(let i =0; i < tareas.length; i++){
    for(let tarea of obj_tareas){
                //let objDato = JSON.parse(localStorage.getItem("dato"));
                //let mostrar = objDato[i];
                tarea.id = id_tarea;    
                completar += `
                    <div class="row" id="${tarea.id}">
                        <div class="col-10">
                        <li class="list-group-item">
                            <h2>${tarea.título}</h2>
                            <p>${tarea.descripcion}</p>
                        </li>
                        </div>
                        <div class="col-2 d-flex flex-column">
                        <button class="btn m-0"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn m-0"><i class="bi bi-check-square"></i></button>
                        <button class="btn m-0"><i class="bi bi-exclamation-square"></i></button>
                        <button class="btn m-0" onClick="borrar(${tarea.id})"><i class="bi bi-x-square-fill"></i></button>
                        </div>
                    </div>
                `
    lista.innerHTML = completar;
    id_tarea ++;
    }
}


