import React from "react";
import "../../css/Sidebar.css";
import Price from "./Price";
import Category from "./Category";
import Rating from "./Rating";
import SortBy from "./SortBy";
import { useDispatch } from "react-redux";
import { clearAllFilter } from "../../store/productReducer";
import Tooltip from "@mui/material/Tooltip";

const Sidebar = () => {
  const dispatch = useDispatch();
  const clearFilterHandlar = () => {
    dispatch(clearAllFilter());
    console.log("clear filter");
  };
  return (
    <div className="sidebar ">
      <div className="sidebar_heading">
        <h4>Filters</h4>
        <Tooltip title="Clear Filter">
          <button className="clear" onClick={clearFilterHandlar}>
            <h4>Clear</h4>
          </button>
        </Tooltip>
      </div>
      <Price />
      <SortBy />
      <Category />
      <Rating />
    </div>
  );
};

export default Sidebar;
