import React, { useState } from "react";
import "../../css/Model.css";
import { useDispatch, useSelector } from "react-redux";

const Model = ({
  setOpenmodel,
  cartItem,
  amount,
  setDetails,
  displayRazorpay,
}) => {
  const [address, setAddress] = useState({
    fullname: "",
    address: "",
    pincode: "",
    phonenumber: "",
  });
  const firebaseURL = "https://ecom-e0153-default-rtdb.firebaseio.com/";
  const user = useSelector((state) => state.auth.user);
  const email = user.email.replace(/[[@.]/g, "");
  console.log(email);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const saveShippingDetails = async () => {
    const response = await fetch(`${firebaseURL}shipping${email}.json`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(address),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenmodel(false);
    setDetails(address);
    saveShippingDetails();
    displayRazorpay(amount);
  };

  return (
    <div className="model">
      <h4 className="shipping">Shipping Details</h4>
      <div className="address-form">
        <input
          type="text"
          value={address.fullname}
          onChange={handleAddressChange}
          placeholder="Name"
          name="fullname"
          required
        />
        <input
          type="text"
          value={address.address}
          onChange={handleAddressChange}
          placeholder="Address"
          name="address"
          required
        />
        <input
          type="text"
          value={address.pincode}
          onChange={handleAddressChange}
          placeholder="Pincode"
          name="pincode"
          required
        />
        <input
          type="text"
          value={address.phonenumber}
          onChange={handleAddressChange}
          placeholder="Phone Number"
          name="phonenumber"
          required
        />
        <p>Total Item : {cartItem && cartItem.length}</p>
        <p>Total Amount: {amount}</p>
        <button onClick={handleSubmit} className="pay-btn">
          Pay
        </button>
      </div>
    </div>
  );
};

export default Model;
