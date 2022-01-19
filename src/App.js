import './App.css';
import React, { useState , useEffect } from 'react';
import NasaCards from './Components/NasaCards/NasaCards.js';
import Navbar from './Components/Navbar/Navbar.js';
import Dreamboard from './Components/Dreamboard/Dreamboard.js'
import Birthday from './Components/Birthday/Birthday.js'


function App() {
  //set Routes for different pages
  const [route, setRoute] = useState('home');
  const [userDb,setUserDb] = useState([]);
  const [click, setClick] = useState(false);

//update "cloud" DB whenever page is changed or item on gllary is triggered
  useEffect(() =>{
    fetch("https://limitless-spire-03740.herokuapp.com/userInfo")
    .then(resp => resp.json())
    .then(data => setUserDb(data))
  }, [route,click])

  const routeChange = (location) => {
    setRoute(location);
  }

  const triggerDb = () =>{
    setClick(!click);
  }
//render App
  return (
    <div className="App">
      <Navbar routeChange={routeChange}/>
      {route === 'dreamboard'
       ? <Dreamboard latestCall={userDb}/>
       : route === 'home'
        ? <NasaCards triggerDb={triggerDb}/>
        : <Birthday/>
      }
    </div>
  );
}

export default App;
