import React, { useState } from 'react';
import './Card.css';


function Card(props) {

  const [textHidden, setTextHidden] = useState(true);
  const [heart,setHeart] = useState(false);
  const [comment,setComment] = useState(false);

//Depending on length of description, reduce amount visible until User accepts
  const SeeMore = ({children}) => {
    const text = children;
    if(text[1].length > 300){
    const seeButton = () => {
      setTextHidden(!textHidden);
    };
    return (
      <p className="description">
      {textHidden ? text[1].slice(0,280) : text }
      <span onClick={seeButton} className="link-text" >
        {textHidden ? "...read more" : " show less"}
      </span>
      </p>
    );
  }else{
    return (
      <p className="description"> {text} </p>
    )
  }
  };

//triggered events
  const heartClicked = () =>{
    setHeart(!heart);
    props.addLiked()
  }

  const commentTyped = (e) =>{
    let commentData ={id : props.title, commentText : e.target.value, i: props.iter}
    props.addComment(commentData);
  }

  const commentClicked = () =>{
    setComment(!comment);
  }


  return(
    <div class="card-wrapper" >
      <h2 className="card-title"> {props.title} </h2>
      <img className="card-img grow" src={props.imgLink} alt="test"/>
      <div className="card-body" >
        <p className="date-capture"> Date of Capture: {props.doc} </p>
        <div className="description-wrapper">
          <h3 className="description-title"> Description: </h3>
          <SeeMore>  {props.description} </SeeMore>
        </div>

        {props.dreamDisplay && !(props.dreamComment === undefined)
          ?<div className="bottom-section-dream-comment">
            <h3 className="dream-comment"> "{props.dreamComment}" </h3>
            <br/>
            <div style={{marginLeft:"0px"}} className="heart-wrapper" onClick={() => props.removeCard() } >
              <i className="fas fa-ban"></i>
            </div>
           </div>
          :props.dreamDisplay && (props.dreamComment === undefined)
            ?<div className="bottom-section-dream">
            <div style={{marginLeft:"0px"}} className="heart-wrapper" onClick={() => props.removeCard() } >
              <i className="fas fa-ban"></i>
            </div>
             </div>
            :props.dreamDisplay === false
            ?<div className="bottom-section" >
              <div className={heart ? "heart-wrapper active" : "heart-wrapper"} onClick={heartClicked } >
                <i className={heart ? "fas fa-heart active" : "fas fa-heart"}></i>
              </div>
              <div className={comment ? "comment-wrapper active" : "comment-wrapper"} onClick={commentClicked } >
                <i className={comment ? "fas fa-comments active" : "fas fa-comments"}></i>
              </div>
            </div>
            : null
        }
        {comment ?
          <input onBlur={commentTyped} placeholder="Leave a comment..." className="input-text"  type="text" name="comment"  />
          : null
          }
      </div>
    </div>
  )


}

export default Card;
