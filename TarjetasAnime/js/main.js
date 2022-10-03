const url = 'https://animechan.vercel.app/api/random'
 
async function getQuoteData(){
    const respuesta = await fetch(url);
    if (respuesta.ok){
        const data = await respuesta.json();
        return data;
    }
    alert('error de petición');
}
 
const Array = [];
let indice = 0;
 
document.addEventListener('DOMContentLoaded', async() =>{
    const title = document.querySelector('.card-title');
    const quote = document.querySelector('.card-text');
    const character = document.querySelector('.personaje');
 
    const info= await getQuoteData();
    Array.push(info);
 
    title.innerText = info.anime;
    quote.innerText = info.quote;
    character.innerText = info.character;
 
    const btnSiguiente = document.querySelector("#btnSiguiente");
    const btnAnterior = document.querySelector("#btnAnterior");
 
    btnSiguiente.addEventListener('click', async()=>{
        let info;
        indice +=1;
        if (indice === Array.length){
            info = await getQuoteData();
            Array.push(info);
        }
        else{
            info = Array[indice];
        }
 
        title.innerText = info.anime;
        quote.innerText = info.quote;
        character.innerText = info.character;
 
        console.log(Array);
 
    });
 
    btnAnterior.addEventListener('click', async ()=>{
        indice = Math.max(indice - 1, 0);
        const info = Array[indice];
 
        title.innerText = info.anime;
        quote.innerText = info.quote;
        character.innerText = info.character;
 
    })
 
})