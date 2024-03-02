import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../productData/productData";
import "../../css/ProductDetail.css";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartReducer";
import { fetchCartItem } from "../Cart/getCartItems";

const productsList = products;

const ProductDetail = () => {
  const { productId } = useParams();
  const id = parseInt(productId);
  const product = productsList.filter((product) => product.id === id);
  const user = useSelector((state) => state.auth.user);
  const email = user.email.replace(/[[@.]/g, "");
const dispatch = useDispatch()
const firebaseURL = "https://ecom-a3388-default-rtdb.firebaseio.com/";
const addToCartHandlar = async(product) => {
console.log(product)
    dispatch(addToCart(product));

    const cartArray = await fetchCartItem(email);
    console.log(cartArray);
    const itemIndex = cartArray.findIndex(
      (item) => item.title === product.title
    );

    if (itemIndex === -1) {
      const response = await fetch(`${firebaseURL}cart${email}.json`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });
      const data = await response.json();
    } else {
      // get whole cart
      const upadatedcart = cartArray.map((item, index) => {
        if (index === itemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      const response = fetch(`${firebaseURL}cart${email}.json`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(upadatedcart),
      });
      const data = await response.json();
    }
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
