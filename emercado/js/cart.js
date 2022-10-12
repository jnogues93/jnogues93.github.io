let carrito = []
let id_carrito = 25801;
let newcarrito = JSON.parse(localStorage.getItem('ArtComprado'));
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const informacion = document.getElementById('informacion')
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const templateInformacion = document.getElementById('template-informacion').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', ()=>{
	getJSONData(`${CART_INFO_URL}${id_carrito}${EXT_TYPE}`).then(function(JSON){
                if (JSON.status === "ok"){
                    carrito = JSON.data.articles;
					for(const compra of newcarrito){
					carrito.push({...compra})
					pintarCarrito();
					}
                }
            });
		})

items.addEventListener('click', e=>{
	btnAccion(e)
})

function pintarCarrito(){
    items.innerHTML = ''
	if(Object.keys(carrito).length === 0){
        pintarFooter()
        return
    }
    	let id = 0;
				for (const producto of carrito) {      
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
		}
		pintarInformacion()
//}

function CantidadArticulos(array) {
	let sum = 0; 
  
  for (const cantidad of array) {
	sum += parseInt(cantidad);
  }
  
  return sum;
  }

function pintarFooter() {
		footer.innerHTML = ''
		if(Object.keys(carrito).length === 0){
			footer.innerHTML = `
			<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
			`
			return
		}

		const ncantidad = carrito.map(object => object.count);
		const sum = CantidadArticulos(ncantidad)
		const nPrecio = carrito.reduce((acc, {count, unitCost}) => acc + count * unitCost, 0)
		
		templateFooter.querySelectorAll('td')[0].textContent = sum
		templateFooter.querySelector('span').textContent = nPrecio
	
		const clone = templateFooter.cloneNode(true)
		fragment.appendChild(clone)
		footer.appendChild(fragment)
	
		const btnVaciar = document.getElementById('vaciar-carrito')
		btnVaciar.addEventListener('click', ()=>{
			carrito = []
			pintarCarrito()
		})
	}

function pintarInformacion() {
	informacion.innerHTML = ''
		const clone = templateInformacion.cloneNode(true)
		fragment.appendChild(clone)
        informacion.appendChild(fragment)
}

const btnAccion = e =>{
	if(e.target.classList.contains('btn-info')){
		const producto = carrito.findIndex(object => object.id == e.target.id);
		carrito[producto].count++
		pintarCarrito()
	}

	if(e.target.classList.contains('btn-danger')){
		const producto = carrito.findIndex(object => object.id == e.target.id);
		if(carrito[producto].count > 0) {
		carrito[producto].count--
		pintarCarrito()
		}
	}
}

function updateValue(id) {
		const cantidad = document.getElementById(`${id}`).value;
		carrito[id].count = cantidad
		pintarCarrito()
}