let URL_NASA = "https://images-api.nasa.gov/search?q=";
let buscador = document.getElementById("btnBuscar");
let dato = document.getElementById("inputBuscar");
let objeto = [];
let href = [];

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

function buscar(){
getJSONData(`${URL_NASA}${dato.value}`).then(function(JSON){
    if (JSON.status === "ok")
    {
        objeto = JSON.data.collection.items;
        mostrar();
    }
});
}


function mostrar(){
let verarticulos = "";
    for (let item of objeto) {
        //const { href } = item.links ? item.links[0] : {href: 'https://dummyimage.com/600x400/000/fff'};
    if(!item.links) {
        if (item.href.includes('/audio/')){

            verarticulos += `
            <div class="card col-4" style="width: 18rem;">
                <img class="nasaimg" src="./img/nasa.jpg" alt="Card image cap">
                <div class="card-body">
                   <h5 class="card-title">${item.data[0].title}</h5>
                    <p class="card-text overflow-auto">${item.data[0].description}</p>
                    <p class="card-date">${item.data[0].date_created}</p>
                </div>
            </div>
        `
        document.getElementById("contenedor").innerHTML = verarticulos;
    } else {

        if (item.href.includes('.json')){
            getJSONData(item.href).then(function(JSON_HREF){
                if (JSON_HREF.status === "ok")
                {
                    href = JSON_HREF.data;
                }
            });

                verarticulos += `
                <div class="card col-4" style="width: 18rem;">
                    <img class="nasaimg" src="${href[0]}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${item.data[0].title}</h5>
                        <p class="card-text overflow-auto">${item.data[0].description}</p>
                        <p class="card-date">${item.data[0].date_created}</p>
                    </div>
                </div>
                `
                document.getElementById("contenedor").innerHTML = verarticulos;
                } else {
            
                verarticulos += `
                <div class="card col-4" style="width: 18rem;">
                    <img class="nasaimg" src="${item.href}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${item.data[0].title}</h5>
                        <p class="card-text overflow-auto">${item.data[0].description}</p>
                        <p class="card-date">${item.data[0].date_created}</p>
                    </div>
                </div>
                `
                document.getElementById("contenedor").innerHTML = verarticulos;
                }
        }    

    } else {

        verarticulos += `
        <div class="card col-4" style="width: 18rem;">
            <img class="nasaimg" src="${item.links[0].href}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${item.data[0].title}</h5>
                <p class="card-text overflow-auto">${item.data[0].description}</p>
                <p class="card-date">${item.data[0].date_created}</p>
            </div>
        </div>
        `
        document.getElementById("contenedor").innerHTML = verarticulos;
        }
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    

    buscador.addEventListener('click', buscar);
});