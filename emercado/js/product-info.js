let item = [];
let imagen = [];
let comentario = [];
let id_articulo = localStorage.getItem("artID");
let btnComentario = document.getElementById('btnComentario');

//Funcion para verificar que url se consulta
function verificar(url){
    if(url == PRODUCT_INFO_URL){
    getJSONData(`${url}${id_articulo}${EXT_TYPE}`).then(function(JSON){
        if (JSON.status === "ok"){
            item = JSON.data;
            imagen = JSON.data.images;
            relacionado = JSON.data.relatedProducts;
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

//Funcion que agrega el comentario nuevo
function newComentario(){
    let valorScore = document.getElementById("score");
    let valorComment = document.getElementById("com");
    let date = new Date();
    let now = date.toLocaleString();
    let newComentario = {
        product: id_articulo,
        score: valorScore.value,
        description: valorComment.value,
        user: user,
        dateTime: now,
      };
    
    comentario.push(newComentario);
    showArticles();
}

//Funcion para el evento del boton de agregar comentario
btnComentario.addEventListener('click', (evento) => {
    evento.preventDefault();
    user = "";
    
    if(!LocalEmail && !GoogleEmail){
        document.getElementById('alert').classList.remove('hide');
    }if(LocalEmail){
        user = LocalEmail;
        newComentario();
    }if(GoogleEmail){
        user = GoogleEmail;
        newComentario();
        }
});

//Funcion para mostrar el articulo seleccionado
function showArticles(){
    let verarticulos = "";
    let verarticulosimg = "";
    let vercomentarios = "";
    let verarticulorelacionado = "";
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
                    <div class="mt-3" id="comentarios">
                    </div>
        `
        document.getElementById("cat-list-container").innerHTML = verarticulos;

        //Control para mostrar las imagenes del producto seleccionado
        for(let i of imagen){ 
            verarticulosimg += `
                <div class="col">
                        <img src="${i}" class="img-thumbnail">
                </div>
        `
        document.getElementById("imagenes").innerHTML = verarticulosimg;
        }

        //Control para mostrar los comentarios
        document.getElementById("comentarios").innerHTML += `<hr/><h5 class="mb-3 font-weight-bold"><strong>Comentarios</strong></h5>`;
        for(let c of comentario){
            let estrella = `<span class="fa fa-star checked"></span>`.repeat(c.score);
            vercomentarios = `
                    <div class="border rounded container-fluid">
                        <p><strong>${c.user}</strong> - ${c.dateTime} - ${estrella}</p>
                        <p>${c.description}</p>
                    </div>
        `
        document.getElementById("comentarios").innerHTML += vercomentarios;
        }

        //Control para mostrar los produtos relacionados
        for(let r of relacionado){ 
            verarticulorelacionado += `
                <div class="col-3">
                    <h5 class="font-weight-bold"><strong>Modelo</strong></h5>
                    <p class="mb-1">${r.name}</p>
                    <input type="image"src="${r.image}" onclick="setArticuloID(${r.id})" class="img-thumbnail">
                </div>
        `
        document.getElementById("producto-relacionado").innerHTML = verarticulorelacionado;
        }
    }
}

//Eventos que se cargan al ingresar a la pagina
document.addEventListener("DOMContentLoaded", function(e){
    verificar(PRODUCT_INFO_URL);
    verificar(PRODUCT_INFO_COMMENTS_URL);
});    