const URL = 'https://api.chucknorris.io/jokes/random';
const title = document.querySelector('.card-title');
const quote = document.querySelector('.card-text');
let objeto = [];

const showSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'block';
};
  
const hideSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'none';
};

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
    getJSONData(URL).then(function(JSON){
        if (JSON.status === "ok")
        {
            objeto = JSON.data;
            mostrar();
        }
    });
    }

    function mostrar(){
        title.innerText = objeto.icon_url;
        quote.innerText = objeto.value;
    }


    document.addEventListener("DOMContentLoaded", function(e){
        document.getElementById("btnSiguiente").addEventListener("click", function(){
            buscar();
        });
    });