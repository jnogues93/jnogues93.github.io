let item = [];
let imagen = [];
let comentario = [];
let relacionado = [];
let comprar = [];
let id_articulo = localStorage.getItem("artID");
let btnComentario = document.getElementById('btnComentario');
let btnComprar = document.getElementById('btnComprar');
//localStorage.setItem("comprado", JSON.stringify(comprar));
//let comprado = JSON.parse(localStorage.getItem("comprado"));

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

// Funcion para agregar mas articulos al carrito
function addCarrito() {
    let agregado = JSON.parse(localStorage.getItem('ArtComprado'));
    let articulocomprar = {
        count: 1,
        currency: item.currency,
        id: item.id,
        image: imagen[0],
        name: item.name,
        unitCost: item.cost
        };
        agregado.push({...articulocomprar});
        localStorage.setItem('ArtComprado', JSON.stringify(agregado));
        window.location = "cart.html"
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
    let primerimg1 = "";
    let primerimg2 = "";
    let verarticulosimg1 = "";
    let verarticulosimg2 = "";
    let vercomentarios = "";
    let verarticulorelacionado = "";
    if(id_articulo) {
        verarticulos = `
                    <h3 class="mb-1">${item.name}</h3>
                    <hr />
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
        `
        document.getElementById("articulo").innerHTML = verarticulos;
        

        //Control para mostrar las imagenes del producto seleccionado
        
        //## Control para mostrar la primer imagen del Arreglo en el Carrusel
        primerimg1 = `
                    <button type="button" data-bs-target="#carouselArticulo" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Articulo 1"></button>
        `
        document.getElementById("carrusel1").innerHTML = primerimg1;

        primerimg2 = `
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${imagen[0]}" alt="0">
                    </div>
        `
        document.getElementById("carrusel2").innerHTML = primerimg2;

        //## Control para mostrar el resto de imagenes del Arreglo en el Carrusel
        for(let i = 1; i < imagen.length; i++){
        verarticulosimg1 = `
            <button type="button" data-bs-target="#carouselArticulo" data-bs-slide-to="${i}" aria-label="Articulo ${i}"></button>
        `
        document.getElementById("carrusel1").innerHTML += verarticulosimg1;

        verarticulosimg2 = `
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${imagen[i]}" alt="${i}">
                    </div>
        `
        document.getElementById("carrusel2").innerHTML += verarticulosimg2;
        }

        //Control para mostrar los comentarios
        for(let c of comentario){
            let estrella = `<span class="fa fa-star checked"></span>`.repeat(c.score);
            vercomentarios += `
                    <div class="border rounded container-fluid">
                        <p><strong>${c.user}</strong> - ${c.dateTime} - ${estrella}</p>
                        <p>${c.description}</p>
                    </div>
        `
        document.getElementById("comentarios").innerHTML = vercomentarios;
        }

        //Control para mostrar los produtos relacionados
        for(let r of relacionado){ 
            verarticulorelacionado += `
                <div class="col-3">
                    <h5 class="font-weight-bold"><strong>${r.name}</strong></h5>
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

    btnComprar.addEventListener('click', addCarrito);
    
});    