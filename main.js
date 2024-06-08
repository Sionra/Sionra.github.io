async function fetchWeather(){
    let location = new Request("https://ipapi.co/json/");
    let date = new Date();

    let rloc = await fetch(location);
    let ldata = await rloc.json();
    
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude=43.6109&longitude=3.8763&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Europe%2FLondon&forecast_days=1")
    let request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Europe%2FLondon&forecast_days=1")
    let response = await fetch(request)
    let data = await response.json();

    console.log(data)
    console.log(`Temperature : ` + data.current.temperature_2m)
    console.log(`Humidity : ` + data.current.relative_humidity_2m)
    console.log(`Weather : ` + translateWeather(data.current.weather_code))
    document.getElementById("weather").innerHTML = translateWeather(data.current.weather_code)
    document.getElementById("temp").innerHTML = (data.current.temperature_2m)
    document.getElementById("hum").innerHTML = (data.current.relative_humidity_2m)
    document.getElementById("Date").innerHTML = date.toLocaleString('en-US', {weekday: 'long'}) + " " + date.getDate() + " " + date.toLocaleString('en-US', {month: 'long'}); 
}

function translateWeather(number){
    switch (number) {
        case 0:
            return("Clear Sky")
            break;
        case 1:
            return("Mainly Clear")
            break;
        case 2:
            return("Partly cloudy")
            break;
        case 3:
            return("Partly cloudy")
            break;
        case 45:
            return("Fog")
            break;
        case 48:
            return("rime fog")
            break;
        case 51:
            return("Drizzle Light")
            break;
        case 53:
            return("Drizzle Moderate")
            break;
        case 55:
            return("Drizzle Dense")
            break;
        case 56:
            return("Freezing Drizzle Light")
            break;
        case 57:
            return("Freezing Drizzle Dense")
            break;
        case 61:
            return("Rain Slight")
            break;
        case 63:
            return("Rain Moderate")
            break;
        case 65:
            return("Rain Heavy")
            break;
        case 66:
            return("Freezing Rain Light")
            break;
        case 67:
            return("Freezing Rain Heavy")
            break;
        case 71:
            return("Snow Fall Slight")
            break;
        case 73:
            return("Snow Fall Moderate")
            break;
        case 75:
            return("Snow Fall heavy")
            break;
        case 77:
            return("Snow Grains")
            break;
        case 80:
            return("Rain Shower Light")
            break;
        case 81:
            return("Rain Shower Medium")
            break;
        case 82:
            
        return("Rain Shower Heavy")
            break;
        case 85:
            return("Snow Shower Slight")
            break;
        case 86:
            return("Snow Shower Heavy")
            break;
        case 95:
            return("ThunderStorm Slight or moderate")
            break;
        case 96:
            return("ThunderStorm with slight hail")
            break;
        case 99:
            return("ThunderStorm with heavily hail")
            break;
    }
}

fetchWeather();