import React, { useState } from 'react';
import './Birthday.css';
import Card from '../NasaCards/Card/Card.js';

//Component will fetch APOD for users Bday (or any day)
function Birthday() {

  const [userDate, setUserDate] = useState('');
  const [userImage, setUserImage] = useState();

  const getDate = (e) => {
    setUserDate(e.target.value)
  }
//if date in the future DO NOT evaluate - otherwise fetch
  const getImage= () => {
    let today = new Date();
    console.log(userDate > today.toISOString().split('T')[0])
    if(userDate > today.toISOString().split('T')[0]){
      console.log("error");
    }else{
      fetch(`https://api.nasa.gov/planetary/apod?date=${userDate}&thumbs=true&api_key=CSxK6h8x0ymT5SqwSxgraYyKWvJ1vM4WDMrtXlSN`)
      .then(resp => resp.json())
      .then(data => setUserImage(data))
    }

  }

  return (
    <div className="birthday-wrapper">
      <div className="birthday-data">
        <label for="birthday" > Enter Your Birthday : </label>
        <div style={{display:"flex", justifyContent:"center"}}>
          <input onChange={getDate} type="date" id="birthday" name="birthday" style={{fontSize:"inherit"}} />
          <input onClick={getImage} className="bdaySub" type="submit" value="Submit" />
        </div>
      </div>
      { !(userImage === undefined)
        ? <div>
            <Card
            key={userImage.date}
            title={userImage.title}
            imgLink={userImage.media_type === "image" ? userImage.url : userImage.thumbnail_url}
            doc={userImage.date}
            description={userImage.explanation}
            />
          </div>
        : null
      }
    </div>
  )
}

export default Birthday;
