import React from "react";
import ReactStars from "react-rating-stars-component"

import profilepng from "../../assets/Profile.png"
const ReviewCard = ({review}) => {
    const options = {
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        value : review.rating, 
        isHalf : true,
        size : window.innerWidth < 600 ? 20 : 25,
    }
    return (<div className="reviewcard">
        <img src={profilepng} alt="user"/>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        s<span>{review.Comment}</span>
    </div>)
}
export default ReviewCard