///////////////////////////////////////////////////
//                    TAREA 1                    //
///////////////////////////////////////////////////
/* Crear una funcion que pasado un string devuelva 
 * todos los caracteres ordenados de la A a la Z
 *                input   =>    output
 * Ejemplo: 'Este string' => ' Eeginrsstt'
 *
 * NOTA: ver que el espacio queda primero
*/


let texto = document.getElementById('texto');
let boton = document.getElementById('btn');



boton.addEventListener('click', () => {
    salida = texto.value.split('')
    console.log(salida);
    ordenado = salida.sort()
    console.log(ordenado);
    //return salida;
});




///////////////////////////////////////////////////
//                    TAREA 2                    //
///////////////////////////////////////////////////
/* Crear una funcion que pasado un string devuelva 
 * todos los caracteres ordenados de la A a la Z
 * Pero sin duplicados
 *                input   =>    output
 * Ejemplo: 'Este string' => ' Eeginrst'
 *
 * NOTA: ver que el espacio queda primero
 * NOTA: ver que 'e' !== 'E'
*/


let texto2 = document.getElementById('texto2');
let boton2 = document.getElementById('btn2');

boton2.addEventListener('click', () => {
    salida = texto2.value.split('')
    console.log(salida);
    ordenado = salida.sort()
    console.log(ordenado);
    filtrado = ordenado.filter((letra, index, output) => (
        output.indexOf(letra) === index)).join('');
    console.log(filtrado);
    //return salida;
});


///////////////////////////////////////////////////
//                    TAREA 3                    //
///////////////////////////////////////////////////
/* Crear una funcion que pasado un string devuelva 
 * el mismo parseado a Camel Case
 * Ejemplo: tinyurl.com/49ca4ax7
 *
 *                input   =>    output
 * Ejemplo: 'Este string' => 'esteString'
 *
 * NOTA: ver que el espacio ya no está.
*/

let texto3 = document.getElementById('texto3');
let boton3 = document.getElementById('btn3');

camelCase = function camelCase(string) {
    return string.replace(/\W+(.)/g, function(match, chr)
     {
          return chr.toUpperCase();
      });
  }
//console.log(camelCase(string));
//console.log(camelCase("Este sting"));
//console.log(camelCase("EsteString"));

boton3.addEventListener('click', () => {
    
ver = camelCase(texto3.value);
console.log(ver);

});
