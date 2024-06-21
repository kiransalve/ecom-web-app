import React, { useEffect, useState } from "react";
import "../../css/Cart.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  fetchCart,
  increaseQuantity,
  removeAllItem,
  removeFromCart,
} from "../../store/cartReducer";
import { fetchCartItem } from "./getCartItems";
import Model from "./Model";
import { formatdate } from "./formatDate";

const Cart = () => {
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const email = user.email.replace(/[[@.]/g, "");
  const [loading, setLoading] = useState(true);
  const [totalAmt, setTotalAmt] = useState();
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate the total price
    const calculateTotal = () => {
      let totalPrice = 0;
      for (const item of cartItem) {
        totalPrice += item.price * item.quantity;
      }
      setTotalAmt(totalPrice);
    };
    calculateTotal();
  }, [totalAmt, cartItem]);
  console.log(cartItem);
  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await fetchCartItem(email);
      // Dispatch an action to store cart items in Redux
      dispatch(fetchCart(cartItems));
      setLoading(false);
    };
    fetchCartItems();
  }, [email, dispatch]);

  const increaseQuantityHandler = async (product) => {
    dispatch(increaseQuantity(product.id));
    const cartArray = await fetchCartItem(email);
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      if (cartArray[itemIndex].quantity > 0) {
        cartArray[itemIndex].quantity++;
        const response = await fetch(
          `${process.env.REACT_APP_FirebaseURL}cart${email}.json`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(cartArray),
          }
        );
        const data = await response.json();
      }
    }
  };

  const decreaseQuantityhandler = async (product) => {
    dispatch(decreaseQuantity(product.id));
    const cartArray = await fetchCartItem(email);
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      if (cartArray[itemIndex].quantity > 1) {
        // decrease the existing cart item in firebase
        cartArray[itemIndex].quantity--;
        const response = await fetch(
          `${process.env.REACT_APP_FirebaseURL}cart${email}.json`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(cartArray),
          }
        );
        const data = await response.json();
      } else {
        // remove the item from cart if quantity becomes 0
        cartArray.splice(itemIndex, 1);
        const response = await fetch(
          `${process.env.REACT_APP_FirebaseURL}cart${email}.json`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(cartArray),
          }
        );
        const data = await response.json();
      }
    }
  };

  const removeFromCartHandler = async (product) => {
    dispatch(removeFromCart(product.id));
    const cartArray = await fetchCartItem(email);
    const itemIndex = cartArray.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      // remove item from firebase
      cartArray.splice(itemIndex, 1);
      const response = fetch(
        `${process.env.REACT_APP_FirebaseURL}cart${email}.json`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(cartArray),
        }
      );
      const data = await response.json();
    }
  };

  const removeAllCartItem = async () => {
    const cartArray = [];
    dispatch(removeAllItem());
    const response = await fetch(
      `${process.env.REACT_APP_FirebaseURL}cart${email}.json`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(cartArray),
      }
    );
    const data = await response.json();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const [openModel, setOpenmodel] = useState(false);

  const displayRazorpay = async (amt) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("You are offline... Failed to load Razorpay");
      return;
    }

    const currentDate = new Date();
    const formatDate = formatdate(currentDate);
    const option = {
      key: "rzp_test_p1ACGuaCu5AvVB",
      currency: "INR",
      amount: amt * 100,
      name: "Wall Design",
      description: "Thanks for purchassing",
      image: "https://m.media-amazon.com/images/I/719+kHx6Y0L._AC_UL320_.jpg",
      handler: async function (response) {
        if (response.razorpay_payment_id) {
          console.log("payment done");
          // save order in firebase
          const orderdata = {
            items: cartItem,
            totalAmt: amt,
            shippingDetails: details,
            orderDate: formatDate,
          };
          const orderResponse = await fetch(
            `${process.env.REACT_APP_FirebaseURL}order${email}.json`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(orderdata),
            }
          );
          if (orderResponse.ok) {
            removeAllCartItem();
            navigate("/order");
          } else {
            alert("Failed to save in firebase");
          }
          alert("Payment is Successfull");
        }
      },
    };
    if (amt > 0) {
      const paymentObject = new window.Razorpay(option);
      paymentObject.open();
    } else {
      alert("Amt should not less that 1");
    }
  };

  return (
    <>
      <h3 className="cart_header">My Cart</h3>
      <div className="cart_container">
        <Link className="back" to="/">
          <ArrowBackIcon /> Back
        </Link>
        <div className="cartitems_container">
          {/* cart is loading items */}
          {loading && <p>Loading cart...</p>}
          {/* after cart is lodaed */}
          {!loading &&
            cartItem &&
            cartItem.map((item) => (
              <div className="cart_items" key={item.id}>
                <img src={item.img} alt="title" className="cart_img" />
                <div className="cart_content">
                  <p>{item.title}</p>
                  <p>Rs. {item.price}</p>
                  <div className="cart_icons">
                    <div className="left">
                      <IconButton onClick={() => decreaseQuantityhandler(item)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton>{item.quantity}</IconButton>
                      <IconButton onClick={() => increaseQuantityHandler(item)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                    <div className="right">
                      <IconButton onClick={() => removeFromCartHandler(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* if cart is empty */}
          {!loading && cartItem.length === 0 && (
            <div>
              <h3 className="cart_header">Cart is Empty</h3>
              <Link to="/" className="shop-now">
                <ArrowBackIcon /> Shop Now
              </Link>
            </div>
          )}
        </div>
        <div className="total_container">
          <div className="total">
            <h3>Total</h3>
            <div className="mb-2 total_value">
              Price : Rs. {cartItem && totalAmt}
            </div>
            <div className="mb-2 total_items">
              Total Item : {cartItem && cartItem.length}
            </div>
            <button className="checkout" onClick={() => setOpenmodel(true)}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      {openModel && (
        <Model
          openModel={openModel}
          setOpenmodel={setOpenmodel}
          cartItem={cartItem}
          amount={totalAmt}
          setDetails={setDetails}
          displayRazorpay={displayRazorpay}
        />
      )}
    </>
  );
};

export default Cart;
