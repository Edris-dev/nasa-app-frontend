import React, { useState } from 'react';
import Card from '../NasaCards/Card/Card.js';
import './Dreamboard.css';

//component will maintain/display all items user has "liked" or commened on
function Dreamboard(props){

  const [userLiked, setUserLiked] = useState(props.latestCall);
  const [deleteCard, setDeleteCard] = useState();

//call DB for all information
  const removeInfo = (badCard) => {
    fetch('https://limitless-spire-03740.herokuapp.com/removeEntry', {
    method:'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      oldCard:badCard,
      })
    })
  }

//remove card from "cloud" DB
  const delCard = (id) =>{
    let textId = id;
    const updateDream = userLiked.filter(({id}) => id !== textId);

    const remCard = userLiked.filter(({id}) => id === textId);
    setDeleteCard(deleteCard);

    setUserLiked(updateDream);
    removeInfo(remCard[0]);

  }


  return (
    <div>
      <h1 className="dream-title" > My Dreamboard </h1>
      <div className="card-container">
      { userLiked?.length > 0
        ? userLiked.map((nasa,i) => {
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
          :<img alt="dreamboard_gallery" src='./empty_dreamboard.png' style={{borderRadius:"15px"}}/>
          }
      </div>
    </div>
  )


}

export default Dreamboard;
