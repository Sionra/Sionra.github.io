let unit;
let data;

async function fetchWeather(){
    const location = new Request("https://ipapi.co/json/");
    let rloc = await fetch(location);
    let ldata = await rloc.json();
    let date = new Date();

    if ( localStorage.getItem('tunit') == null){
        if ( navigator.language == 'en-US'){
            localStorage.setItem('tunit', 'F');
        } else {
            localStorage.setItem('tunit', 'C');
        }
    }
    unit = localStorage.getItem('tunit');
    
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude=43.6109&longitude=3.8763&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    //let request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=Europe%2FLondon&forecast_days=1")
    const request = new Request("https://api.open-meteo.com/v1/forecast?latitude="+ldata.latitude+"&longitude="+ldata.longitude+"&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min")
    let response = await fetch(request)
    data = await response.json();

    console.log(data)
    console.log(`Temperature : ` + data.current.temperature_2m)
    console.log(`Humidity : ` + data.current.relative_humidity_2m)
    //console.log(`Weather : ` + translateWeather(data.current.weather_code))
    document.getElementById("picture").src = translateWeather(data.current.weather_code, 'p')
    //document.getElementById("weather").innerHTML = translateWeather(data.current.weather_code)

    if ( unit == 'C'){
        document.getElementById("temp").innerHTML = (data.current.temperature_2m)
        document.getElementById('F').classList.add('unotsel');
    } else if ( unit == 'F'){
        document.getElementById("temp").innerHTML = ((data.current.temperature_2m * 9/5) + 32).toFixed(1);
        document.getElementById('C').classList.add('unotsel');
    }

    document.getElementById("precipitation").innerHTML = (data.current.precipitation_probability)
    document.getElementById("hum").innerHTML = (data.current.relative_humidity_2m)  
    document.getElementById("windspeed").innerHTML = (data.current.wind_speed_10m)
    document.getElementById("Date").innerHTML = date.toLocaleString('en-US', {weekday: 'long'}) + " " + date.getDate() + " " + date.toLocaleString('en-US', {month: 'long'});
    //setSeason(date);
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

        //forecast weather icon
        let pic = document.createElement("img");
        pic.src = translateWeather(data.daily.weather_code[i], 'p');
        pic.classList.add('weatherIcon');

        //Weather name
        let wname = document.createElement('p');
        wname.classList.add('ltextinfo');
        wname.classList.add('textforecast');
        wname.innerText = translateWeather(data.daily.weather_code[i], 't');


        //forecast temp text
        let temp = document.createElement('p');
        temp.classList.add('temp');
        temp.classList.add('dayshort');

        if ( unit == 'C'){
            temp.innerText = data.daily.temperature_2m_min[i] + ' - ' + data.daily.temperature_2m_max[i];
        } else if ( unit == 'F'){
            temp.innerText = ((data.daily.temperature_2m_min[i] * 9/5) + 32).toFixed(1) + ' - ' + ((data.daily.temperature_2m_max[i] * 9/5) + 32).toFixed(1);

        }

        

        //let's add everything
        newCell.appendChild(dateTxt);
        newCell.appendChild(pic);
        newCell.appendChild(wname)
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
        localStorage.setItem('tunit', 'C');
        unit = 'C';
   }
   if (newUnit == 'F'){
        let fCalc = (data.current.temperature_2m * 9/5) + 32;
        document.getElementById('temp').innerHTML = fCalc.toFixed(1);
        document.getElementById('C').classList.add('unotsel');
        document.getElementById('F').classList.remove('unotsel');
        localStorage.setItem('tunit', 'F');
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

// p for picture | t for text
function translateWeather(number, code){
    switch (number) {
        case 0:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/clear-day.svg'
                //return 'imgs/weather-icons/sun.png'
            }
            return("Clear Sky")
            break;
        case 1:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/cloudy.svg'
                //return 'imgs/weather-icons/overcast.png'
            }
            return("Mainly Clear")
            break;
        case 2:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/cloudy.svg'
                //return 'imgs/weather-icons/overcast.png'
            }
            return("Partly cloudy")
            break;
        case 3:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/cloudy.svg'
                //return 'imgs/weather-icons/overcast.png'
            }
            return("Partly cloudy")
            break;
        case 45:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/fog.svg'
                //return 'imgs/weather-icons/fog.png'
            }
            return("Fog")
            break;
        case 48:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/fog.svg'
                //return 'imgs/weather-icons/fog.png'
            }
            return("rime fog")
            break;
        case 51:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-1-day.svg'
                //return 'imgs/weather-icons/drizzle.png'
            }
            return("Drizzle Light")
            break;
        case 53:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-2-day.svg'
                //return 'imgs/weather-icons/drizzle.png'
            }
            return("Drizzle Moderate")
            break;
        case 55:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-3-day.svg'
                //return 'imgs/weather-icons/drizzle.png'
            }
            return("Drizzle Dense")
            break;
        case 56:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rain-and-snow-mix.svg'
                //return 'imgs/weather-icons/freezing-rain.png'
            }
            return("Freezing Drizzle")
            break;
        case 57:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rain-and-snow-mix.svg'
                //return 'imgs/weather-icons/freezing-rain.png'
            }
            return("Freezing Drizzle")
            break;
        case 61:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-1.svg'
                //return 'imgs/weather-icons/rain.png'
            }
            return("Rain Slight")
            break;
        case 63:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-2.svg'
                //return 'imgs/weather-icons/rain.png'
            }
            return("Rain Moderate")
            break;
        case 65:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-3.svg'
                //return 'imgs/weather-icons/rain.png'
            }
            return("Rain Heavy")
            break;
        case 66:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rain-and-snow-mix.svg'
                //return 'imgs/weather-icons/freezing-rain.png'
            }
            return("Freezing Rain")
            break;
        case 67:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rain-and-snow-mix.svg'
                //return 'imgs/weather-icons/freezing-rain.png'
            }
            return("Freezing Rain")
            break;
        case 71:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-1.svg'
                //return 'imgs/weather-icons/snow.png'
            }
            return("Snow Fall")
            break;
        case 73:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-2.svg'
                //return 'imgs/weather-icons/snow.png'
            }
            return("Snow Fall")
            break;
        case 75:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-3.svg'
                //return 'imgs/weather-icons/snow.png'
            }
            return("Snow Fall")
            break;
        case 77:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snow-and-sleet-mix.svg'
                //return 'imgs/weather-icons/snow.png'
            }
            return("Snow Grains")
            break;
        case 80:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-1.svg'
                //return 'imgs/weather-icons/rain-shower.png'
            }
            return("Rain Shower")
            break;
        case 81:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-2.svg'
                //return 'imgs/weather-icons/rain-shower.png'
            }
            return("Rain Shower")
            break;
        case 82:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/rainy-3.svg'
                //return 'imgs/weather-icons/rain-shower.png'
            }
            return("Rain Shower")
            break;
        case 85:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-2.svg'
                //return 'imgs/weather-icons/snow.png'
            }
            return("Snow Shower")
            break;
        case 86:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/snowy-3.svg'
                //return 'imgs/weather-icons/snow.png'
            }
            return("Snow Shower")
            break;
        case 95:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/scattered-thunderstorms.svg'
                //return 'imgs/weather-icons/thunderstorm.png'
            }
            return("ThunderStorm")
            break;
        case 96:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/scattered-thunderstorms.svg'
                //return 'imgs/weather-icons/thunderstorm.png'
            }
            return("ThunderStorm")
            break;
        case 99:
            if (code === 'p'){
                return 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/scattered-thunderstorms.svg'
                //return 'imgs/weather-icons/thunderstorm.png'
            }
            return("ThunderStorm")
            break;
    }
}

fetchWeather();