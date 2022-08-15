let lista = [];

document.addEventListener("DOMContentLoaded", function(e){
    const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"
    JSONData(URL).then(function(JSON){
        if (JSON.status === "ok")
        {
            lista = JSON.data;
            showProducts(lista);
        }
    });
});


function showProducts(array){
    let verarticulos = "";
    let registro = array.products

    for(let i = 0; i < registro.length; i++){ 
        let autos = registro[i];
        verarticulos += `
        <div class="row">
                    <div class="col-3">
                        <img src="${autos.image}" alt="${autos.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${autos.name} - ${autos.currency} ${autos.cost}</h4>
                            <small class="text-muted">${autos.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${autos.description}</p>
                    </div>
                </div>
        `
        document.getElementById("cat-list-container").innerHTML = verarticulos;
    }
}