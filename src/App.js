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
    
    // index 3 = this hour. Index 4 = next hour
    let temperatureForNextHour = data.properties.timeseries[4].data.instant.details.air_temperature;
    setTemperatue(temperatureForNextHour);
  }

  return (
    <div>
      { loading ? <LoopIcon /> : <Button variant="contained" onClick={getWeatherData}>Show temperature</Button> }
      { temperature ? <p>The temperature for the next hour is {temperature} degrees celsius.</p> : <p></p>}
    </div>  
  );
}

export default App;