import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../css/Order.css";

const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const email = user.email.replace(/[[@.]/g, "");
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const toggleOrderExpansion = (orderUid) => {
    // Toggle the order expansion state
    if (expandedOrder === orderUid) {
      setExpandedOrder(null); // Collapse if already expanded
    } else {
      setExpandedOrder(orderUid); // Expand if not already expanded
    }
  };
  useEffect(() => {
    const fetchOrder = async (email) => {
      const firebaseURL = "https://ecom-a3388-default-rtdb.firebaseio.com/";
      const response = await fetch(`${firebaseURL}order${email}.json`, {
        method: "GET",
      });
      const data = await response.json();
      const cartArray = [];
      for (const key in data) {
        cartArray.push({ uid: key, ...data[key] });
      }
      setOrders(cartArray);
    };
    fetchOrder(email);
  }, [email]);

  return (
    <div className="orders">
      <h2 className="order-header">Your Orders</h2>
      <ul className="order-container">
        {orders.map((order) => (
          <li
            key={order.uid}
            onClick={() => toggleOrderExpansion(order.uid)}
            className="order-list"
          >
            <h5 className="order-date">Order Date: {order.orderDate}</h5>
            <p className="order-amt">Total Amount: Rs. {order.totalAmt.toLocaleString()}</p>
            {expandedOrder === order.uid && (
              <ul className="order-item-container">
                {order.items.map((item) => (
                  <li key={item.id} className="order-item-list">
                    <p className="order-item-title">Title: {item.title}</p>
                    <p className="order-item-price">Price: Rs. {item.price.toLocaleString()}</p>
                    <p className="order-item-quantity">
                      Quantity: {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
