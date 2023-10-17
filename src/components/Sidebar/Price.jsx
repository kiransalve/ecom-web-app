import React from "react";
import "../../css/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { filterByPrice } from "../../store/productReducer";

const Price = () => {
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    dispatch(filterByPrice(e.target.value));
  };
  const priceRange = useSelector((state) => state.product.maxValue);

  return (
    <div className="sidebar_price">
      <h5>Price</h5>
      <div className="sibar_range_values">
        <div className="sidebar_range_value">0K</div>
        <div className="sidebar_range_value">1K</div>
        <div className="sidebar_range_value">2K</div>
        <div className="sidebar_range_value">3K</div>
        <div className="sidebar_range_value">4K</div>
        <div className="sidebar_range_value">5K</div>
      </div>
      <input
        type="range"
        min={0}
        max={5000}
        value={priceRange}
        onChange={handlePriceChange}
        className="sidebar_range_input"
      />
      <p className="sidebar_range_text">Maximum Upto : Rs. {priceRange}</p>
    </div>
  );
};

export default Price;
