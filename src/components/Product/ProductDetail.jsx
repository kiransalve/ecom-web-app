import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../productData/productData";
import "../../css/ProductDetail.css";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const productsList = products;

const ProductDetail = () => {
  const { productId } = useParams();
  const id = parseInt(productId);
  const product = productsList.filter((product) => product.id === id);

  const addToCartHandlar = (product) => {
    console.log(product);
  };

  return (
    <>
      <div className="singleProduct">
        <Link to="/">
          <ArrowBackIcon />
          Back
        </Link>
        <div className="productDetails">
          <img src={product[0].img} alt={product[0].title} className="image" />
          <div className="content">
            <div className="product-title">{product[0].title}</div>
            <div className="star">
              {Array.from({ length: product[0].star }, (_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <div className="productdetailcontent">
              <div className="price">Rs. {product[0].price} /-</div>
              <Tooltip title="Add to Cart">
                <IconButton>
                  <ShoppingCartIcon
                    onClick={() => addToCartHandlar(product[0])}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
