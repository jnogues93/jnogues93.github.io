let PELICULAS = "https://japceibal.github.io/japflix_api/movies-data.json";
let infopelicula = [];
let buscador = document.getElementById("btnBuscar");
let posicion = 0;

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

function verModal(){
    $(document).ready(function(){
        $("#modal").modal({ backdrop: 'static', keyboard: false });
        $("#modal").modal('show');
        $('#closemodal').modal('hide');
    });
  }
  
  function cerrarModal(){
    $(document).ready(function(){
        $('#modal').modal('hide');
    });
  }

  //## Agregar Modal ##
  let showmodal = `
  <div class="modal" id="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content modalblur">
      <div class="modal-header">
      </div>
      <div class="modal-body">
        <p class="text-dark">Debe ingresar el nombre de una Pelicula</p>
      </div>
      <div class="modal-footer">
        <button onclick="cerrarModal()" type="button" class="btn btn-primary">Cerrar</button>
      </div>
    </div>
  </div>
  </div>
  `
  document.getElementById("addModal").innerHTML += showmodal

function setPosition(id) {
    localStorage.setItem("PeliculaID", id);
    verinfopelicula();
}

function verinfopelicula(){
  pelicula = localStorage.getItem("PeliculaID");
  let infopeli = infopelicula[pelicula];
  let genre = infopeli.genres.map(element => {return element.name; }).join("-");
    if(pelicula){
      let info = `
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopMovie">${infopelicula[pelicula].title}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="More"></button>
        </div>
        <div class="offcanvas-body">
          <p class="text-secondary">${infopelicula[pelicula].overview}</p>
        </div>
        <hr/>
        <div class="offcanvas-body d-flex justify-content-between overflow-visible">
          <p class="text-secondary">Genres: ${genre}</p>
          <div class="btn-group col-md-2">
          <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
          <li><span class="dropdown-item">Year:<span style="float:right" class="text-end">${infopeli.release_date.slice(0,4)}</span></span></li>
          <li><span class="dropdown-item">Runtime:<span style="float:right" class="text-end">${infopeli.runtime} Mins</span></span></li>
          <li><span class="dropdown-item">Budget:<span style="float:right" class="text-end">$${infopeli.budget}</span></span></li>
          <li><span class="dropdown-item">Revenue:<span style="float:right" class="text-end">$${infopeli.revenue}</span></span></li>
          </ul>
        </div>
        </div>
    `
    document.querySelector("#offcanvasMovie").innerHTML = info;
    }
}

function verhtml(pelicula){
    let estrella = `<span class="fa fa-star checked"></span>`.repeat(Math.round(pelicula.vote_average/2));
    let estrellaoff = `<span class="fa fa-star"></span>`.repeat(5-Math.round(pelicula.vote_average/2));
    let mostrarpelicula = `
    <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasMovie" onclick='setPosition(${posicion})' class="detalle border border-danger list-group-item list-group-item-action cursor-active">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="text-secondary mb-1">${pelicula.title}</h4><div class="flex-row-reverse">${estrella}${estrellaoff}</div>
                    </div>
                    <p class="text-secondary mb-1">${pelicula.tagline}</p>
    </div>
    `
    return mostrarpelicula;
}


function verPelicula(){
    let mostrarpelicula = '';
    const texto = document.getElementById('inputBuscar').value
    if (texto != ""){
    document.getElementById("lista").innerHTML += '<h4 class="text-light text-center">Seleccione una Pelicula</h4>';
    posicion = 0;
    for(let pelicula of infopelicula){
        const value = document.getElementById('inputBuscar').value.toLowerCase();
        let title = pelicula.title.toLowerCase();
        //## Se usa map con esta variable por ser un array dentro del objeto principal
        let genre = pelicula.genres.map(element => {return element.name.toLowerCase(); });
        let tagline = pelicula.tagline.toLowerCase();
        let overview = pelicula.overview.toLowerCase();
        if(title.indexOf(value) !== -1){
            mostrarpelicula += verhtml(pelicula);
        } else if(genre.indexOf(value) !== -1){
            mostrarpelicula += verhtml(pelicula);
        } else if(tagline.indexOf(value) !== -1){
            mostrarpelicula += verhtml(pelicula);
        } else if(overview.indexOf(value) !== -1){
            mostrarpelicula += verhtml(pelicula);
        }   
    posicion++;
    }
    document.getElementById("lista").innerHTML = mostrarpelicula;
    if(!mostrarpelicula){
      document.getElementById("lista").innerHTML = '<p class="text-secondary"> Pelicula no encontrada</p>';
    }
    }else {
       verModal();
    }
    
}


document.addEventListener('DOMContentLoaded', function(){
    getJSONData(PELICULAS).then(function(JSON){
        if (JSON.status === "ok")
        {
            infopelicula = JSON.data;
        }
});
buscador.addEventListener('click', verPelicula);

});