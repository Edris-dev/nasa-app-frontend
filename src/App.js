import './App.css';
import React, { useState } from 'react';
import NasaCards from './Components/NasaCards/NasaCards.js';
import Navbar from './Components/Navbar/Navbar.js';
import Dreamboard from './Components/Dreamboard/Dreamboard.js'
import Birthday from './Components/Birthday/Birthday.js'


function App() {
  //set Routes for different pages
  const [route, setRoute] = useState('dreamboard');
  const routeChange = (location) => {
    setRoute(location);
  }
//render App
  return (
    <div className="App">
      <Navbar routeChange={routeChange}/>
      {route === 'dreamboard'
       ? <Dreamboard/>
       : route === 'home'
        ? <NasaCards/>
        : <Birthday/>
      }
    </div>
  );
}

export default App;
