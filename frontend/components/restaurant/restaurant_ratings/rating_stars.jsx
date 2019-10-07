import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RestaurantStars = props => {
  debugger;
  let percentage = null;
  let fill = null;
  if (props.restaurant.total_rating) {
    debugger;
    percentage = (props.restaurant.total_rating * 100.0) / 5;
    fill = {
      width: `${percentage}%`
    };
  }

  return (
    <>
      <div class="back-stars">
        <FontAwesomeIcon icon="star" />
        <FontAwesomeIcon icon="star" />
        <FontAwesomeIcon icon="star" />
        <FontAwesomeIcon icon="star" />
        <FontAwesomeIcon icon="star" />
        <div class="front-stars" style={fill}>
          <FontAwesomeIcon icon="star" />
          <FontAwesomeIcon icon="star" />
          <FontAwesomeIcon icon="star" />
          <FontAwesomeIcon icon="star" />
          <FontAwesomeIcon icon="star" />
        </div>
      </div>
    </>
  );
};

export default RestaurantStars;
