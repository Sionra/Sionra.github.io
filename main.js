let unit;
let data;

async function fetchWeather(){
    let location = new Request("https://ipapi.co/json/");
    let rloc = await fetch(location);
    let ldata = await rloc.json();

    let date = new Date();
    unit = 'C'
    
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude=43.6109&longitude=3.8763&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    let request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    let response = await fetch(request)
    data = await response.json();

    console.log(data)
    console.log(`Temperature : ` + data.current.temperature_2m)
    console.log(`Humidity : ` + data.current.relative_humidity_2m)
    //console.log(`Weather : ` + translateWeather(data.current.weather_code))
    translateWeather(data.current.weather_code)
    //document.getElementById("weather").innerHTML = translateWeather(data.current.weather_code)
    document.getElementById("temp").innerHTML = (data.current.temperature_2m)
    document.getElementById("precipitation").innerHTML = (data.current.precipitation_probability)
    document.getElementById("hum").innerHTML = (data.current.relative_humidity_2m)
    document.getElementById("windspeed").innerHTML = (data.current.wind_speed_10m)
    document.getElementById("Date").innerHTML = date.toLocaleString('en-US', {weekday: 'long'}) + " " + date.getDate() + " " + date.toLocaleString('en-US', {month: 'long'});
    setSeason(date)
}

function changeUnit(newUnit){
    /*for (let id of ['C', 'F']){
        //put in deselected
    }*/
   if (newUnit == 'C'){
        document.getElementById('temp').innerHTML = data.current.temperature_2m
        document.getElementById('F').classList.add('unotsel')
        document.getElementById('C').classList.remove('unotsel')
        unit = 'C'
   }
   if (newUnit == 'F'){
        document.getElementById('temp').innerHTML = (data.current.temperature_2m * 9/5) + 32
        document.getElementById('C').classList.add('unotsel')
        document.getElementById('F').classList.remove('unotsel')
        unit = 'F'
   }
}

function setSeason(date){
    console.log(date.getMonth())
    if(date.getMonth() === 12 || date.getMonth() < 3){
        document.getElementById("season").src = 'imgs/weather-icons/winter.png'
    } else if ( date.getMonth() >= 3 && date.getMonth() < 6) {
        document.getElementById("season").src = 'imgs/weather-icons/spring.png'
    } else if (date.getMonth() >= 6 && date.getMonth() < 9){
        document.getElementById("season").src = 'imgs/weather-icons/summer.png'
    } else {
        document.getElementById("season").src = 'imgs/weather-icons/autumn.png'
    }
}

function translateWeather(number){
    switch (number) {
        case 0:
            document.getElementById("picture").src = 'imgs/weather-icons/sun.png'
            //return("Clear Sky")
            break;
        case 1:
            document.getElementById("picture").src = 'imgs/weather-icons/overcast.png'
            //return("Mainly Clear")
            break;
        case 2:
            document.getElementById("picture").src = 'imgs/weather-icons/overcast.png'
            //return("Partly cloudy")
            break;
        case 3:
            document.getElementById("picture").src = 'imgs/weather-icons/overcast.png'
            //return("Partly cloudy")
            break;
        case 45:
            document.getElementById("picture").src = 'imgs/weather-icons/fog.png'
            //return("Fog")
            break;
        case 48:
            document.getElementById("picture").src = 'imgs/weather-icons/fog.png'
            //return("rime fog")
            break;
        case 51:
            //return("Drizzle Light")
            break;
        case 53:
            //return("Drizzle Moderate")
            break;
        case 55:
            //return("Drizzle Dense")
            break;
        case 56:
            //return("Freezing Drizzle Light")
            break;
        case 57:
            //return("Freezing Drizzle Dense")
            break;
        case 61:
            document.getElementById("picture").src = 'imgs/weather-icons/rain.png'
            //return("Rain Slight")
            break;
        case 63:
            document.getElementById("picture").src = 'imgs/weather-icons/rain.png'
            //return("Rain Moderate")
            break;
        case 65:
            document.getElementById("picture").src = 'imgs/weather-icons/rain.png'
            //return("Rain Heavy")
            break;
        case 66:
            document.getElementById("picture").src = 'imgs/weather-icons/freezing-rain.png'
            //return("Freezing Rain Light")
            break;
        case 67:
            document.getElementById("picture").src = 'imgs/weather-icons/freezing-rain.png'
            //return("Freezing Rain Heavy")
            break;
        case 71:
            document.getElementById("picture").src = 'imgs/weather-icons/snow.png'
            //return("Snow Fall Slight")
            break;
        case 73:
            document.getElementById("picture").src = 'imgs/weather-icons/snow.png'
            //return("Snow Fall Moderate")
            break;
        case 75:
            document.getElementById("picture").src = 'imgs/weather-icons/snow.png'
            //return("Snow Fall heavy")
            break;
        case 77:
            //return("Snow Grains")
            break;
        case 80:
            //return("Rain Shower Light")
            break;
        case 81:
            //return("Rain Shower Medium")
            break;
        case 82:
            //return("Rain Shower Heavy")
            break;
        case 85:
            //return("Snow Shower Slight")
            break;
        case 86:
            //return("Snow Shower Heavy")
            break;
        case 95:
            document.getElementById("picture").src = 'imgs/weather-icons/thunderstorm.png'
            //return("ThunderStorm Slight or moderate")
            break;
        case 96:
            document.getElementById("picture").src = 'imgs/weather-icons/thunderstorm.png'
            //return("ThunderStorm with slight hail")
            break;
        case 99:
            document.getElementById("picture").src = 'imgs/weather-icons/thunderstorm.png'
            //return("ThunderStorm with heavily hail")
            break;
    }
}

fetchWeather();