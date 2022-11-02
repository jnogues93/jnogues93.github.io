let dolar = 42;
let newcarrito = JSON.parse(localStorage.getItem('ArtComprado'));
const datosTarjeta = document.getElementById('datosTarjeta')
const datosTrasnferencia = document.getElementById('datosTransferencia')
const items = document.getElementById('items')
const titles = document.getElementById('titulos')
const radioEnvios = document.getElementById('informacion')
const modalPagos = document.getElementById('modalPagos')
const pagos = document.getElementById('pagos')
const mensaje = document.getElementById('footer')
const informacion = document.getElementById('informacion')
const totales = document.getElementById('totales')
const envios = document.getElementById('envios')
const btnFinalizar = document.getElementById('btn-compra')
const templateFooter = document.getElementById('template-footer').content
const templateTotales = document.getElementById('template-totales').content
const templateCarrito = document.getElementById('template-carrito').content
const templatePagos = document.getElementById('template-pagos').content
const templateInformacion = document.getElementById('template-informacion').content
const templateEnvios = document.getElementById('template-envios').content
const fragment = document.createDocumentFragment()
const fragmentTotales = document.createDocumentFragment()

//###### EVENTOS Y CONTENIDO #######

//Se controla si hay articulos cargados en el carrito
document.addEventListener('DOMContentLoaded', ()=>{
					if(newcarrito !== null){
						if(newcarrito.length > 0){
							titles.hidden = false;
							pintarCarrito();
							btnFinalizar.hidden = false;
							if(localStorage.getItem('tipoEnvio') !== null){
							document.getElementById(localStorage.getItem('tipoEnvio')).click();
							document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
							}
						}
					}else{
						titles.hidden = true;
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Carrito vacío - comience a comprar!',
							showConfirmButton: true,
							confirmButtonColor: '#d33',
							confirmButtonText: 'Ver Categorias',
							allowOutsideClick: false
							}).then((result) => {
								  if (result.isConfirmed) {
										location.href='./categories.html'
								}
							})
						}
		});

//Eventos para los botones de aumentar o reducir cantidad del articulo seleccionado
items.addEventListener('click', e=>{
	btnCantidad(e)
})

radioEnvios.addEventListener('click', envio=>{
	eventosEnvios(envio)
})

modalPagos.addEventListener('click', pago=>{
	eventosPagos(pago)
})


//Funcion que carga el HTML con los datos dinamicos de cada articulo
function pintarCarrito(){
    items.innerHTML = ''
	mensaje.innerHTML = ''
	//if(newcarrito.length > 0){
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
					templateCarrito.querySelector('span').textContent = "USD" + " " + ((producto.count * producto.unitCost) / dolar).toFixed(0)
				}else{
					templateCarrito.querySelector('span').textContent = producto.currency + " " + producto.count * producto.unitCost
				}
				const clone = templateCarrito.cloneNode(true)
				fragment.appendChild(clone)
				items.appendChild(fragment)
				id++;
				}
				pintarFooter()
				pintarEnvios()
				pintarInformacion()
				pintarTotales()
				pintarPagos()
	}

