import React from "react";
import "../../css/Rating.css";
import { useDispatch } from "react-redux";
import { filterByRating } from "../../store/productReducer";

const Rating = () => {
  const dispatch = useDispatch();

  const handleRatingFilter = (e) => {
    dispatch(filterByRating(e.target.value));
  };
  return (
    <div className="rating">
      <h5>Rating</h5>
      <div className="rating_redo">
        <div className="rating_redo_input">
          <input
            type="radio"
            name="rating"
            value="4"
            onChange={handleRatingFilter}
          />
          <label className="ratingLabel">4 Star and above</label>
        </div>
        <div className="rating_redo_input">
          <input
            type="radio"
            name="rating"
            value="3"
            onChange={handleRatingFilter}
          />
          <label className="ratingLabel">3 Star and above</label>
        </div>
        <div className="rating_redo_input">
          <input
            type="radio"
            name="rating"
            value="2"
            onChange={handleRatingFilter}
          />
          <label className="ratingLabel">2 Star and above</label>
        </div>
      </div>
    </div>
  );
};

export default Rating;
