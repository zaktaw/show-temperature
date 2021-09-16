import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {

  function test() {
    console.log("Test");
  }

  return (
    <Button variant="contained" onClick={test}>Hello World</Button>
  );
}

export default App;