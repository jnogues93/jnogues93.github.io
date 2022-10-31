let id_carrito = 25801;
let dolar = 40;
let newcarrito = JSON.parse(localStorage.getItem('ArtComprado'));
const datosTarjeta = document.getElementById('datosTarjeta')
const datosTrasnferencia = document.getElementById('datosTransferencia')
const items = document.getElementById('items')
const titles = document.getElementById('titulos')
const radioTotales = document.getElementById('informacion')
const pagos = document.getElementById('modalPagos')
const mensaje = document.getElementById('footer')
const informacion = document.getElementById('informacion')
const totales = document.getElementById('totales')
const templateFooter = document.getElementById('template-footer').content
const templateTotales = document.getElementById('template-totales').content
const templateCarrito = document.getElementById('template-carrito').content
const templateInformacion = document.getElementById('template-informacion').content
const fragment = document.createDocumentFragment()
const fragmentTotales = document.createDocumentFragment()


//Se controla si hay articulos cargados en el carrito
document.addEventListener('DOMContentLoaded', ()=>{
					if(newcarrito !== null){
						if(newcarrito.length > 0){
							titles.hidden = false;
							pintarCarrito();
							document.getElementById(localStorage.getItem('tipoEnvio')).click();
							document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
						}
						}else{
							titles.hidden = true;
							verModal(modalCarrito);
						}
		});

//Eventos para los botones de aumentar o reducir cantidad del articulo seleccionado
items.addEventListener('click', e=>{
	btnCantidad(e)
})

radioTotales.addEventListener('click', b=>{
	eventosRadio(b)
})

pagos.addEventListener('click', p=>{
	eventosPagos(p)
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
		//}else{
		//	verModal(modalCarrito);
		//}
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
		if(newcarrito.length > 1){
		const producto = newcarrito.findIndex(object => object.id == e.target.id);
		newcarrito.splice(producto,1);
		localStorage.setItem('ArtComprado', JSON.stringify(newcarrito));
		document.getElementById(localStorage.getItem('tipoEnvio')).checked = true;
		updateEnvio(localStorage.getItem('tipoEnvio'));
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

const eventosRadio = b =>{

	//Funciones para controlar los radio button de envio en vivo
	if(b.target.classList.contains('envioPremium')){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.15
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioPremium');
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

//Funcion para actualizar envio si cambia la cantidad en vivo
const updateEnvio = envio => {
	if(envio === 'envioPremium'){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.15
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioPremium');
		pintarTotales()
		//templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		//pintarCarrito()
	}

	if(envio === 'envioExpress'){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.07
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioExpress');
		pintarTotales()
		//templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		//pintarCarrito()
		}

	if (envio === 'envioStandard'){
		const costoEnvio = newcarrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0) * 0.05
		localStorage.setItem('costoEnvio', costoEnvio);
		localStorage.setItem('tipoEnvio', 'envioStandard');
		pintarTotales()
		//templateTotales.getElementById('totalEnvio').textContent = "USD" + " " + costoEnvio
		//pintarCarrito()
	}	
}

	//Funciones para controlar los radio button en Medios de pago
	const eventosPagos = p =>{
		if(p.target.classList.contains('tarjeta')){
			datosTrasnferencia.querySelectorAll('div input').forEach((input) => { input.disabled = true; });
			datosTarjeta.querySelectorAll('div input').forEach((input2) => { input2.disabled = false; });
			datosTarjeta.querySelectorAll('div input').forEach((input3) => { input3.required = true; });
			document.getElementById('mediosPago').querySelector('p').hidden = false;
			document.getElementById('mediosPago').querySelector('p').innerHTML = "Tarjeta de Credito"
		}
	
		if(p.target.classList.contains('transferencia')){
			datosTarjeta.querySelectorAll('div input').forEach((input) => { input.disabled = true; });
			datosTrasnferencia.querySelectorAll('div input').forEach((input2) => { input2.disabled = false; });
			datosTrasnferencia.querySelectorAll('div input').forEach((input3) => { input3.required = true; });
			document.getElementById('mediosPago').querySelector('p').hidden = false;
			document.getElementById('mediosPago').querySelector('p').innerHTML = "Transferencia bancaria"
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

//########################################################//
// JS para validacion de campos Form
(() => {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll('.needs-validation')
	const checkTarjeta = document.getElementById('tarjeta')
	const checkCuenta = document.getElementById('cuentabanco')
  
	// Loop over them and prevent submission
	Array.from(forms).forEach(form => {
	  form.addEventListener('submit', event => {
		if(!checkTarjeta.checked && !checkCuenta.checked){
			document.getElementById('mediosPago').querySelector('button').style.color = "#dc3545";
      		document.getElementById('mediosPago').querySelector('p').hidden = false;
      		document.getElementById('mediosPago').querySelector('p').style.color = "#dc3545";
      		document.getElementById('mediosPago').querySelector('p').innerHTML = "Debe seleccionar un medio de Pago"
		}
		if (!form.checkValidity()) {
		  event.preventDefault()
		  event.stopPropagation()
		}else{
			verModal(modalOK);
		}
  
		form.classList.add('was-validated')
	  }, false)
	})
  })()