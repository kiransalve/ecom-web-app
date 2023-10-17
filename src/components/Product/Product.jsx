import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductList from "./ProductList";
import "../../css/Product.css";
import Header from "../Header";

const Product = () => {
  return (
    <div className="product">
      <Sidebar />
      <ProductList />
    </div>
  );
};

export default Product;
