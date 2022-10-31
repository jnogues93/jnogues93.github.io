let calculadora = document.getElementById('calculadora');
let pantalla = document.getElementById('textoPantalla');
let pantallaOperador = document.getElementById('textoOperador');
let numeros = []
let numeros2 = []
let n1 = ""
let n2 = ""


function calcular(id){
    if(pantalla.innerHTML == "0"){
    pantalla.innerHTML = "";
    }

    let valor = document.getElementById(`${id}`).value;
    pantalla.innerHTML += valor;

    if(localStorage.getItem('operador') == null){
    numeros.push(valor);
    }else{
    numeros2.push(valor);
    }
}


function operacion(id){
    let operador = document.getElementById(`${id}`).value;
    localStorage.setItem('operador', operador);

    for(let n of numeros){
        n1 += n;
    }
    
    pantallaOperador.innerHTML = localStorage.getItem('operador')
    pantalla.innerHTML = "0";
}


function calculo (){

    for(let n of numeros2){
        n2 += n;
    }

    let valor1 = parseInt(n1);
    let valor2 = parseInt(n2);
    let salida = 0
    if(localStorage.getItem('operador') === "+"){
       salida = valor1 + valor2
    }

    if(localStorage.getItem('operador') === "-"){
        salida = valor1 - valor2
    }

    if(localStorage.getItem('operador') === "/"){
        salida = valor1 / valor2
    }

    if(localStorage.getItem('operador') === "*"){
        salida = valor1 * valor2
    }

    pantalla.innerHTML = salida
    localStorage.removeItem('operador');
}

function borradoUltimo(){

    if(numeros.length > 0 && numeros2.length == 0){
        let salida = "";
        numeros.pop();
        for(let n of numeros){
        salida += n
        }
        if(salida > 0){
        pantalla.innerHTML = salida;
        }else{
        pantalla.innerHTML = "0";  
        }

    }else if(numeros.length > 0 && numeros2 > 0) {
        let salida = "";
        numeros2.pop();
        for(let n of numeros){
        salida += n
        }
        if(salida > 0){
        pantalla.innerHTML = salida;
        }else{
        pantalla.innerHTML = "0";
        }
    }
}

function borradoTotal(){
    localStorage.removeItem('operador');
    pantalla.innerHTML = "0";
    numeros = [];
    numeros2 = [];
}