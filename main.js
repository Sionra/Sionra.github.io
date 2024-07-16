let unit;
let data;

async function fetchWeather(){
    const location = new Request("https://ipapi.co/json/");
    let rloc = await fetch(location);
    let ldata = await rloc.json();

    let date = new Date();
    unit = 'C'
    
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude=43.6109&longitude=3.8763&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    const request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min")
    let response = await fetch(request)
    data = await response.json();

    console.log(data)
    console.log(`Temperature : ` + data.current.temperature_2m)
    console.log(`Humidity : ` + data.current.relative_humidity_2m)
    //console.log(`Weather : ` + translateWeather(data.current.weather_code))
    document.getElementById("picture").src = translateWeather(data.current.weather_code)
    //document.getElementById("weather").innerHTML = translateWeather(data.current.weather_code)
    document.getElementById("temp").innerHTML = (data.current.temperature_2m)
    document.getElementById("precipitation").innerHTML = (data.current.precipitation_probability)
    document.getElementById("hum").innerHTML = (data.current.relative_humidity_2m)  
    document.getElementById("windspeed").innerHTML = (data.current.wind_speed_10m)
    document.getElementById("Date").innerHTML = date.toLocaleString('en-US', {weekday: 'long'}) + " " + date.getDate() + " " + date.toLocaleString('en-US', {month: 'long'});
    setSeason(date);
    forecast(data);
}

/*function forecast(data){
    let newtr = document.createElement("tr");
    for (let i = 0; i < data.daily.temperature_2m_max.length; i++){
        let newtd = document.createElement("td");
        let date = new Date(data.daily.time[i]).toLocaleString('en-US', {weekday: 'short'})
        let nodedate = document.createTextNode(date)
        newtd.appendChild(document.createElement("p").appendChild(nodedate))

        newtr.appendChild(newtd);
    }
    document.body.insert(document.getElementById("mainDate"), newtr)
}
    */
function forecast(data){
    let forecastTable = document.createElement('table');
    let newRow = forecastTable.insertRow(-1);
    for (let i = 0; i < data.daily.temperature_2m_max.length; i++){
        //date
        let newCell = newRow.insertCell(i);
        let date = new Date(data.daily.time[i] + "T00:00").toLocaleString('en-US', {weekday: 'short'});
        let dateTxt = document.createElement('p');
        dateTxt.innerText = date
        dateTxt.classList.add('dayshort');
        let pic = document.createElement("img");
        pic.src = translateWeather(data.daily.weather_code[i]);
        pic.classList.add('weatherIcon');
        //weather
        
        let temp = document.createElement('p');
        temp.classList.add('temp');
        temp.classList.add('dayshort');
        temp.innerText = data.daily.temperature_2m_min[i] + ' - ' + data.daily.temperature_2m_max[i];

        //let's add everything
        newCell.appendChild(dateTxt);
        newCell.appendChild(pic);
        newCell.appendChild(temp)
    }

    //document.body.appendChild(forecastTable)
    let patate = document.getElementsByClassName("middle")
    patate[0].appendChild(forecastTable);
}

function changeUnit(newUnit){
    let tempList = document.getElementsByClassName('temp');
    /*for (let id of ['C', 'F']){
        //put in deselected
    }*/
   if (newUnit == 'C'){
        document.getElementById('temp').innerHTML = data.current.temperature_2m;
        document.getElementById('F').classList.add('unotsel');
        document.getElementById('C').classList.remove('unotsel');
        unit = 'C';
   }
   if (newUnit == 'F'){
        let fCalc = (data.current.temperature_2m * 9/5) + 32;
        document.getElementById('temp').innerHTML = fCalc.toFixed(1);
        document.getElementById('C').classList.add('unotsel');
        document.getElementById('F').classList.remove('unotsel');
        unit = 'F';
   }

   for ( let i = 0; i < data.daily.temperature_2m_min.length; i++){
    if ( unit === 'F'){
        tempList[i].innerText = ((data.daily.temperature_2m_min[i] * 9/5) + 32).toFixed(1) + ' - ' + ((data.daily.temperature_2m_max[i] * 9/5) + 32).toFixed(1);
    } else {
        tempList[i].innerText = data.daily.temperature_2m_min[i] + ' - ' + data.daily.temperature_2m_max[i]
    }
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
            return 'imgs/weather-icons/sun.png'
            //return("Clear Sky")
            break;
        case 1:
            return 'imgs/weather-icons/overcast.png'
            //return("Mainly Clear")
            break;
        case 2:
            return 'imgs/weather-icons/overcast.png'
            //return("Partly cloudy")
            break;
        case 3:
            return 'imgs/weather-icons/overcast.png'
            //return("Partly cloudy")
            break;
        case 45:
            return 'imgs/weather-icons/fog.png'
            //return("Fog")
            break;
        case 48:
            return 'imgs/weather-icons/fog.png'
            //return("rime fog")
            break;
        case 51:
            return 'imgs/weather-icons/drizzle.png'
            //return("Drizzle Light")
            break;
        case 53:
            return 'imgs/weather-icons/drizzle.png'
            //return("Drizzle Moderate")
            break;
        case 55:
            return 'imgs/weather-icons/drizzle.png'
            //return("Drizzle Dense")
            break;
        case 56:
            return 'imgs/weather-icons/freezing-rain.png'
            //return("Freezing Drizzle Light")
            break;
        case 57:
            return 'imgs/weather-icons/freezing-rain.png'
            //return("Freezing Drizzle Dense")
            break;
        case 61:
            return 'imgs/weather-icons/rain.png'
            //return("Rain Slight")
            break;
        case 63:
            return 'imgs/weather-icons/rain.png'
            //return("Rain Moderate")
            break;
        case 65:
            return 'imgs/weather-icons/rain.png'
            //return("Rain Heavy")
            break;
        case 66:
            return 'imgs/weather-icons/freezing-rain.png'
            //return("Freezing Rain Light")
            break;
        case 67:
            return 'imgs/weather-icons/freezing-rain.png'
            //return("Freezing Rain Heavy")
            break;
        case 71:
            return 'imgs/weather-icons/snow.png'
            //return("Snow Fall Slight")
            break;
        case 73:
            return 'imgs/weather-icons/snow.png'
            //return("Snow Fall Moderate")
            break;
        case 75:
            return 'imgs/weather-icons/snow.png'
            //return("Snow Fall heavy")
            break;
        case 77:
            return 'imgs/weather-icons/snow.png'
            //return("Snow Grains")
            break;
        case 80:
            return 'imgs/weather-icons/rain-shower.png'
            //return("Rain Shower Light")
            break;
        case 81:
            return 'imgs/weather-icons/rain-shower.png'
            //return("Rain Shower Medium")
            break;
        case 82:
            return 'imgs/weather-icons/rain-shower.png'
            //return("Rain Shower Heavy")
            break;
        case 85:
            return 'imgs/weather-icons/snow.png'
            //return("Snow Shower Slight")
            break;
        case 86:
            return 'imgs/weather-icons/snow.png'
            //return("Snow Shower Heavy")
            break;
        case 95:
            return 'imgs/weather-icons/thunderstorm.png'
            //return("ThunderStorm Slight or moderate")
            break;
        case 96:
            return 'imgs/weather-icons/thunderstorm.png'
            //return("ThunderStorm with slight hail")
            break;
        case 99:
            return 'imgs/weather-icons/thunderstorm.png'
            //return("ThunderStorm with heavily hail")
            break;
    }
}

fetchWeather();