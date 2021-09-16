import './App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';


function App() {

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
    console.log(temperatureForNextHour);
  }

  return (
    <div>
      { loading ? <h1>Loading...</h1> : <Button variant="contained" onClick={getWeatherData}>Show temperature</Button>}
    </div>  
  );
}

export default App;