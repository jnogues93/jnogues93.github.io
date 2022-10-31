let id_carrito = 25801;
let dolar = 40;
let newcarrito = JSON.parse(localStorage.getItem('ArtComprado'));
const items = document.getElementById('items')
const radioTotales = document.getElementById('informacion')
const mensaje = document.getElementById('footer')
const informacion = document.getElementById('informacion')
const totales = document.getElementById('totales')
const templateFooter = document.getElementById('template-footer').content
const templateTotales = document.getElementById('template-totales').content
const templateCarrito = document.getElementById('template-carrito').content
const templateInformacion = document.getElementById('template-informacion').content
const fragment = document.createDocumentFragment()
const fragmentTotales = document.createDocumentFragment()

//Se carga el JSON del carrito fijo y se controla la carga cuando se agrega un articulo de alguna categoria
document.addEventListener('DOMContentLoaded', ()=>{
	getJSONData(`${CART_INFO_URL}${id_carrito}${EXT_TYPE}`).then(function(json){
                if (json.status === "ok"){
					if(newcarrito !== null){
						checkItemJson = newcarrito.filter(function(articulo) { return articulo.id === 50924});
						if(newcarrito.length <= 1 && checkItemJson.length < 1) {
							newcarrito.push(...json.data.articles);
							articuloFijo = JSON.stringify(newcarrito);
							localStorage.setItem('ArtComprado', articuloFijo);
							pintarCarrito();
							//document.getElementById('envioPremium').click();
							document.getElementById(localStorage.getItem('tipoEnvio')).click();
							document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
						}else{
							pintarCarrito();
							//verModal(modalCarrito);
							document.getElementById('envioPremium').click();
							document.getElementById(localStorage.getItem('tipoEnvio')).click();
							document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
						}
					}
				}
            });
		});

//Eventos para los botones de aumentar o reducir cantidad del articulo seleccionado
items.addEventListener('click', e=>{
	btnCantidad(e)
})

radioTotales.addEventListener('click', b=>{
	radioEnvio(b)
})

//Funcion que carga el HTML con los datos dinamicos de cada articulo
function pintarCarrito(){
    items.innerHTML = ''
	mensaje.innerHTML = ''
    	let id = 0;
				for (const producto of newcarrito) {
				templateCarrito.querySelector('.btndelete').setAttribute('id',`${producto.id}`)
				templateCarrito.querySelector('td button i').setAttribute('id',`${producto.id}`)
				templateCarrito.querySelector('th').textContent = producto.id
				templateCarrito.querySelector('td img').setAttribute('src', producto.image)
				templateCarrito.querySelectorAll('td')[1].textContent = producto.name
				templateCarrito.querySelector('td input').setAttribute('value',`${producto.count}`)
				templateCarrito.querySelector('td input').setAttribute('id',`${id}`)
				templateCarrito.querySelector('td input').setAttribute('onchange',"updateValue(this.id);")
				templateCarrito.querySelector('.btn-info').setAttribute('id',`${producto.id}`)
				templateCarrito.querySelector('.btn-danger').setAttribute('id',`${producto.id}`)
				if(producto.currency === "UYU"){
					templateCarrito.querySelector('span').textContent = "USD" + " " + (producto.count * producto.unitCost) / dolar
				}else{
					templateCarrito.querySelector('span').textContent = producto.currency + " " + producto.count * producto.unitCost	
				}
				const clone = templateCarrito.cloneNode(true)
				fragment.appendChild(clone)
				items.appendChild(fragment)
				id++;
				}
				//localStorage.getItem('tipoEnvio').checked = true;
				pintarFooter()
				pintarInformacion()
				pintarTotales()
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

		const cantidad = newcarrito.map(object => object.count);
		const ncantidad = CantidadArticulos(cantidad)
		
		templateFooter.querySelectorAll('td')[0].textContent = ncantidad
	
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
	document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
}

//Funcion para ver totales del Carrito
function pintarTotales() {
totales.innerHTML = '';
	const subTotal = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0)
	templateTotales.getElementById('subtotal').textContent = "USD" + " " + subTotal
	templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + localStorage.getItem('costoEnvio')
	templateTotales.getElementById('total').textContent = "USD" + " " + (parseInt(localStorage.getItem('costoEnvio')) + subTotal)

	const clone = templateTotales.cloneNode(true)
	fragmentTotales.appendChild(clone)
	totales.appendChild(fragmentTotales)
}

//Funcion para los eventos en los botones de aumentar y reducir cantidad del articulo seleccionado
const btnCantidad = e =>{
	if(e.target.classList.contains('btn-info')){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito[producto].count++
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		updateEnvio(localStorage.getItem('tipoEnvio'));
		pintarCarrito()
	}

	if(e.target.classList.contains('btn-danger')){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		if(newcarrito[producto].count > 0){
		newcarrito[producto].count--
		}
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		updateEnvio(localStorage.getItem('tipoEnvio'));
		pintarCarrito()
		}

	if (e.target.classList.contains('btndelete')){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito.splice(producto,1);
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		updateEnvio(localStorage.getItem('tipoEnvio'));
		pintarCarrito()
		window.location.reload();
	}
}

const radioEnvio = b =>{
	if(b.target.classList.contains('envioPremium')){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.15
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioPremium');
		//templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		//pintarTotales()
		pintarTotales()
	}

	if(b.target.classList.contains('envioExpress')){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.07
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioExpress');
		pintarTotales()
		}

	if (b.target.classList.contains('envioStandard')){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.05
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioStandard');
		pintarTotales()
	}	
}

const updateEnvio = envio => {
	if(envio === 'envioPremium'){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.15
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioPremium');
		templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		pintarCarrito()
	}

	if(envio === 'envioExpress'){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.07
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioExpress');
		templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		pintarCarrito()
		}

	if (envio === 'envioStandard'){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.05
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioStandard');
		templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		pintarCarrito()
	}	
}

//Funcion para actualizar cantidad del articulo escribiendo en el input
function updateValue(id) {
		const cantidad = document.getElementById(`${id}`).value;
		newcarrito[id].count = cantidad
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		updateEnvio(localStorage.getItem('tipoEnvio'));
		pintarCarrito()
}