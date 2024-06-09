async function fetchWeather(){
    let location = new Request("https://ipapi.co/json/");
    let date = new Date();

    let rloc = await fetch(location);
    let ldata = await rloc.json();
    
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude=43.6109&longitude=3.8763&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    let request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1)
    let response = await fetch(request)
    let data = await response.json();

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
}

function translateWeather(number){
    switch (number) {
        case 0:
            document.getElementById("picture").src = 'sun.png'
            //return("Clear Sky")
            break;
        case 1:
            document.getElementById("picture").src = 'overcast.png'
            //return("Mainly Clear")
            break;
        case 2:
            document.getElementById("picture").src = 'overcast.png'
            //return("Partly cloudy")
            break;
        case 3:
            document.getElementById("picture").src = 'overcast.png'
            //return("Partly cloudy")
            break;
        case 45:
            document.getElementById("picture").src = 'fog.png'
            //return("Fog")
            break;
        case 48:
            document.getElementById("picture").src = 'fog.png'
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
            document.getElementById("picture").src = 'rain.png'
            //return("Rain Slight")
            break;
        case 63:
            document.getElementById("picture").src = 'rain.png'
            //return("Rain Moderate")
            break;
        case 65:
            document.getElementById("picture").src = 'rain.png'
            //return("Rain Heavy")
            break;
        case 66:
            document.getElementById("picture").src = 'freezing-rain.png'
            //return("Freezing Rain Light")
            break;
        case 67:
            document.getElementById("picture").src = 'freezing-rain.png'
            //return("Freezing Rain Heavy")
            break;
        case 71:
            document.getElementById("picture").src = 'snow.png'
            //return("Snow Fall Slight")
            break;
        case 73:
            document.getElementById("picture").src = 'snow.png'
            //return("Snow Fall Moderate")
            break;
        case 75:
            document.getElementById("picture").src = 'snow.png'
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
            document.getElementById("picture").src = 'thunderstorm.png'
            //return("ThunderStorm Slight or moderate")
            break;
        case 96:
            document.getElementById("picture").src = 'thunderstorm.png'
            //return("ThunderStorm with slight hail")
            break;
        case 99:
            document.getElementById("picture").src = 'thunderstorm.png'
            //return("ThunderStorm with heavily hail")
            break;
    }
}

fetchWeather();