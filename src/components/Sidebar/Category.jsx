import React from "react";
import "../../css/Category.css";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../../store/productReducer";

const Category = () => {
  const selectedCat = useSelector((state) => state.product.selectedCat);

  const dispatch = useDispatch();

  const handleCategoryToggle = (category) => {
    dispatch(filterByCategory(category, "All"));
  };
  return (
    <>
      <h5>Category</h5>
      <div className="category_checkbox">
        <label className="category_checkbox_input">
          <input
            type="checkbox"
            value="Natural"
            checked={selectedCat.includes("Natural")}
            onChange={(e) => handleCategoryToggle(e.target.value)}
          />{" "}
          Natural
        </label>

        <label className="category_checkbox_input">
          <input
            type="checkbox"
            value="Modern art"
            checked={selectedCat.includes("Modern art")}
            onChange={(e) => handleCategoryToggle(e.target.value)}
          />{" "}
          Modern Art
        </label>

        <label className="category_checkbox_input">
          <input
            type="checkbox"
            value="Cartoon/Kids"
            checked={selectedCat.includes("Cartoon/Kids")}
            onChange={(e) => handleCategoryToggle(e.target.value)}
          />{" "}
          Cartoon/Kids
        </label>

        <label className="category_checkbox_input">
          <input
            type="checkbox"
            value="Plan"
            checked={selectedCat.includes("Plan")}
            onChange={(e) => handleCategoryToggle(e.target.value)}
          />{" "}
          Plan
        </label>
      </div>
    </>
  );
};

export default Category;
