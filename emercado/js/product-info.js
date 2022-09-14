let item = [];
let imagen = [];
let comentario = [];
let id_articulo = localStorage.getItem("artID");


function verificar(url){
    if(url == PRODUCT_INFO_URL){
    getJSONData(`${url}${id_articulo}${EXT_TYPE}`).then(function(JSON){
        if (JSON.status === "ok"){
            item = JSON.data;
            imagen = JSON.data.images;
            showArticles();
        }
    });
    }else if(url == PRODUCT_INFO_COMMENTS_URL){
        getJSONData(`${url}${id_articulo}${EXT_TYPE}`).then(function(JSON){
            if (JSON.status === "ok"){
            comentario = JSON.data;
            showArticles();
            }
        });
    }

}


function showArticles(){
    let verarticulos = "";
    let verarticulosimg = "";
    let vercomentarios = "";
    if(id_articulo) {
        verarticulos = `
        <div class="col">
                    <div class="col mt-3">
                        <h3 class="mb-1">${item.name}</h3>
                        <hr />
                    </div>
                    <div class="col">
                        <h5 class="font-weight-bold"><strong>Precio</strong></h5>
                        <p class="mb-1">${item.currency} ${item.cost}</p>
                    </div>
                    <div class="col">
                        <h5 class="font-weight-bold"><strong>Descripcion</strong></h5>
                        <p class="mb-1">${item.description}</p>
                    </div>
                    <div class="col">
                        <h5 class="font-weight-bold"><strong>Categoria</strong></h5>
                        <p class="mb-1">${item.category}</p>
                    </div>
                    <div class="col">
                        <h5 class="font-weight-bold"><strong>Cantidad de Vendidos</strong></h5>
                        <p class="mb-1">${item.soldCount}</p>
                    </div>
                    <div class="col-3">
                        <h5><strong>Imagenes ilustrativas</strong></h5>
                    </div>
                    <div class="row" id="imagenes">
                    </div>
                </div>
                    <div class="mt-3" id="comentario">
                    </div>
        `
        document.getElementById("cat-list-container").innerHTML = verarticulos;

        for(let i of imagen){ 
            verarticulosimg += `
                <div class="col">
                        <img src="${i}" class="img-thumbnail">
                </div>
        `
        document.getElementById("imagenes").innerHTML = verarticulosimg;
        }

        document.getElementById("comentario").innerHTML += `<h5 class="font-weight-bold"><strong>Comentarios</strong></h5>`;
        for(let c of comentario){
            let estrella = `<span class="fa fa-star checked"></span>`.repeat(c.score);
            vercomentarios = `
                    <div class="border rounded container-fluid">
                        <p><strong>${c.user}</strong> - ${c.dateTime} - ${estrella}</p>
                        <p>${c.description}</p>
                    </div>
        `
        document.getElementById("comentario").innerHTML += vercomentarios;
        }    
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    verificar(PRODUCT_INFO_URL);
    verificar(PRODUCT_INFO_COMMENTS_URL);
});    