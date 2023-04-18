// ...................................API définition ......................................................

// Une Api (application programming interface) est un lien technique entre 2 sites. Elle permet de récupérer des informations ou des données et de les afficher sur notre site.
// Mon site (ou site A) nécessite les informations disponibles dans la base de données du site B(openweathermap.com) pour afficher la météo en temps réel sur la page weather de mon site.
// Le site B gère lui-même sa base de données et met à disposition de l'information toujours à jour et mon site interagit avec celle-ci.

// .............................Déclaration des variables...............................................

// Déclaration des variables : l'url du site B, les données à récuperer dans la base de données de l'api, la clé qui nous permet d'avoir accès à l'api
// et la variable file qui regroupe toutes les informations. L'api renseignait les coordonnées géographiques de Varsovie par défaut, je les ai supprimées afin de pouvoir faire nos recherches
// soit pour notre ville de départ soit pour la ville de Marrakech. 

let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
// let lat = "lat=52.229676&";
// let lon = "lon=21.012229&";
let apiOptions = "units=metric&exclude=minutely,alerts&";
let apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
let file = queryUrl + lat + lon + apiOptions + apiKey;

// ...................Je connecte mon site à un site distant ...................................................

// Fetch est la méthode js qui permet de récupérer les données d'un site grâce à l'url. On parle de promesse. 
// Lorsque la promesse est résolue, c'est le bloc then qui s'enclenche avec une conversion au format javascript depuis la méthode json (JavaScript Object Notation).
// Then 1 = quand le résultat arrive
// response = le résultat
// response.json = conversion au format javascript
// Then 2 = se déclenche quand la donnée est au format Javascript
// data = donnée au format javascript 
// => = execution d'une action notamment la récupération des éléments, leur concaténation pour certains, et leur affichage sur la page html.

fetch(file)
.then((response) => response.json())
.then((data) => {
// Déclaration des variables liées aux données météo qui seront récupérées (description, température, pression, degré d'humidité) Notons que la température sera arrondie grâce  à la fonction math.round.
// Le nom saisi par l'utilisateur sera aussi récupéré pour l'affichage final.
let main = data.current.weather[0].main;
let description = data.current.weather[0].description;
let temp = Math.round(data.current.temp);
let pressure = data.current.pressure;
let humidity = data.current.humidity;
let name = "";

// .............................Affichage des objets récupérés dans la page html...........................................
document.getElementById("wrapper-description").innerHTML = description;
document.getElementById("wrapper-temp").innerHTML = temp + "°C";
document.getElementById("wrapper-pressure").innerHTML = pressure;
document.getElementById("wrapper-humidity").innerHTML = humidity + "°C";
document.getElementById("wrapper-name").innerHTML = name;

// Les données météo sont disponibles heure par heure et sur plusieurs jours.
// Quand j'ai téléchargé l'api, j'ai choisi une version simplifiée
let hourNow = data.hourly[0].temp;
let hour1 = data.hourly[1].temp;
let hour2 = data.hourly[2].temp;
let hour3 = data.hourly[3].temp;
let hour4 = data.hourly[4].temp;
let hour5 = data.hourly[5].temp;

document.getElementById("wrapper-hour-now").innerHTML = hourNow + "°";
document.getElementById("wrapper-hour1").innerHTML = hour1 + "°";
document.getElementById("wrapper-hour2").innerHTML = hour2 + "°";
document.getElementById("wrapper-hour3").innerHTML = hour3 + "°";
document.getElementById("wrapper-hour4").innerHTML = hour4 + "°";
document.getElementById("wrapper-hour5").innerHTML = hour5 + "°";

// Time
let timeNow = new Date().getHours();
// let time1 = timeNow + 1;
// let time2 = time1 + 1;
// let time3 = time2 + 1;
// let time4 = time3 + 1;
// let time5 = time4 + 1;

// document.getElementById("wrapper-time1").innerHTML = time1;
// document.getElementById("wrapper-time2").innerHTML = time2;
// document.getElementById("wrapper-time3").innerHTML = time3;
// document.getElementById("wrapper-time4").innerHTML = time4;
// document.getElementById("wrapper-time5").innerHTML = time5;

// Weather daily data
let tomorrowTemp = Math.round(data.daily[0].temp.day);
let dATTemp = Math.round(data.daily[1].temp.day);
let tomorrowMain = data.daily[0].weather[0].main;
let dATTempMain = data.daily[1].weather[0].main;

document.getElementById("wrapper-forecast-temp-today").innerHTML =
temp + "°";
document.getElementById("wrapper-forecast-temp-tomorrow").innerHTML =
tomorrowTemp + "°";
document.getElementById("wrapper-forecast-temp-dAT").innerHTML =
dATTemp + "°";

// Icons
let iconBaseUrl = "http://openweathermap.org/img/wn/";
let iconFormat = ".webp";

// Today
let iconCodeToday = data.current.weather[0].icon;
let iconFullyUrlToday = iconBaseUrl + iconCodeToday + iconFormat;
document.getElementById("wrapper-icon-today").src = iconFullyUrlToday;

// Tomorrow
let iconCodeTomorrow = data.daily[0].weather[0].icon;
let iconFullyUrlTomorrow = iconBaseUrl + iconCodeTomorrow + iconFormat;
document.getElementById(
"wrapper-icon-tomorrow"
).src = iconFullyUrlTomorrow;

// Day after tomorrow
let iconCodeDAT = data.daily[1].weather[0].icon;
let iconFullyUrlDAT = iconBaseUrl + iconCodeDAT + iconFormat;
document.getElementById("wrapper-icon-dAT").src = iconFullyUrlDAT;

// Icons hourly

// Hour now
let iconHourNow = data.hourly[0].weather[0].icon;
let iconFullyUrlHourNow = iconBaseUrl + iconHourNow + iconFormat;
document.getElementById(
"wrapper-icon-hour-now"
).src = iconFullyUrlHourNow;

// Hour1
let iconHour1 = data.hourly[1].weather[0].icon;
let iconFullyUrlHour1 = iconBaseUrl + iconHour1 + iconFormat;
document.getElementById("wrapper-icon-hour1").src = iconFullyUrlHour1;

// Hour2
let iconHour2 = data.hourly[2].weather[0].icon;
let iconFullyUrlHour2 = iconBaseUrl + iconHour2 + iconFormat;
document.getElementById("wrapper-icon-hour2").src = iconFullyUrlHour1;

// Hour3
let iconHour3 = data.hourly[3].weather[0].icon;
let iconFullyUrlHour3 = iconBaseUrl + iconHour3 + iconFormat;
document.getElementById("wrapper-icon-hour3").src = iconFullyUrlHour3;

// Hour4
let iconHour4 = data.hourly[4].weather[0].icon;
let iconFullyUrlHour4 = iconBaseUrl + iconHour4 + iconFormat;
document.getElementById("wrapper-icon-hour4").src = iconFullyUrlHour4;

// Hour5
let iconHour5 = data.hourly[5].weather[0].icon;
let iconFullyUrlHour5 = iconBaseUrl + iconHour5 + iconFormat;
document.getElementById("wrapper-icon-hour5").src = iconFullyUrlHour5;

// .........................Images de backgrounds en fonction du temps qu'il fait...................

// La fonction switch permet d'échanger l'affichage par défaut selon les données récupérées : temps neigeux, nuageux
// en cas de brouillard, de tempête ou de ciel dégagé...

switch (main) {
case "Snow":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
break;
case "Clouds":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
break;
case "Fog":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
break;
case "Rain":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
break;
case "Clear":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
break;
case "Thunderstorm":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
break;
default:
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
break;
}
});