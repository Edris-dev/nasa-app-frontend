import React, {useEffect, useState } from 'react';
import Card from '../NasaCards/Card/Card.js';
import './Dreamboard.css';

//component will maintain/display all items user has "liked" or commened on
function Dreamboard(){

  const [userLiked, setUserLiked] = useState([]);
  const [deleteCard, setDeleteCard] = useState();

//call DB for all information
  useEffect(() => {
    fetch("https://limitless-spire-03740.herokuapp.com/userInfo")
    .then(resp => resp.json())
    .then(data => setUserLiked(data) )
  },[] )

  const delCard = (id) =>{
    console.log("inside del");
    let textId = id;
    const updateDream = userLiked.filter(({id}) => id !== textId);
    const remCard = userLiked.filter(({id}) => id === textId);
    console.log("card removed is");
    console.log(remCard);

    setDeleteCard(remCard);
    setUserLiked(updateDream);

  }

  return (
    <div>
      <h1 className="dream-title" > My Dreamboard </h1>
      <div className="card-container">
      { userLiked.length > 0
        ?userLiked.map((nasa,i) => {
         return <Card
                key={nasa.id}
                iter={nasa.id}
                title={nasa.data.title}
                imgLink={nasa.data.url}
                doc={nasa.data.date}
                description={nasa.data.explanation}
                dreamDisplay={true}
                dreamComment={nasa.comment}
                removeCard={() => delCard(nasa.id)}
                />})
          :<img src='./empty_dreamboard.png' style={{borderRadius:"15px"}}/>
          }
      </div>
    </div>
  )


}

export default Dreamboard;
