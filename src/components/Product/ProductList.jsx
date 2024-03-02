import React from "react";
import "../../css/ProductList.css";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import products from "../../productData/productData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { addToCart } from "../../store/cartReducer";
import { fetchCartItem } from "../Cart/getCartItems";

const productsList = products;

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const email = user.email.replace(/[[@.]/g, "");
  const selectedCat = useSelector((state) => state.product.selectedCat);
  const priceRange = useSelector((state) => state.product.maxValue);
  const ratingValue = useSelector((state) => state.product.rating);
  const sortBy = useSelector((state) => state.product.sortBy);
  const searchBy = useSelector((state) => state.product.searchValue);

  const firebaseURL = "https://ecom-a3388-default-rtdb.firebaseio.com/";
  const filteredProducts = productsList.filter((product) => {
    const isCategoryMatch =
      selectedCat.length === 1 || selectedCat.includes(product.category);
    const isPriceMatch = product.price < priceRange;
    const isRatingMatch = product.star + 1 > ratingValue;
    const title = product.title.toLowerCase() || product.category.toLowerCase();
    const isValue = searchBy ? title.includes(searchBy.toLowerCase()) : true;
    return isCategoryMatch && isPriceMatch && isRatingMatch && isValue;
  });
  if (sortBy === "Low To High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const singleProductHandlar = (id) => {
    navigate(`/products/${id}`);
  };

  const addToCartHandlar = async (product) => {
    dispatch(addToCart(product));
console.log(product)
    const cartArray = await fetchCartItem(email);
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
    <div className="productlist">
      {filteredProducts.map((product) => {
        return (
          <div key={product.id}>
            <div className="productlist_card">
              <div onClick={() => singleProductHandlar(product.id)}>
                <img className="card_img" src={product.img} alt="img" />
                <div className="card_title">
                  {product.title.split(" ").slice(0, 6).join(" ")}
                </div>
              </div>
              <div className="card_price">Rs. {product.price}</div>
              <div className="starsandbtn">
                <div className="card_star">
                  {Array.from({ length: product.star }, (_, index) => (
                    <StarIcon key={index} />
                  ))}
                </div>
                <Tooltip title="Add To Cart">
                  <IconButton
                    className="addtocart"
                    onClick={() => addToCartHandlar(product)}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
