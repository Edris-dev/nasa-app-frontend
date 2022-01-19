import React, {useEffect, useState } from 'react';
import './NasaCards.css';
import Card from './Card/Card.js'

//Component will perform API call, and render all Cards for 50 images, with new images /reload
function NasaCards(props) {

  const [nasaData, setNasaData] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [loading, setLoading] = useState(true);

//NASA API call onload
  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?count=21&api_key=CSxK6h8x0ymT5SqwSxgraYyKWvJ1vM4WDMrtXlSN")
    .then(resp => resp.json())
    .then(data => setNasaData(data))
    .then(setTimeout(() => setLoading(false),5000))
  }, [])

//communicate with DB to find all users inputs
  useEffect(() => {
    fetch("https://limitless-spire-03740.herokuapp.com/userInfo")
    .then(resp => resp.json())
    .then(data => setLikedList(data))
  }, [])


//Update Db with new lke or comment
const sendInfo = (adder) => {
  fetch('https://limitless-spire-03740.herokuapp.com/newEntry', {
  method:'post',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    newCard:adder,
    })
  })
}

//remove Card if it has been double tapped
const removeInfo = (badCard) => {
  fetch('https://limitless-spire-03740.herokuapp.com/removeEntry', {
  method:'post',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    oldCard:badCard,
    })
  })
}

//comment change capture
const updateComment = ({updateCard, text}) => {
  fetch('https://limitless-spire-03740.herokuapp.com/lateComment', {
  method:'post',
  headers: {'Content-Type':'application/json'},
  body: JSON.stringify({
    upCard:updateCard,
    userComm: text,
    })
  })
}



  const buttonClick =(titleClick,i) => {
    props.updateDb();

    let clickedCard = likedList.find(({id}) => id === titleClick);

    //if card hasnt been clicked before, add to DB otherwise remove
    if(clickedCard === undefined){
      let adder = { id: titleClick, data : nasaData[i]}
      //add userInfo to local data
      setLikedList(likedList => [...likedList, adder]);
      //send local data to DB
      sendInfo(adder);
    }else if(!(clickedCard.comment === undefined) && (clickedCard.comment.length > 0) ){
      //card will exist as it has been commented, keep in List
      //if button is clicked and no comment exist - remove

    }else{
      //update local list to remove
      const updateList = likedList.filter(({id}) => id !== titleClick);
      setLikedList(updateList);
      removeInfo(clickedCard);

    }
  }

//title will be used as identifier to update comments or likes
  const commentChange = ({id, commentText, i}) => {
    props.updateDb();
    let textId = id;

    let commentedCard = likedList.find(({id}) => id === textId);
    if(commentedCard === undefined){
      let adder = { id: textId, data : nasaData[i], comment: commentText}
      setLikedList(likedList => [...likedList, adder]);
      sendInfo(adder);

    }else{
      const updateLList = likedList.map(likedData => likedData.id === textId ?{...likedData, comment : commentText} : likedData);
      setLikedList(updateLList)
      updateComment({updateCard: commentedCard , text: commentText});
    }

  }

  return(
    <div>
    <br/><br/><br/>
     <div className={loading ? "loader" : "loader active"}>
       <img alt="loading-icon"className="loading-gif"  src="./loading_icon.gif"/>
        <h1 className="loading-text"> Just a second.... </h1>
     </div>
     <div className="card-container">
        {nasaData.map((nasa,i) => {
          if(nasa.media_type === "image"){
            return <Card
              key={nasa.title}
              iter={i}
              title={nasa.title}
              imgLink={nasa.url}
              doc={nasa.date}
              description={nasa.explanation}
              addLiked={() => buttonClick(nasa.title,i)}
              addComment={commentChange}
              dreamDisplay={false}
              />
            }
        })}
      </div>
    </div>

  )

}

export default NasaCards;
