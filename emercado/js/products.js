const ASC_BY_PRICE = "Ascendente";
const DESC_BY_PRICE = "Descendente";
const ORDER_PROD_COUNT = "Cantidad";
let CriteriaSort = undefined;
let min = undefined;
let max = undefined;
let lista = [];
let id_categoria = localStorage.getItem("catID");

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

let verhtml = function(producto){
    let verarticulos = `
    <div class="row">
                <div class="col-3">
                    <input type="image"src="${producto.image}" alt="${producto.description}" onclick="setArticuloID(${producto.id})" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                        <small class="text-muted">${producto.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${producto.description}</p>
                </div>
            </div>
    `;
    return verarticulos;
}

function showProducts(){
    let verarticulos = "";
    if(id_categoria) {
    for(let producto of lista){ 

        if (((min == undefined) || (min != undefined && parseInt(producto.cost) >= min)) &&
        ((max == undefined) || (max != undefined && parseInt(producto.cost) <= max))){

        verarticulos += verhtml(producto);
        document.getElementById("cat-list-container").innerHTML = verarticulos;
    }
    }
}
}

function sortAndShowProducts(sortCriteria, productsArray){
    CriteriaSort = sortCriteria;

    if(productsArray != undefined){
        lista = productsArray;
    }

    lista = sortProducts(CriteriaSort, lista);

    //Muestro los articulos ordenados
    showProducts();
}

function findProducts() {
    //Obtengo en tiempo real la busqueda
    let verarticulos = '';
    const buscar = document.getElementById('rangeFilterSearch');
        
    const texto = buscar.value.toLowerCase();
    for(let producto of lista){
        let nombre = producto.name.toLowerCase();
        let descripcion = producto.description.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            verarticulos += verhtml(producto);
            document.getElementById("cat-list-container").innerHTML = verarticulos;
        } else if(descripcion.indexOf(texto) !== -1){
            verarticulos += verhtml(producto);
            document.getElementById("cat-list-container").innerHTML = verarticulos;
        } else if(verarticulos === ''){
            document.getElementById("cat-list-container").innerHTML = '<p> Producto no encontrado </p>';
        }
    }
}

function filterPrice(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de articulos vendidos.
        min = document.getElementById("rangeFilterCountMin").value;
        max = document.getElementById("rangeFilterCountMax").value;

        if ((min != undefined) && (min != "") && (parseInt(min)) >= 0){
            min = parseInt(min);
        }
        else{
            min = undefined;
        }

        if ((max != undefined) && (max != "") && (parseInt(max)) >= 0){
            max = parseInt(max);
        }
        else{
            max = undefined;
        }

        showProducts();
}

document.addEventListener("DOMContentLoaded", function(e){
    if(!GoogleEmail && !LocalEmail){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe estar logueado para ver el contenido!',
            showConfirmButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Login',
            background: '#fff',
            backdrop: 'rgba(0,0,123,0.4)',
            allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                  location.href='./index.html'
              }
            })
    }else{
        document.getElementById('controles').hidden = false;
        document.getElementById('controles2').hidden = false;
    getJSONData(`${PRODUCTS_URL}${id_categoria}${EXT_TYPE}`).then(function(JSON){
        if (JSON.status === "ok")
        {
            lista = JSON.data.products;
            sortAndShowProducts(DESC_BY_PRICE);
            filterPrice()
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        min = undefined;
        max = undefined;

        showProducts();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        filterPrice();
    });

    document.getElementById("rangeFilterSearch").addEventListener("keyup", findProducts)

}

});