const API_KEY = '3f2993cef45c97c55329906f376ab82e';

function logWeatherData(data) {
    console.log(data);
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const city = document.querySelector("#city").value;

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch weather data for the entered city
    fetch(WEATHER_URL)
        .then(response => {
            console.log(response)
            if (!response.ok && response.status === 404) {
                throw new Error('City not found');
            }
            else if(!response.ok) {
                throw new Error('An error occurred while fetching the weather data.');
            }
            return response.json();
        })
        .then(data => {

            logWeatherData(data);

            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            
            document.querySelector(".weatherInfo").innerHTML = 
            `<p>Weather: ${weatherDescription}</p>
             <p>Temperature: ${temperature}°C</p>
             <p>Wind Speed: ${data.wind.speed} m/s</p>
             <img src="${iconUrl}" alt="${weatherDescription} icon">`    

        })
            .catch(error => {
            console.error(error);
            if(error.message === 'City not found') {
                document.querySelector("#weatherInfo").innerHTML = '<p>City not found</p>';
            }
            else {
                document.querySelector("#weatherInfo").innerHTML = '<p>An error occurred while fetching the weather data.</p>';
            }
        })
});
