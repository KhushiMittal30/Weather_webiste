function getWeather(){
    const apiKey='c12e7efd99a9442b77c63e2d7ee34a2b'
    const city =document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:',error);
        alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:',error);
        alert('Error fetching hourly forecast data. Please try again.');
    });
}

function displayWeather(data){

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv= document.getElementById('weather-info');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    if(data.cod=='404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    }
    else{
        const cityName= data.name;
        const temperature = Math.round(data.main.temp - 273.15);  //convert to celcius
        const description = data.weather[0].description;
        const iconCode= data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        const temperatureHTML = `
        <p>${temperature}°C</p>`;

    const weatherHTML = `
    <p>${cityName}</p>
    <p>${description}</p>`;
    
    const imageEle = document.getElementById('image');
    const imageHtml = `
    <img id = "Weather-icon" alt="weather-icon">`;
    imageEle.innerHTML=imageHtml;

    const weatherIcon = document.getElementById('Weather-icon');

    tempDivInfo.innerHTML=temperatureHTML;
    weatherInfoDiv.innerHTML=weatherHTML;
    weatherIcon.src = iconUrl;
    //console.log(weatherIcon); // Check if weatherIcon is not null
    weatherIcon.alt=description;
    
    }
}

    // function showImage(){
    //     const weatherIcon = document.getElementById('weather-icon');
    //     weatherIcon.style.display ='block';  //making the image visible on webpage on being loaded
      


function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
        hourlyForecastDiv.innerHTML = ''; // Clear previous content
    
        // Ensure hourlyData is an array before attempting to use slice method
        if (Array.isArray(hourlyData)) {
            const next24Hours = hourlyData.slice(0, 8);
    
            next24Hours.forEach(item => {
                // Process each hourly forecast item
                const dateTime = new Date(item.dt * 1000);
                const hour = dateTime.getHours();
                const temperature = Math.round(item.main.temp-273.15);
                const iconCode = item.weather[0].icon;
                const iconUrl =  `https://openweathermap.org/img/wn/${iconCode}.png`;
        
                const hourlyItemHtml =`
                <div class= "hourly-item">
                <span>${hour}:00</span>
                <img src = "${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
                </div>`;
                
                console.log(iconUrl);
                hourlyForecastDiv.innerHTML +=hourlyItemHtml;
        
            });
        } else {
            console.error('Hourly data is not in the expected format:', hourlyData);
            alert('Hourly data is not in the expected format. Please try again.');
        }
}