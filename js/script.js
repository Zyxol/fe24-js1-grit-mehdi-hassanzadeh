const API_KEY = '3f2993cef45c97c55329906f376ab82e';

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const city = document.querySelector("#city").value;

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch weather data for the entered city
    fetch(WEATHER_URL)
        .then(response => response.json())
        .then(data => {

            console.log(data); //Data content

            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            document.querySelector("#weatherInfo").innerHTML = 
            `<p>Deweza is: ${weatherDescription}</p>
             <p>Detemperature is: ${temperature}°C</p>
             <p>Dewind speed is: ${data.wind.speed} m/s</p>
             <img src="${iconUrl}" alt="${weatherDescription} icon">`    

        })
        .catch(error => console.error('Error:', error));
});
