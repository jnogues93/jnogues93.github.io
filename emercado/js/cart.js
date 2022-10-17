let id_carrito = 25801;
let newcarrito = JSON.parse(localStorage.getItem('ArtComprado'));
const items = document.getElementById('items')
const mensaje = document.getElementById('footer')
const informacion = document.getElementById('informacion')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const templateInformacion = document.getElementById('template-informacion').content
const fragment = document.createDocumentFragment()

//Se carga el JSON del carrito fijo y se controla la carga cuando se agrega un articulo de alguna categoria
document.addEventListener('DOMContentLoaded', ()=>{
	getJSONData(`${CART_INFO_URL}${id_carrito}${EXT_TYPE}`).then(function(json){
                if (json.status === "ok"){
					if(newcarrito !== null){
						if(newcarrito.length == 1) {
							newcarrito.push(...json.data.articles);
							articuloFijo = JSON.stringify(newcarrito);
							localStorage.setItem('ArtComprado', articuloFijo);
							pintarCarrito();
						}else{
							pintarCarrito();
						}
					}
				}
            });
		});

//Eventos para los botones de aumentar o reducir cantidad del articulo seleccionado
items.addEventListener('click', e=>{
	btnAccion(e)
})

//Funcion que carga el HTML con los datos dinamicos de cada articulo
function pintarCarrito(){
    items.innerHTML = ''
	mensaje.innerHTML = ''
    	let id = 0;
				for (const producto of newcarrito) {      
				templateCarrito.querySelector('th').textContent = producto.id
				templateCarrito.querySelector('td img').setAttribute('src', producto.image)
				templateCarrito.querySelectorAll('td')[1].textContent = producto.name
				templateCarrito.querySelector('td input').setAttribute('value',`${producto.count}`)
				templateCarrito.querySelector('td input').setAttribute('id',`${id}`)
				templateCarrito.querySelector('td input').setAttribute('onchange',"updateValue(this.id);")
				templateCarrito.querySelector('.btn-info').setAttribute('id',`${producto.id}`)
				templateCarrito.querySelector('.btn-danger').setAttribute('id',`${producto.id}`)
				templateCarrito.querySelector('span').textContent = producto.count * producto.unitCost
				const clone = templateCarrito.cloneNode(true)
				fragment.appendChild(clone)
				items.appendChild(fragment)
				id++;
				}
				pintarFooter()
				pintarInformacion()
		}

//Funcion que suma la cantidad por articulo
function CantidadArticulos(array) {
	let sum = 0; 
  
  for (const cantidad of array) {
	sum += parseInt(cantidad);
  }
  
  return sum;
  }

//Funcion para ver total de Articulos, Total del Costo del carrito y Boton para limpiar carrito
function pintarFooter() {

		const ncantidad = newcarrito.map(object => object.count);
		const sum = CantidadArticulos(ncantidad)
		const nPrecio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0)
		
		templateFooter.querySelectorAll('td')[0].textContent = sum
		templateFooter.querySelector('span').textContent = nPrecio
	
		const clone = templateFooter.cloneNode(true)
		fragment.appendChild(clone)
		footer.appendChild(fragment)
	
		const btnVaciar = document.getElementById('vaciar-carrito')
		btnVaciar.addEventListener('click', ()=>{
			localStorage.removeItem('ArtComprado');
			pintarCarrito()
			window.location.reload();
		})
	}

//Funcion para cargar el formulario de datos de envío
function pintarInformacion() {
	informacion.innerHTML = ''
		const clone = templateInformacion.cloneNode(true)
		fragment.appendChild(clone)
        informacion.appendChild(fragment)
}

//Funcion para los eventos en los botones de aumentar y reducir cantidad del articulo seleccionado
const btnAccion = e =>{
	if(e.target.classList.contains('btn-info')){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito[producto].count++
		localStorage.removeItem('ArtComprado');
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		pintarCarrito()
	}

	if(e.target.classList.contains('btn-danger')){
		const producto = newcarrito.findIndex(object2 => object2.id == e.target.id);
		if(newcarrito[producto].count > 0){
		newcarrito[producto].count--
		}
		localStorage.removeItem('ArtComprado');
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		pintarCarrito()
		}
	}

//Funcion para actualizar cantidad del articulo escribiendo en el input
function updateValue(id) {
		const cantidad = document.getElementById(`${id}`).value;
		newcarrito[id].count = cantidad
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		pintarCarrito()
}