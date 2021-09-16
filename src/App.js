import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LoopIcon from '@mui/icons-material/Loop';

function App() {

  const [temperature, setTemperatue] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getWeatherData() {

    setLoading(true);

    const requestOptions = {
      method: 'GET'
    };

    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.9139&lon=10.7522';

    const res = await fetch(url, requestOptions).then(setLoading(false));
    const data = await res.json()
    
    let temperatureForNextHour = getTemperatureForNextHour(data.properties.timeseries);
    setTemperatue(temperatureForNextHour);
  }

  function getTemperatureForNextHour(timeseries) {
    let nextHour = new Date().getHours() + 1;
    if (nextHour == 25) nextHour = 0;
    
    for (let item of timeseries) {

      let temperature = item.data.instant.details.air_temperature;
      let timeInHours = item.time.split("T")[1].split(":")[0];

      if (timeInHours == nextHour) return temperature;
    }
  }

  return (
    <div>
      { loading ? <LoopIcon /> : <Button variant="contained" onClick={getWeatherData}>Show temperature</Button> }
      { temperature ? <p>The temperature for the next hour is {temperature} degrees celsius.</p> : <p></p>}
    </div>  
  );
}

export default App;