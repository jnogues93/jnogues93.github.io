let lista = [1,2,3,4,5,6,7,8,9];

function esPrimo(num){
    if(num==2 || num==3){
        return true;
    }
    if(num < 2 || num % 2 == 0){
        return false;
    }
    for(let i = 3; i <= num/2; i+=2){
        if(num % i == 0){
        }
        return true;
    }
    
}

let primos = lista.filter(num => { return esPrimo(num)});
console.log(primos)