//Funcion para ver total de Articulos, Total del Costo del carrito y Boton para limpiar carrito
function pintarFooter() {

		const cantidad = newcarrito.map(object => object.count);
		const ncantidad = sumarCantidad(cantidad)
		
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


//Funcion para cargar el tipo de envio
function pintarEnvios() {
	envios.innerHTML = ''
	const clone = templateEnvios.cloneNode(true)
	fragment.appendChild(clone)
    envios.appendChild(fragment)
	if(localStorage.getItem('tipoEnvio') !== null){
	document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
	}
}

//Funcion para cargar el formulario de direccion
function pintarInformacion() {
	informacion.innerHTML = ''
	const clone = templateInformacion.cloneNode(true)
	fragment.appendChild(clone)
    informacion.appendChild(fragment)
}

//Funcion para ver totales del Carrito
function pintarTotales() {
totales.innerHTML = '';
	//const subTotal = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost , 0)
	const subTotal = sumSubTotal(newcarrito)
	
		templateTotales.getElementById('subtotal').textContent = "USD" + " " + subTotal
	if(localStorage.getItem('costoEnvio') !== null){
		templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + localStorage.getItem('costoEnvio')
		templateTotales.getElementById('total').textContent = "USD" + " " + (parseInt(localStorage.getItem('costoEnvio')) + subTotal)
	}else{
		templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + "0"
		templateTotales.getElementById('total').textContent = "USD" + " " + "0"
	}

	const clone = templateTotales.cloneNode(true)
	fragmentTotales.appendChild(clone)
	totales.appendChild(fragmentTotales)
}

//Funcion para cargar el formulario de datos de pagos
function pintarPagos() {
	pagos.innerHTML = ''
	const clone = templatePagos.cloneNode(true)
	fragment.appendChild(clone)
    pagos.appendChild(fragment)
}


//###### FUNCIONES #######

//Funcion que suma la cantidad por articulo
function sumarCantidad(array) {
	let sum = 0; 
  
  for (const cantidad of array) {
	sum += parseInt(cantidad);
  }
  
  return sum;
  }

//Funcion para calcular SubTotal
function sumSubTotal(array) {
	let sum = 0; 
  
  for (const total of array) {
	if(total.currency === "UYU"){
	sum += parseInt((total.count * total.unitCost) / dolar);
  	}else {
	sum += parseInt(total.count * total.unitCost)
  	}
  }
  return sum;
} 

//Funcion para los eventos en los botones de aumentar y reducir cantidad del articulo seleccionado
const btnCantidad = e =>{
	if(e.target.classList.contains('btn-info')){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito[producto].count++
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		if(localStorage.getItem('tipoEnvio') !== null){
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		eventosEnvios(localStorage.getItem('tipoEnvio'));
		}
		pintarCarrito()
	}

	if(e.target.classList.contains('btn-danger')){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		if(newcarrito[producto].count > 0){
		newcarrito[producto].count--
		}
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		if(localStorage.getItem('tipoEnvio') !== null){
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		eventosEnvios(localStorage.getItem('tipoEnvio'));
		}
		pintarCarrito()
		}

	if (e.target.classList.contains('btndelete')){
		if(newcarrito.length > 1){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito.splice(producto,1);
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		if(localStorage.getItem('tipoEnvio') !== null){
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		eventosEnvios(localStorage.getItem('tipoEnvio'));
		}
		pintarCarrito()
		window.location.reload();
		}else{
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito.splice(producto,1);
		localStorage.removeItem('ArtComprado');
		pintarCarrito()
		window.location.reload();
		}
	}
}

//Funcion para actualizar envio en vivo
const eventosEnvios = envio => {
	if(envio === 'envioPremium'){
		const costoEnvio = parseInt(sumSubTotal(newcarrito)) * 0.15
		localStorage.setItem('costoEnvio', costoEnvio.toFixed(0));
		localStorage.setItem('tipoEnvio', 'envioPremium');
		pintarTotales()
	}

	if(envio === 'envioExpress'){
		const costoEnvio = parseInt(sumSubTotal(newcarrito)) * 0.07
		localStorage.setItem('costoEnvio', costoEnvio.toFixed(0));
		localStorage.setItem('tipoEnvio', 'envioExpress');
		pintarTotales()
		}

	if (envio === 'envioStandard'){
		const costoEnvio = parseInt(sumSubTotal(newcarrito)) * 0.05
		localStorage.setItem('costoEnvio', costoEnvio.toFixed(0));
		localStorage.setItem('tipoEnvio', 'envioStandard');
		pintarTotales()
	}	
}

//Funciones para controlar los radio button en Medios de pago
const eventosPagos = pago =>{
	if(pago.target.classList.contains('tarjeta')){
		document.getElementById('mediosPago').querySelector('p').style.removeProperty("color");
		datosTrasnferencia.querySelectorAll('div input').forEach((input) => { input.disabled = true; });
		datosTarjeta.querySelectorAll('div input').forEach((input2) => { input2.disabled = false; });
		datosTarjeta.querySelectorAll('div input').forEach((input3) => { input3.required = true; });
		document.getElementById('mediosPago').querySelector('p').hidden = false;
		document.getElementById('mediosPago').querySelector('p').innerHTML = "Tarjeta de Credito";
		localStorage.setItem('pagoSelect', 'tarjeta')
	}

	if(pago.target.classList.contains('transferencia')){
		document.getElementById('mediosPago').querySelector('p').style.removeProperty("color");
		datosTarjeta.querySelectorAll('div input').forEach((input) => { input.disabled = true; });
		datosTrasnferencia.querySelectorAll('div input').forEach((input2) => { input2.disabled = false; });
		datosTrasnferencia.querySelectorAll('div input').forEach((input3) => { input3.required = true; });
		document.getElementById('mediosPago').querySelector('p').hidden = false;
		document.getElementById('mediosPago').querySelector('p').innerHTML = "Transferencia bancaria";
		localStorage.setItem('pagoSelect', 'transferencia')
	}
}

//Funcion para actualizar cantidad del articulo escribiendo en el input
function updateValue(id) {
		const cantidad = document.getElementById(`${id}`).value;
		newcarrito[id].count = cantidad
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		eventosEnvios(localStorage.getItem('tipoEnvio'));
		pintarCarrito()
}

function finalizaCarrito(){
	localStorage.removeItem('tipoEnvio')
	localStorage.removeItem('pagoSelect')
	localStorage.removeItem('costoEnvio')
	localStorage.removeItem('ArtComprado')
}

//########################################################//

// JS para validacion de datos
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
		
      form.addEventListener('submit', event => {

        if (!form.checkValidity()) {
			document.getElementById('btn-pagos').style.color = "#dc3545";
			document.getElementById('mensajePagos').innerHTML = "Debe seleccionar un medio de Pago"
			document.getElementById('mensajePagos').hidden = false;
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe completar los campos!',
			  })
			  event.preventDefault()
			  event.stopPropagation()
			
		}else if(localStorage.getItem('pagoSelect') === null){
			document.getElementById('btn-pagos').style.color = "#dc3545";
			document.getElementById('mensajePagos').innerHTML = "Debe seleccionar un medio de Pago"
			document.getElementById('mensajePagos').hidden = false;
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Debe seleccionar un Pago',
			  })	  
		    event.preventDefault()
        	event.stopPropagation()
        
		}else {
			finalizaCarrito()
			Swal.fire({
				icon: 'success',
				title: 'Compra finalizada con exito',
				showConfirmButton: true,
				confirmButtonText: 'Inicio'
				}).then((result) => {
  					if (result.isConfirmed) {
   	 					location.href='./main.html'
					}
				})
			event.preventDefault()
			event.stopPropagation()
		}
		
        form.classList.add('was-validated')
      }, false)
    })
  })()