const cardText = document.querySelector('#cardText');
const input = document.querySelector('#searchValue');
const form = document.querySelector('#searchForm');
const btn = document.querySelector('#search-btn');
const humid = document.querySelector('#humid');
const wind = document.querySelector('#wind');


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        cardText.innerHTML = "";
        document.querySelector('.moreDetails').style.display = "none";
        const searchValue = form.elements.search.value;
        console.log(searchValue)
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=d84df9b35bd6522bd9d6e67234213996&units=metric`);
        const dataJ = await res.json();
        console.log(dataJ.weather[0].main)
        createImage(dataJ);
        createTemp(dataJ);
        createCity(dataJ);
        moreDetails(dataJ);
        form.elements.search.value = "";
    } catch (error) {
        let err = document.createElement('p');
        err.innerText = 'Invalid city name.';
        err.classList.add('error');
        cardText.appendChild(err);
    }
});

function createImage(resp) {
    let image = document.createElement('img');
    if (resp.weather[0].main == 'Rain') {
        image.src = "./images/rain.png"
    } else if (resp.weather[0].main == 'Clear') {
        image.src = "./images/clear.png"
    } else if (resp.weather[0].main == 'Clouds') {
        image.src = "./images/clouds.png"
    } else if (resp.weather[0].main == 'Drizzle') {
        image.src = "./images/drizzle.png"
    } else if (resp.weather[0].main == 'Snow') {
        image.src = "./images/snow.png"
    } else if (resp.weather[0].main == 'Mist') {
        image.src = "./images/mist.png"
    }
    image.classList.add('weatherIcon');
    cardText.appendChild(image);
};

function createTemp(resp) {
    let temp = document.createElement('h1');
    temp.classList.add('temp');
    temp.innerText = `${Math.round(resp.main.temp)}\u{00B0}C`;
    cardText.appendChild(temp);
};


function createCity(resp) {
    let city = document.createElement('h2');
    city.classList.add('city');
    city.innerText = `${resp.name}`;
    cardText.appendChild(city);
};

function moreDetails(resp) {
    humid.innerText = `${resp.main.humidity}%`;
    wind.innerText = `${resp.wind.speed}km/h`;
    document.querySelector('.moreDetails').style.display = "block";
};