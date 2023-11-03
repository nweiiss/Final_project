// PHONE VALIDATOR 

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [5792]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK';
        phoneResult.style.color = 'green';
    }else{
        phoneResult.innerHTML = 'NOT OK';
        phoneResult.style.color = 'red';
    }
}

// // TAB SLIDER
 

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const parentTabs = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((tabContentBlock) => {
        tabContentBlock.style.display = 'none'
    })
    tabItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active');
    })
}

const showTabContent = (indexElement = 0) => {
    tabContentBlocks[indexElement].style.display = 'block';
    tabItems[indexElement].classList.add('tab_content_item_active');
}

hideTabContent()
showTabContent()

parentTabs.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')){
        tabItems.forEach((tabItem, tabIndex) => {
            if(event.target === tabItem){
                hideTabContent();
                showTabContent(tabIndex);
                
            }
        })
    }
}

const autoSlider = (i = 0) => {
    setInterval(() => {
        i++
        if(i > tabContentBlocks.length - 1){
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}

autoSlider()

// CONVERTER

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');
const kzt = document.querySelector('#kzt');
const cny = document.querySelector('#cny');

const converter = async (element, target, target2, target3, target4, currency) => {
    element.oninput = async () => {
        try {
            const response = await fetch("../data/converter.json");
            const data = await response.json();
            
            if(currency === 'som'){
                target.value = (element.value / data.usd).toFixed(2);
                target2.value = (element.value / data.eur).toFixed(2);
                target3.value = (element.value / data.kzt).toFixed(2);
                target4.value = (element.value / data.cny).toFixed(2);
            } else if(currency === 'usd'){
                target.value = (element.value * data.usd).toFixed(2);
                target2.value = (element.value * (data.usd / data.eur)).toFixed(2);
                target3.value = (element.value * (data.usd / data.kzt)).toFixed(2);
                target4.value = (element.value * (data.usd / data.cny)).toFixed(2);
            } else if(currency === 'eur'){
                target.value = (element.value * data.eur).toFixed(2);
                target2.value = (element.value * (data.eur / data.usd)).toFixed(2);
                target3.value = (element.value * (data.eur / data.kzt)).toFixed(2);
                target4.value = (element.value * (data.eur / data.cny)).toFixed(2);
            } else if (currency === 'kzt'){
                target.value = (element.value * data.kzt).toFixed(2);
                target2.value = (element.value * (data.kzt / data.usd)).toFixed(2);
                target3.value = (element.value * (data.kzt / data.eur)).toFixed(2);
                target4.value = (element.value * (data.kzt / data.cny)).toFixed(2);
            } else if(currency === 'cny'){
                target.value = (element.value * data.cny).toFixed(2);
                target2.value = (element.value * (data.cny / data.usd)).toFixed(2);
                target3.value = (element.value * (data.cny / data.eur)).toFixed(2);
                target4.value = (element.value * (data.cny / data.kzt)).toFixed(2);
            }

            element.value === '' && (target.value = '');
            element.value === '' && (target2.value = '');
            element.value === '' && (target3.value = '');
            element.value === '' && (target4.value = '');
        } catch (error) {
            console.error(error, 'ERROR!');
        }
    }
}

converter(som, usd, eur, kzt, cny, 'som');
converter(usd, som, eur, kzt, cny, 'usd');
converter(eur, som, usd, kzt, cny, 'eur');
converter(kzt, som, usd, eur, cny, 'kzt');
converter(cny, som, usd, eur, kzt, 'cny');


// Card Switcher

const card = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const bntPrev = document.querySelector('#btn-prev');

let count = 1;

const switcher = async (count) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json();
        card.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
        `
    } catch (error) {
        console.log(error, 'ERROR!');
    }

}

btnNext.onclick = () => {
    if(count === 200){
        count = 1;
    }else{
        count++;
    }
    switcher(count);
}
bntPrev.onclick = () => {
    if(count === 1){
        count = 200;
    }else{
        count--;
    }
    switcher(count);
}

switcher(count)


// Weather


const cityName = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

// API

const DEFAULT_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'


// optional chaining - ?.


cityName.oninput = async (event) => {
    try {
        const response = await fetch(`${DEFAULT_API}?q=${event.target.value}&appid=${API_KEY}`);
        const data = await response.json();
        city.innerHTML = data?.name || 'Город не найден...';

        const tempKelvin = data?.main?.temp;
        if (typeof tempKelvin === 'number') {
            const tempCelsius = Math.round(tempKelvin - 273);
            temp.innerHTML = `${tempCelsius}&degC`;

            if (tempCelsius <= -10) {
                temp.innerHTML += ' Морозно';
            } else if (tempCelsius <= 0) {
                temp.innerHTML += ' Очень холодно';
            } else if (tempCelsius <= 10) {
                temp.innerHTML += ' Холодно';
            } else if (tempCelsius <= 20) {
                temp.innerHTML += ' Прохладно';
            } else if (tempCelsius <= 25) {
                temp.innerHTML += ' Солнечно';
            } else if (tempCelsius <= 32) {
                temp.innerHTML += ' Тепло';
            } else {
                temp.innerHTML += ' Жарко';
            }
        } else {
            temp.innerHTML = '...';
        }
    } catch (error) {
        console.error(error, 'ERROR!');
    }
}









