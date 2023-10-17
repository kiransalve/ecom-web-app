import React from "react";
import "../../css/Categories.css";
import { filterByCategory } from "../../store/productReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Categories = ({ image, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCat = (title) => {
    dispatch(filterByCategory(title, "All"));
    navigate("/");
  };
  return (
    <div className="categories" onClick={() => handleCat(title)}>
      <img className="category-image" src={image} alt={title} />
      <p className="category_title">{title}</p>
    </div>
  );
};

export default Categories;
