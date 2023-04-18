// ...................................API définition ......................................................

// Une Api (application programming interface) est un lien technique entre 2 sites. Elle permet de récupérer des informations ou des données et de les afficher sur notre site.
// Mon site (ou site A) nécessite les informations disponibles dans la base de données du site B(openweathermap.com) pour afficher la météo en temps réel sur la page weather de mon site.
// Le site B gère lui-même sa base de données et met à disposition de l'information toujours à jour et mon site interagit avec celle-ci.

// .............................Déclaration des variables...............................................

//Déclaration des constantes, querySelector est l'équivalent de document.getElementById, il récupère les données

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Au click sur le bouton recherche une action se déclenche :
search.addEventListener('click', () => {

    // search.addEventListener('click', 'keyup' () => {

    
    // ...................Je connecte mon site à un site distant ...................................................

// Fetch est la méthode js qui permet de récupérer les données d'un site grâce à l'url. On parle de promesse. 
// Lorsque la promesse est résolue, c'est le bloc then qui s'enclenche avec une conversion au format javascript depuis la méthode json (JavaScript Object Notation).
// Then 1 = quand le résultat arrive
// response = le résultat
// response.json = conversion au format javascript
// Then 2 = se déclenche quand la donnée est au format Javascript
// => = execution d'une action notamment la récupération des éléments, leur concaténation pour certains, et leur affichage sur la page html.

// il s'agit de la clé API qui permet de l'utiliser. La constante city permet de récupérer la valeur saisie.
    const APIKey = '9ad80eb46ae574efc279c0c84b082520';
    const city = document.querySelector('.search-box input').value;

    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=97ad485b6db9822d9a93cb34073d61f3&units=metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=97ad485b6db9822d9a93cb34073d61f3&units=metric';

    // Si la ville existe, exécuter la méthode fetch
    if (city === '')
        return;

        // const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=97ad485b6db9822d9a93cb34073d61f3&units=metric';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Marrakech&units=metric&appid=${APIKey}`)

        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

// Déclaration des variables liées aux données météo qui seront récupérées (description, température, pression, degré d'humidité) Notons que la température sera arrondie grâce  à la fonction math.round.
// Le nom saisi par l'utilisateur sera aussi récupéré pour l'affichage final.
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

  
// .........................Images de backgrounds en fonction du temps qu'il fait...................

// La fonction switch permet de changer l'affichage par défaut selon les données récupérées : temps neigeux, nuageux
// en cas de brouillard, de tempête ou de ciel dégagé...

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

// .............................Affichage des objets récupérés dans la page html...........................................
// Les backtits permettent de combiner plusieurs types de données

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});