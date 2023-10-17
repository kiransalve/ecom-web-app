import React from "react";
import "../../css/SortBy.css";
import { useDispatch } from "react-redux";
import { sortByPrice } from "../../store/productReducer";

const SortBy = () => {
  const dispatch = useDispatch();

  const handleSortBy = (e) => {
    dispatch(sortByPrice(e.target.value));
  };
  return (
    <div className="sortby">
      <h5>Sortby</h5>
      <div className="sortby_redo">
        <div className="sortby_input">
          <input
            type="radio"
            name="sort"
            value="Low To High"
            onChange={handleSortBy}
          />
          <label className="sortByRadio">Low to High</label>
        </div>
        <div className="sortby_input">
          <input
            type="radio"
            name="sort"
            value="High to Low"
            onChange={handleSortBy}
          />
          <label className="sortByRadio">High to Low</label>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
