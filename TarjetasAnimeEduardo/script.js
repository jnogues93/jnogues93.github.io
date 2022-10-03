// https://gist.github.com/gabiito/b670c4044b49235936fae91ceca1042f
const button = document.getElementById('btn_quote');
const button_before = document.getElementById('btn_quote_before');
const URL = 'https://animechan.vercel.app/api/random';
const quoteB = document.querySelector('#quote');
let arrayCitas = [];
let idx = 0;

const showSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'block';
};
  
const hideSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'none';
};



const get_data = async () => {
    showSpinner();
    const data = await fetch(URL).catch(e=> {
        alert("Request blocked");
        return {
            ok: false
        }
    });
    if(data.ok) {
        hideSpinner();
        const json = await data.json();
        return json;
    }
    hideSpinner();
}
const show_quote = ({anime, character, quote}) => {
    quoteB.querySelector('.txt').innerHTML = quote;
    quoteB.querySelector('.author').innerHTML = character;
    quoteB.querySelector('.from').innerHTML = anime;
}

const set_total = () => {
    document.getElementById("total").innerHTML = arrayCitas.length;
}

const set_pos = (idx) => {
    document.getElementById("pos").innerHTML = idx + 1;
}

const toggle_previous_btn = (idx) => {
    if(idx > 0 && button_before.disabled) {
        button_before.disabled = false;
    } else if(idx === 0 && !button_before.disabled) {
        button_before.disabled = true;
    }
}

const load_item = async () => {
    let item = await get_data();
    if(item) arrayCitas.push(item);
    set_total();   
    return item;   
}

load_item();
document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', async (event) => { 
        if(!arrayCitas.length) idx = 0;
        else idx++;
        let item = arrayCitas[idx];
        if(!item) {
            item = await load_item();
        } 
        toggle_previous_btn(idx);
        show_quote(item);
        set_pos(idx);
    });

    button_before.addEventListener('click', async (event) => { 
        if(idx > 0) {
            idx--;
            const data = arrayCitas[idx];
            if(data) {
                show_quote(data);
            }
            toggle_previous_btn(idx);
            set_pos(idx);
        }
    });
});