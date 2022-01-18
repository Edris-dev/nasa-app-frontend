import React, {useEffect, useState } from 'react';
import './NasaCards.css';
import Card from './Card/Card.js'

//Component will perform API call, and render all Cards for 50 images, with new images /reload
function NasaCards() {

  const [nasaData, setNasaData] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardId, setCardID] = useState(0);

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


  const checker = () =>{
    console.log(likedList)
  }

//update DB based on user input (whenever item is liked/commented on)
  useEffect(() => {
    updateDb();
  }, [likedList])

  const updateDb = () => {
    fetch('https://limitless-spire-03740.herokuapp.com/update', {
    method:'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      userInfo:likedList,
      })
    })
}

  const buttonClick =(titleClick,i) => {
    let clickedCard = likedList.find(({id}) => id === titleClick);

    if(clickedCard === undefined){
      let adder = { id: titleClick, data : nasaData[i]}
      setLikedList(likedList => [...likedList, adder])
    }else{
      const updateList = likedList.filter(({id}) => id !== titleClick);
      setLikedList(updateList)
    }
  }

//title will be used as identifier to update comments or likes
  const commentChange = ({id, commentText, i}) => {
    let textId = id;

    let commentedCard = likedList.find(({id}) => id === textId);
    if(commentedCard === undefined){
      let adder = { id: textId, data : nasaData[i], comment: commentText}
      setLikedList(likedList => [...likedList, adder])
    }else{
      const updateLList = likedList.map(likedData => likedData.id === textId ?{...likedData, comment : commentText} : likedData);
      setLikedList(updateLList)
    }

  }

  return(
    <div>
    <br/><br/><br/>
     <div className={loading ? "loader" : "loader active"}>
       <img className="loading-gif"  src="./loading_icon.gif"/>
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
